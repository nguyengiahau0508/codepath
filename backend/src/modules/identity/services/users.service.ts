import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppException } from "src/common/exceptions/app.exception";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async create(user: Partial<User>): Promise<User> {
        return await this.userRepository.create(user)
    }

    async save(user: User): Promise<User> {
        return await this.userRepository.save(user)
    }

    async update(user: User): Promise<User> {
        await this.userRepository.update(user.id, user)
        return user
    }

    async findOne(id: number): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }

    async changePassword(user: User, oldPassword: string, newPassword: string): Promise<User> {
        const userId = user.id;
        const currentUser = await this.userRepository.findOne({
            where: {
                id: userId
            }
        })
        if (!currentUser) {
            throw new AppException(
                "USER_NOT_FOUND",
                "User not found",
                404
            )
        }
        if(!currentUser.passwordHash) {
            throw new AppException(
                "CANNOT_USE_THIS_FEATURE",
                "Cannot use this feature",
                404
            )
        }
        const isPasswordMatch = await bcrypt.compare(oldPassword, currentUser.passwordHash);
        if (!isPasswordMatch) {
            throw new AppException(
                "INVALID_PASSWORD",
                "Invalid password",
                400
            )
        }
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(newPassword, salt);
        currentUser.passwordHash = passwordHash;
        await this.userRepository.update(userId, currentUser);
        return currentUser;
    }
}