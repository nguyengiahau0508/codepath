import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../entities/users.entity";
import { jwtConstants } from "../constants/auth.constants";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class TokenService {
    constructor(
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async generateAccessToken(user: User): Promise<string> {
        if (!user.email) {
            throw new InternalServerErrorException('User email is required for token generation');
        }
        const payload: JwtPayload = { email: user.email, sub: user.id.toString(), type: 'access' };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
            expiresIn: this.configService.get('JWT_ACCESS_EXPIRES'),
        });
    }

    async generateRefreshToken(user: User): Promise<string> {
        if (!user.email) {
            throw new InternalServerErrorException('User email is required for token generation');
        }
        const payload: JwtPayload = { email: user.email, sub: user.id.toString(), type: 'refresh' };
        return this.jwtService.signAsync(payload, {
            secret: this.configService.get('JWT_REFRESH_SECRET'),
            expiresIn: this.configService.get('JWT_REFRESH_EXPIRES'),
        });
    }

    async verifyAccessToken(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token, {
            secret: this.configService.get('JWT_ACCESS_SECRET'),
        });
    }

    async verifyRefreshToken(token: string): Promise<any> {
        return this.jwtService.verifyAsync(token, {
            secret:     this.configService.get('JWT_REFRESH_SECRET'),
        });
    }

    async decodeAccessToken(token: string): Promise<JwtPayload> {
        return this.jwtService.decode(token);
    }

    async decodeRefreshToken(token: string): Promise<JwtPayload> {
        return this.jwtService.decode(token);
    }
}