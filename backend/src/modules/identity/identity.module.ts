import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OAuthProvider } from "./entities/oauth_providers.entity";
import { PasswordResetToken } from "./entities/password_reset_tokens.entity";
import { Role } from "./entities/roles.entity";
import { UserOAuthAccount } from "./entities/user_oauth_accounts.entity";
import { UserProfile } from "./entities/user_profiles.entity";
import { UserSession } from "./entities/user_sessions.entity";
import { User } from "./entities/users.entity";
import { AuthController } from "./controller/auth.controller";
import { UsersService } from "./services/users.service";
import { AuthService } from "./services/auth.service";
import { LocalStrategy } from "./strategies/local.strategy";


@Module({
  imports: [
    TypeOrmModule.forFeature([
      OAuthProvider, 
      PasswordResetToken, 
      Role, 
      UserOAuthAccount, 
      UserProfile, 
      UserSession, 
      User
    ]),
  ],
  providers: [
    UsersService,
    AuthService,
    LocalStrategy
  ],  
  controllers: [
    AuthController
  ]
})
export class IdentityModule { }
