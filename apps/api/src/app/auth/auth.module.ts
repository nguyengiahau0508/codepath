import { Global, Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { GoogleStrategy } from "./strategies/google.strategy";
import { TokenService } from "./services/token.service";
import { AuthService } from "./auth.service";
import { RedisModule } from "../redis/redis.module";
import { JwtModule } from '@nestjs/jwt'
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../modules/user/entities/user.entity";
import { UserSession } from "../modules/user/entities/user-session.entity";

@Global()
@Module({
  imports: [
    RedisModule,
    JwtModule.register({
      global: true
    }),
    TypeOrmModule.forFeature([User, UserSession])
  ],
  providers: [
    GoogleStrategy,
    TokenService,
    AuthService
  ],
  controllers: [AuthController]
})
export class AuthModule { }
