import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { Roles } from './modules/identity/decorators/roles.decorator';
import { RoleEnum } from './modules/identity/enums/role.enum';
import { JwtAuthGuard } from './modules/identity/guards/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @Roles(RoleEnum.Teacher)
  getHello(): string {
    return this.appService.getHello();
  }
}
