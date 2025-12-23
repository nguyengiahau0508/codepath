
// modules/identity/entities/password-reset-token.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from './users.entity';

@Entity('password_reset_tokens')
export class PasswordResetToken extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'token_hash' })
  tokenHash: string;

  @Column({ name: 'expires_at' })
  expiresAt: Date;

  @Column({ name: 'used_at', nullable: true })
  usedAt?: Date;
}
