import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/auth/register.dto";
import { User } from "../entities/users.entity";
import { TokenService } from "./token.service";
import { SessionsService } from "./sessions.service";
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface";
import { AuthenticatedResponse } from "../interfaces/authenticated-response.interface";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtPayload } from "../interfaces/jwt-payload.interface";

@Injectable()
export class AuthService{
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService,
        private sessionsService: SessionsService
    ) { }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findOneByEmail(email);
        if (user) {
            const hash = user.passwordHash ? user.passwordHash : ''
            const isMatch = await bcrypt.compare(password, hash);

            if (isMatch) {
                const { passwordHash, ...result } = user;
                return result;
            }
        }
        return null;
    }

    async login(req: AuthenticatedRequest, res: AuthenticatedResponse): Promise<{ user: User, accessToken: string}> {
        // update last login at
        req.user.lastLoginAt = new Date();
        await this.usersService.update(req.user)

        // create session
        const session = await this.sessionsService.create({
           user: req.user,
           ip: req.ip,
           userAgent: req.get('user-agent'),
        })
        await this.sessionsService.save(session)
        const refreshToken = await this.tokenService.generateRefreshToken(req.user, session.id.toString());
        const accessToken = await this.tokenService.generateAccessToken(req.user);
        
        // hash refresh token and update session
        session.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
        session.expiresAt = new Date((await this.tokenService.decodeRefreshToken(refreshToken)).exp! * 1000);
        await this.sessionsService.update(session.id, session);
        // set cookie
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
        });
        return { user: req.user, accessToken };
    }

    async register(dto: RegisterDto): Promise<User> {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(dto.password, salt);
        const user = await this.usersService.create({
            email: dto.email,
            passwordHash: passwordHash,
            username: dto.username,
            countryCode: dto.countryCode,
        })
        await this.usersService.save(user)
        return user
    }

    async refreshToken(req: AuthenticatedRequest, res: AuthenticatedResponse): Promise<{ user: User, accessToken: string}> {
        const currentRefreshToken = req.cookies.refreshToken;
        const currentRefreshTokenPayload: JwtPayload = await this.tokenService.verifyRefreshToken(currentRefreshToken);
        const session = await this.sessionsService.findOne(Number(currentRefreshTokenPayload.jti));
        if (!session) { 
            throw new NotFoundException('Session not found');
        }
        if(session.ip !== req.ip ||
             session.userAgent !== req.get('user-agent') ||
             (session.expiresAt && session.expiresAt < new Date())) {
            session.revokedAt = new Date();
            await this.sessionsService.update(session.id, session);
            throw new UnauthorizedException('Invalid refresh token');
        }
        const isMatch = await bcrypt.compare(currentRefreshToken, session.refreshTokenHash || '');
        if (!isMatch) {
            throw new UnauthorizedException('Invalid refresh token');
        }
        const currentUser = await this.usersService.findOne(Number(currentRefreshTokenPayload.sub));
        if (!currentUser) {
            throw new NotFoundException('User not found');
        }
        const accessToken = await this.tokenService.generateAccessToken(currentUser);
        return {user: currentUser, accessToken}
    }
}