import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Role } from "../entities/roles.entity";
import { Repository } from "typeorm";

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private readonly roleRepository: Repository<Role>,
    ) { }

    async findAll(): Promise<Role[]> {
        return this.roleRepository.find();
    }

    async findOneById(id: number): Promise<Role | null> {
        return this.roleRepository.findOne({
            where: {
                id
            }
        })
    }
}