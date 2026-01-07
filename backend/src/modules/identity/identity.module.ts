import { Global, Module } from "@nestjs/common";
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
import { TokenService } from "./services/token.service";
import { JwtModule } from "@nestjs/jwt";
import { SessionsService } from "./services/sessions.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { UsersController } from "./controller/users.controller";
import { RolesService } from "./services/roles.service";
import { RolesController } from "./controller/roles.controller";

@Global()
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
    JwtModule,
  ],
  providers: [
    // Services
    UsersService,
    AuthService,
    TokenService,
    SessionsService,
    RolesService,

    // Strategies
    LocalStrategy,
    JwtStrategy
  ],  
  controllers: [
    AuthController,
    UsersController,
    RolesController
  ]
})
export class IdentityModule { }
