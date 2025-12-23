
// problems/entities/problem-version.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ProblemChecker } from './problem_checkers.entity';
import { TestGroup } from './test_groups.entity';
import { ProblemHint } from './problem_hints.entity';
import { ProblemExample } from './problem_examples.entity';
import { ProblemStatement } from './problem_statements.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { Problem } from './problems.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('problem_versions')
@Unique(['problem', 'versionNo'])
export class ProblemVersion extends BaseEntity {
  @ManyToOne(() => Problem, (p) => p.versions, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({ name: 'version_no' })
  versionNo: number;

  @Column({ type: 'text', nullable: true })
  changeLog?: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @OneToMany(() => ProblemStatement, (s) => s.problemVersion)
  statements: ProblemStatement[];

  @OneToMany(() => ProblemExample, (e) => e.problemVersion)
  examples: ProblemExample[];

  @OneToMany(() => ProblemHint, (h) => h.problemVersion)
  hints: ProblemHint[];

  @OneToMany(() => TestGroup, (g) => g.problemVersion)
  testGroups: TestGroup[];

  @OneToMany(() => ProblemChecker, (c) => c.problemVersion)
  checkers: ProblemChecker[];
}
