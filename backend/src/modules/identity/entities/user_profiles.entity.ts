
// modules/identity/entities/user-profile.entity.ts
import {
  Entity,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './users.entity';

@Entity('user_profiles')
export class UserProfile {
  @Column({ name: 'user_id', type: 'bigint', primary: true })
  userId: number;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'avatar_url', length: 500, nullable: true })
  avatarUrl?: string;

  @Column({ type: 'text', nullable: true })
  bio?: string;

  @Column({ name: 'experience_points', default: 0 })
  experiencePoints: number;

  @Column({ default: 1 })
  level: number;
}

