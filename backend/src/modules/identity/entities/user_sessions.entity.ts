
// modules/identity/entities/user-session.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from './users.entity';

@Entity('user_sessions')
@Index('idx_user_sessions_user', ['user'])
export class UserSession extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'refresh_token_hash' })
  refreshTokenHash: string;

  @Column({ length: 45, nullable: true })
  ip?: string;

  @Column({ name: 'user_agent', nullable: true })
  userAgent?: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'revoked_at', nullable: true })
  revokedAt?: Date;
}

