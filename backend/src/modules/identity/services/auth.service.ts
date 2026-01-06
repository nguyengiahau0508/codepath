import { Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/auth/register.dto";
import { User } from "../entities/users.entity";
import { TokenService } from "./token.service";
import { SessionsService } from "./sessions.service";
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface";

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

    async login(req: AuthenticatedRequest): Promise<{ user: User, accessToken: string, refreshToken: string }> {
        // generate access token and refresh token
        const accessToken = await this.tokenService.generateAccessToken(req.user);
        const refreshToken= await this.tokenService.generateRefreshToken(req.user);
        // update last login at
        req.user.lastLoginAt = new Date();
        await this.usersService.update(req.user)
        
        // create session
        const salt = await bcrypt.genSalt();
        const refreshTokenHash = await bcrypt.hash(refreshToken, salt);
        const refreshTokenExpireAt = (await this.tokenService.decodeRefreshToken(refreshToken)).exp;
        const session = await this.sessionsService.create({
           user: req.user,
           refreshTokenHash: refreshTokenHash,
           ip: req.ip,
           userAgent: req.get('user-agent'),
           expiresAt: new Date(refreshTokenExpireAt! * 1000),
        })
        await this.sessionsService.save(session)
        return { user: req.user, accessToken, refreshToken };
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
}