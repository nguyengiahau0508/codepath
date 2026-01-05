import { RegisterDto } from "../dto/auth/register.dto";
import { User } from "../entities/users.entity";
export interface AuthRepository {
    login(user: User): Promise<{user: User, accessToken: string; refreshToken: string }>;
    validateUser(email: string, password: string): Promise<any>
    register(dto: RegisterDto): Promise<User>
}   