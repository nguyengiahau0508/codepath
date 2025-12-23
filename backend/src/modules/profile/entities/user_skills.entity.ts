
// modules/profile/entities/user-skill.entity.ts
import { User } from 'src/modules/identity/entities/users.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Skill } from './skills.entity';
@Entity('user_skills')
export class UserSkill {
  /* ===== Composite Primary Key ===== */

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  @Index('idx_user_skills_user')
  userId: number;

  @PrimaryColumn({ name: 'skill_id', type: 'bigint' })
  @Index('idx_user_skills_skill')
  skillId: number;

  /* ===== Relations ===== */

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Skill, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'skill_id' })
  skill: Skill;

  /* ===== Extra fields ===== */

  @Column({ type: 'tinyint', nullable: true, unsigned: true })
  level?: number;

  @Column({ type: 'tinyint', nullable: true, unsigned: true })
  years?: number;

  /* ===== Timestamps ===== */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}

