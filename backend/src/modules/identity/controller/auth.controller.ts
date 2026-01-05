import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "../dto/auth/register.dto";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";

@Controller("identity/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: any) {
        return await this.authService.login(req.user)
    }

    @Post("register")
    async register(@Body() registerDto: RegisterDto) {
        const result = await this.authService.register(registerDto)
        return {
            user: result
        }
    }

    @UseGuards(LocalAuthGuard)
    @Post('auth/logout')
    async logout(@Request() req: any) {
        return req.logout();
    }
}