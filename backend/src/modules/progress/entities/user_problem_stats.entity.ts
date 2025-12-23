
// user-problem-stats/entities/user-problem-stat.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';
import { UserProblemStatus } from '../enums/user-problem-status.enum';
import { User } from 'src/modules/identity/entities/users.entity';
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';

@Entity('user_problem_stats')
export class UserProblemStat {
  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @PrimaryColumn({ name: 'problem_id', type: 'bigint' })
  problemId: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({
    type: 'enum',
    enum: UserProblemStatus,
  })
  bestStatus: UserProblemStatus;

  @Column({ name: 'best_runtime_ms', nullable: true })
  bestRuntimeMs?: number;

  @Column({ name: 'best_memory_kb', nullable: true })
  bestMemoryKb?: number;

  @Column({ name: 'first_solved_at', type: 'datetime', nullable: true })
  firstSolvedAt?: Date;

  @Column({ name: 'last_attempt_at', type: 'datetime', nullable: true })
  lastAttemptAt?: Date;
}
