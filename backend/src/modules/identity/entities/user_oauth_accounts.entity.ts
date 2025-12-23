
// modules/identity/entities/user-oauth-account.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from './users.entity';
import { OAuthProvider } from './oauth_providers.entity';

@Entity('user_oauth_accounts')
@Unique(['provider', 'providerUserId'])
export class UserOAuthAccount extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => OAuthProvider, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'provider_id' })
  provider: OAuthProvider;

  @Column({ name: 'provider_user_id' })
  providerUserId: string;

  @Column({ name: 'access_token', type: 'text', nullable: true })
  accessToken?: string;

  @Column({ name: 'refresh_token', type: 'text', nullable: true })
  refreshToken?: string;
}
