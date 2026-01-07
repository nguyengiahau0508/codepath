import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { ChangePasswordDto } from "../dto/users/change-password.dto";
import { AssignRoleDto } from "../dto/users/assign-role.dto";
import * as currentUserInterface from "../interfaces/current-user.interface";
import { CurrentUser } from "../decorators/current-user.decorator";
import { Roles } from "../decorators/roles.decorator";
import { RoleEnum } from "../enums/role.enum";
@Controller('identity/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post("change-password")
    async changePassword(@CurrentUser() user: currentUserInterface.ICurrentUser, @Body() changePasswordDto: ChangePasswordDto) {
        return await this.usersService.changePassword(user.id, changePasswordDto.oldPassword, changePasswordDto.newPassword);
    }

    @Post("assign-role")
    @Roles(RoleEnum.Admin)
    async assignRoleToUser(@Body() assignRoleDto: AssignRoleDto) {
        return await this.usersService.assignRoleToUser(assignRoleDto);
    }
}