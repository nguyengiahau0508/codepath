
// contests/entities/contest-problem.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Contest } from './contests.entity';
import { ProblemVersion } from 'src/modules/problem-authoring/entities/problem_versions.entity';

@Entity('contest_problems')
@Index('idx_contest_problems_contest', ['contestId'])
@Index('idx_contest_problems_problem', ['problemVersionId'])
export class ContestProblem {
  @PrimaryColumn({ name: 'contest_id', type: 'bigint' })
  contestId: number;

  @PrimaryColumn({
    name: 'problem_version_id',
    type: 'bigint',
  })
  problemVersionId: number;

  @ManyToOne(() => Contest, (c) => c.problems, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @ManyToOne(() => ProblemVersion, { nullable: false })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @Column({ name: 'order_no', nullable: true })
  orderNo?: number;

  @Column({ name: 'base_points', nullable: true })
  basePoints?: number;

  @Column({ name: 'penalty_per_wrong', nullable: true })
  penaltyPerWrong?: number;

  /* ===== Timestamps ===== */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
