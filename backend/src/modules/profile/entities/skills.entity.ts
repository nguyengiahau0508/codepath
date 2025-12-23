
// modules/profile/entities/skill.entity.ts
import {
  Entity,
  Column,
  OneToMany,
} from 'typeorm';
import { UserSkill } from './user_skills.entity';
import { BaseEntity } from 'src/common/base/base.entity';
@Entity('skills')
export class Skill extends BaseEntity {
  @Column({ length: 100, unique: true })
  name: string;

  /* ================= Relations ================= */

  @OneToMany(() => UserSkill, (us) => us.skill)
  userSkills: UserSkill[];
}
