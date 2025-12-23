import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OAuthProvider } from "./entities/oauth_providers.entity";
import { PasswordResetToken } from "./entities/password_reset_tokens.entity";
import { Role } from "./entities/roles.entity";
import { UserOAuthAccount } from "./entities/user_oauth_accounts.entity";
import { UserProfile } from "./entities/user_profiles.entity";
import { UserSession } from "./entities/user_sessions.entity";
import { User } from "./entities/users.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([OAuthProvider, PasswordResetToken, Role, UserOAuthAccount, UserProfile, UserSession, User]),
  ],
})
export class IdentityModule { }
