import { Controller, Post, UseGuards, Request, Body } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { JwtAuthGuard } from "../guards/jwt-auth.guard";
import { CurrentUser } from "../decorators/current-user.decorator";
import { User } from "../entities/users.entity";
import { ChangePasswordDto } from "../dto/users/change-password.dto";
import { AssignRoleDto } from "../dto/users/assign-role.dto";
@Controller('identity/users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService
    ) { }

    @Post("change-password")
    @UseGuards(JwtAuthGuard)
    async changePassword(@CurrentUser() user: User, @Body() changePasswordDto: ChangePasswordDto) {
        return await this.usersService.changePassword(user, changePasswordDto.oldPassword, changePasswordDto.newPassword);
    }

    @Post("assign-role")
    @UseGuards(JwtAuthGuard)
    async assignRoleToUser(@CurrentUser() user: User, @Body() assignRoleDto: AssignRoleDto) {
        return await this.usersService.assignRoleToUser(assignRoleDto);
    }
}