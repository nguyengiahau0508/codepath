import { Body, Controller, Post, Request, UseGuards, Res } from "@nestjs/common";
import { RegisterDto } from "../dto/auth/register.dto";
import { AuthService } from "../services/auth.service";
import { LocalAuthGuard } from "../guards/local-auth.guard";
import * as authenticatedRequestInterface from "../interfaces/authenticated-request.interface";
import * as AuthenticatedResponseInterface from "../interfaces/authenticated-response.interface";
@Controller("identity/auth")
export class AuthController {
    constructor(
        private authService: AuthService
    ) { }

    @Post("login")
    @UseGuards(LocalAuthGuard)
    async login(@Request() req: authenticatedRequestInterface.AuthenticatedRequest, @Res({ passthrough: true }) res: AuthenticatedResponseInterface.AuthenticatedResponse) {
        return await this.authService.login(req, res)
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
    async logout(@Request() req: authenticatedRequestInterface.AuthenticatedRequest) {
        return req.logOut;
    }
}