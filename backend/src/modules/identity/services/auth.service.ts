import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../repositories/auth.repository";
import { UsersService } from "./users.service";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService implements AuthRepository {
    constructor(
        private usersService: UsersService
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
}