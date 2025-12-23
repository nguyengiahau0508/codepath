
// badges/entities/badge.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { UserBadge } from './user_badges.entity';

@Entity('badges')
export class Badge extends BaseEntity {
  @Column({ length: 100, unique: true })
  code: string;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ name: 'icon_url', length: 255, nullable: true })
  iconUrl?: string;

  @OneToMany(() => UserBadge, (ub) => ub.badge)
  userBadges: UserBadge[];
}
