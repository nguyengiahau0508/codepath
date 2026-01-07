import { Injectable } from "@nestjs/common";
import { User } from "../entities/users.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppException } from "src/common/exceptions/app.exception";
import * as bcrypt from "bcrypt";
import { Role } from "../entities/roles.entity";
import { RoleEnum } from "../enums/role.enum";
import { RolesService } from "./roles.service";
import { AssignRoleDto } from "../dto/users/assign-role.dto";
@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly rolesService: RolesService
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

    async changePassword(userId: number, oldPassword: string, newPassword: string): Promise<User> {
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
        if (!currentUser.passwordHash) {
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

    async findAllRolesByUser(userId: number): Promise<Role[]> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: {
                roles: true
            }
        })
        if (!user) {
            throw new AppException(
                "USER_NOT_FOUND",
                "User not found",
                404
            )
        }
        return user.roles
    }

    async assignRoleToUser(dto: AssignRoleDto): Promise<User> {
        const user = await this.userRepository.findOne({
            where: { id: dto.userId },
            relations: { roles: true },
        });

        if (!user) {
            throw new AppException(
                'USER_NOT_FOUND',
                'User not found',
                404,
            );
        }

        const role = await this.rolesService.findOneById(dto.roleId);

        if (!role) {
            throw new AppException(
                'ROLE_NOT_FOUND',
                'Role not found',
                404,
            );
        }

        const alreadyAssigned = user.roles.some(r => r.id === role.id);
        if (!alreadyAssigned) {
            user.roles.push(role);
            await this.userRepository.save(user); 
        }

        return user;
    }

}