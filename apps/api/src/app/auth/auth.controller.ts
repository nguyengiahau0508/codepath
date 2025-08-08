import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Response, Request } from "express";
import { AuthService } from "./auth.service";
import { config } from "@codepath/config";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // B1: Điều hướng đến Google OAuth
  @Get("google")
  @UseGuards(AuthGuard("google"))
  async googleAuth() {
    // Passport sẽ tự redirect sang Google, không cần code gì ở đây
  }

  // B2: Callback từ Google
  @Get("google/callback")
  @UseGuards(AuthGuard("google"))
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    const googleUser = req.user as any; // Lấy dữ liệu từ GoogleStrategy.validate

    // Tạo hoặc lấy user trong DB
    const user = await this.authService.findOrCreateUserFromGoogle({
      sub: googleUser.providerId,
      email: googleUser.email,
      name: googleUser.fullName,
      picture: googleUser.picture,
    });

    // Sinh token
    const tokens = await this.authService.generateTokens(user);

    // Redirect về FE kèm token
    // Hoặc trả JSON nếu muốn FE tự xử lý
    return res.redirect(
      `${config.admin.url}/login-success?accessToken=${tokens.accessToken}&refreshToken=${tokens.refreshToken}`
    );
  }

  // B3: Refresh token
  @Post("refresh-token")
  @HttpCode(HttpStatus.OK)
  async refreshToken(@Body("refreshToken") refreshToken: string) {
    return await this.authService.refresh(refreshToken);
  }

  // B4: Logout (xóa refresh token trong Redis + DB)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Body("refreshToken") refreshToken: string) {
    return await this.authService.logout(refreshToken);
  }
}

