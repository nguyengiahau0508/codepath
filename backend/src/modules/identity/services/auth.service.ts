import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../repositories/auth.repository";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';
import { RegisterDto } from "../dto/auth/register.dto";
import { User } from "../entities/users.entity";
import { TokenService } from "./token.service";

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private usersService: UsersService,
        private tokenService: TokenService
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

    async login(user: User): Promise<{ user: User, accessToken: string, refreshToken: string }> {
        const accessToken = await this.tokenService.generateAccessToken(user);
        const refreshToken = await this.tokenService.generateRefreshToken(user);
        user.lastLoginAt = new Date();
        await this.usersService.update(user)
        return { user, accessToken, refreshToken };
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