import { Injectable } from "@nestjs/common";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";


@Injectable()
export class UsersService implements UserRepository {
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

    async findOneByEmail(email: string): Promise<User | null> {
        return await this.userRepository.findOne({
            where: {
                email
            }
        })
    }
}