import { Role } from "../entities/roles.entity";
import { Controller, Get } from "@nestjs/common";
import { RolesService } from "../services/roles.service";

@Controller('identity/roles')
export class RolesController {
    constructor(
        private readonly rolesService: RolesService,
    ) { }

    @Get()
    async findAll(): Promise<Role[]> {
        return this.rolesService.findAll();
    }
}