import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Controller("identity/auth")
export class AuthController{
    constructor(

    ){}

    @Post("login")
    @UseGuards(AuthGuard('local'))
    async login(@Request() req){
        return req.user
    }
}