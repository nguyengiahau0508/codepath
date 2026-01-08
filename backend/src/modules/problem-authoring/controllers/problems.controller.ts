import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ProblemsService } from "../services/problems.service";
import { Roles } from "src/modules/identity/decorators/roles.decorator";
import { RoleEnum } from "src/modules/identity/enums/role.enum";
import { CurrentUser } from "src/modules/identity/decorators/current-user.decorator";
import * as currentUserInterface from "src/modules/identity/interfaces/current-user.interface";
import { CreateProblemDto } from "../dto/problems/create-problem.dto";
@Controller('problem-authoring/problems')
export class ProblemsController {
    constructor(
        private readonly problemsService: ProblemsService,
    ) {}

    @Post()
    @Roles(RoleEnum.Admin, RoleEnum.ProblemSetter)
    async createProblem(@CurrentUser() user: currentUserInterface.ICurrentUser, @Body() createProblemDto: CreateProblemDto) {
        return this.problemsService.createProblem(user.id, createProblemDto);
    }

    @Get(':id')
    async getProblemById(@Param('id') id: number) {
        return this.problemsService.findOne({
            id
        })
    }
    
}