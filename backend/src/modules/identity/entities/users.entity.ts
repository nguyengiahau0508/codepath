
// modules/identity/entities/user.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { PasswordResetToken } from './password_reset_tokens.entity';
import { UserOAuthAccount } from './user_oauth_accounts.entity';
import { UserSession } from './user_sessions.entity';
import { Role } from './roles.entity';
import { UserProfile } from './user_profiles.entity';

export enum UserStatus {
  ACTIVE = 'active',
  BANNED = 'banned',
  DELETED = 'deleted',
}

@Entity('users')
export class User extends BaseEntity {
  @Column({ unique: true, nullable: true })
  email?: string;

  @Column({ unique: true, length: 100 })
  username: string;

  @Column({ name: 'password_hash', nullable: true })
  passwordHash?: string;

  @Column({
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;

  @Column({ name: 'country_code', length: 2, nullable: true })
  countryCode?: string;

  @Column({ name: 'last_login_at', nullable: true })
  lastLoginAt?: Date;

  /* ================= Relations ================= */

  @OneToOne(() => UserProfile, (p) => p.user)
  profile: UserProfile;

  @ManyToMany(() => Role)
  @JoinTable({
    name: 'user_roles',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'role_id' },
  })
  roles: Role[];

  @OneToMany(() => UserSession, (s) => s.user)
  sessions: UserSession[];

  @OneToMany(() => UserOAuthAccount, (oa) => oa.user)
  oauthAccounts: UserOAuthAccount[];

  @OneToMany(() => PasswordResetToken, (t) => t.user)
  passwordResetTokens: PasswordResetToken[];
}

