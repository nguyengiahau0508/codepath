import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { TokenService } from '../services/token.service';

@Injectable()
export class JwtBlacklistGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService, private readonly tokenService: TokenService) { }

  private getAccessSecret() {
    return process.env.JWT_ACCESS_SECRET;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: Request = context.switchToHttp().getRequest();
    const auth = req.headers['authorization'] || '';
    if (!auth) throw new UnauthorizedException('No authorization header');
    const parts = (auth as string).split(' ');
    if (parts.length !== 2 || parts[0] !== 'Bearer') throw new UnauthorizedException('Invalid authorization header');

    const token = parts[1];
    let payload: any;
    try {
      payload = this.jwtService.verify(token, { secret: this.getAccessSecret() });
    } catch (err) {
      throw new UnauthorizedException('Invalid access token');
    }
    if (!payload?.jti) throw new UnauthorizedException('Token missing jti');

    if (await this.tokenService.isJtiBlacklisted(payload.jti)) {
      throw new UnauthorizedException('Token revoked');
    }

    (req as any).user = payload; // attach payload
    return true;
  }
}

