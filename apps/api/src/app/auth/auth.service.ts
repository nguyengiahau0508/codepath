import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TokenService } from "./services/token.service";
import { User } from "../modules/user/entities/user.entity";
import { Repository } from "typeorm";
import { UserSession } from "../modules/user/entities/user-session.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    @InjectRepository(User) private readonly usersRepo: Repository<User>,
    @InjectRepository(UserSession) private readonly sessionsRepo: Repository<UserSession>
  ) { }

  private parseExpiryToSeconds(val: string | undefined, fallbackSeconds: number): number {
    if (!val) return fallbackSeconds;
    const s = val.trim();
    const last = s[s.length - 1];
    if (!isNaN(Number(last))) return Number(s); // plain seconds
    const num = parseInt(s.slice(0, -1), 10);
    if (isNaN(num)) return fallbackSeconds;
    switch (last) {
      case 's': return num;
      case 'm': return num * 60;
      case 'h': return num * 3600;
      case 'd': return num * 86400;
      default: return fallbackSeconds;
    }
  }

  async findOrCreateUserFromGoogle(payload: any) {
    const { sub, email, name, picture } = payload;
    const provider = "google";
    const providerId = sub;

    let user = await this.usersRepo.findOne({
      where: { provider, providerId },
    });

    if (!user) {
      user = this.usersRepo.create({
        email,
        fullName: name || email,
        avatarUrl: picture,
        provider,
        providerId,
      });
      user = await this.usersRepo.save(user);
    } else {
      let updated = false;
      if (name && name !== user.fullName) {
        user.fullName = name;
        updated = true;
      }
      if (picture && picture !== user.avatarUrl) {
        user.avatarUrl = picture;
        updated = true;
      }
      if (updated) await this.usersRepo.save(user);
    }

    return user;
  }


  // Generate access + refresh tokens
  async generateTokens(user: User) {
    const accessExpires = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
    const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
    const accessTtlSec = this.parseExpiryToSeconds(accessExpires, 15 * 60);
    const refreshTtlSec = this.parseExpiryToSeconds(refreshExpires, 7 * 24 * 3600);

    const accessJti = uuidv4();
    const refreshJti = uuidv4();
    const now = Math.floor(Date.now() / 1000);

    const accessPayload = { sub: String(user.id), username: user.fullName, jti: accessJti, typ: 'access', iat: now };
    const refreshPayload = { sub: String(user.id), jti: refreshJti, typ: 'refresh', iat: now };

    const accessToken = this.jwtService.sign(accessPayload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: accessExpires,
    });
    const refreshToken = this.jwtService.sign(refreshPayload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: refreshExpires,
    });

    // Store refresh token in Redis (encrypted)
    await this.tokenService.storeTokenForUser(user.id, refreshJti, refreshToken, refreshTtlSec);

    // Optionally record session
    const session = this.sessionsRepo.create({ user: user, refreshJti });
    await this.sessionsRepo.save(session);

    return {
      accessToken,
      refreshToken,
      accessExpiresIn: accessTtlSec,
      refreshExpiresIn: refreshTtlSec,
      accessJti,
      refreshJti,
    };
  }

  // Refresh flow: verify refresh token signature, check blacklist, compare to stored encrypted value, rotate
  async refresh(refreshToken: string) {
    let payload: any;
    try {
      payload = this.jwtService.verify(refreshToken, { secret: process.env.JWT_REFRESH_SECRET });
    } catch (err) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    if (!payload?.jti || !payload?.sub) throw new BadRequestException('Malformed refresh token');

    const userId = payload.sub;
    const jti = payload.jti;

    // Check blacklist
    if (await this.tokenService.isJtiBlacklisted(jti)) {
      throw new UnauthorizedException('Refresh token revoked');
    }

    // Validate token matches stored value (detect reuse)
    const ok = await this.tokenService.validateTokenById(userId, jti, refreshToken);
    if (!ok) {
      // Possible reuse -> revoke all
      await this.tokenService.revokeAllTokensForUser(userId);
      throw new UnauthorizedException('Refresh token invalid or reused');
    }

    // Create new refresh token (rotate)
    const refreshExpires = process.env.REFRESH_TOKEN_EXPIRES_IN || '7d';
    const refreshTtlSec = this.parseExpiryToSeconds(refreshExpires, 7 * 24 * 3600);
    const newRefreshJti = uuidv4();
    const newRefreshPayload = { sub: String(userId), jti: newRefreshJti, typ: 'refresh', iat: Math.floor(Date.now() / 1000) };
    const newRefreshToken = this.jwtService.sign(newRefreshPayload, { secret: process.env.JWT_REFRESH_SECRET, expiresIn: refreshExpires });

    await this.tokenService.rotateRefreshToken(userId, jti, newRefreshJti, newRefreshToken, refreshTtlSec);

    // Blacklist old jti for its remaining TTL to prevent reuse window
    if (payload.exp) {
      const ttl = Math.max(0, payload.exp - Math.floor(Date.now() / 1000));
      if (ttl > 0) await this.tokenService.blacklistJti(jti, ttl);
    }

    // Issue new access token
    const accessExpires = process.env.ACCESS_TOKEN_EXPIRES_IN || '15m';
    const accessTtl = this.parseExpiryToSeconds(accessExpires, 15 * 60);
    const accessJti = uuidv4();
    const accessPayload = { sub: String(userId), jti: accessJti, typ: 'access', iat: Math.floor(Date.now() / 1000) };
    const newAccessToken = this.jwtService.sign(accessPayload, { secret: process.env.JWT_ACCESS_SECRET, expiresIn: accessExpires });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessExpiresIn: accessTtl,
      refreshExpiresIn: refreshTtlSec,
      accessJti,
      refreshJti: newRefreshJti,
    };
  }

  async logout(userId: string | number, accessPayload?: { jti?: string; exp?: number }, refreshJti?: string | null) {
    if (accessPayload?.jti && accessPayload?.exp) {
      const ttl = Math.max(0, accessPayload.exp - Math.floor(Date.now() / 1000));
      if (ttl > 0) await this.tokenService.blacklistJti(accessPayload.jti, ttl);
    }
    if (refreshJti) {
      await this.tokenService.revokeTokenById(userId, refreshJti);
    }
    // Optionally revoke all:
    // await this.tokenService.revokeAllTokensForUser(userId);
  }
}
