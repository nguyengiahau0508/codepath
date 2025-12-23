
// modules/profile/entities/user-skill.entity.ts
import { User } from 'src/modules/identity/entities/users.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { Skill } from './skills.entity';
@Entity('user_skills')
export class UserSkill {
  /* ===== Composite Primary Key ===== */

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @PrimaryColumn({ name: 'skill_id', type: 'bigint' })
  skillId: number;

  /* ===== Relations ===== */

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  /* ===== Extra fields ===== */

  @Column({ type: 'tinyint', nullable: true })
  level?: number;

  @Column({ type: 'tinyint', nullable: true })
  years?: number;
}

