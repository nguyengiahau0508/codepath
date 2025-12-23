
// badges/entities/user-badge.entity.ts
import { User } from 'src/modules/identity/entities/users.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Badge } from './badges.entity';

@Entity('user_badges')
@Index('idx_user_badges_user', ['userId'])
@Index('idx_user_badges_badge', ['badgeId'])
export class UserBadge {
  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @PrimaryColumn({ name: 'badge_id', type: 'bigint' })
  badgeId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Badge)
  @JoinColumn({ name: 'badge_id' })
  badge: Badge;

  @CreateDateColumn({ name: 'earned_at' })
  earnedAt: Date;
}
