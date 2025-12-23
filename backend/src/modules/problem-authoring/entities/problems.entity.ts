import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
// problems/entities/problem.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { ProblemVersion } from './problem_versions.entity';
import { ProblemStatus } from '../enums/problem-status.enum';
import { ProblemDifficulty } from '../enums/problem-difficulty.enum';
import { ProblemTopic } from 'src/modules/problem-metadata/entities/problem_topics.entity';
import { ProblemCompany } from 'src/modules/problem-metadata/entities/problem_companies.entity';
import { ProblemTag } from 'src/modules/problem-metadata/entities/problem_tags.entity';

@Entity('problems')
export class Problem extends BaseEntity {
  @Column({ length: 150, unique: true })
  code: string;

  @Column({ type: 'enum', enum: ProblemDifficulty })
  difficulty: ProblemDifficulty;

  @Column({
    type: 'enum',
    enum: ProblemStatus,
    default: ProblemStatus.DRAFT,
  })
  status: ProblemStatus;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => ProblemVersion, (v) => v.problem)
  versions: ProblemVersion[];

  @OneToMany(() => ProblemTopic, (pt) => pt.problem)
  topics: ProblemTopic[];

  @OneToMany(() => ProblemCompany, (pc) => pc.problem)
  companies: ProblemCompany[];

  @OneToMany(() => ProblemTag, (pt) => pt.problem)
  tags: ProblemTag[];
}

