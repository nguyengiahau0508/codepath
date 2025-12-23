
// analytics/entities/problem-analytics-daily.entity.ts
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

@Entity('problem_analytics_daily')
export class ProblemAnalyticsDaily {
  @PrimaryColumn({ name: 'problem_id', type: 'bigint' })
  problemId: number;

  @PrimaryColumn({ type: 'date' })
  date: string; // YYYY-MM-DD

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({ default: 0 })
  submissions: number;

  @Column({ default: 0 })
  accepted: number;

  @Column({ name: 'unique_users', default: 0 })
  uniqueUsers: number;

  @Column({ name: 'avg_runtime_ms', nullable: true })
  avgRuntimeMs?: number;

  @Column({ name: 'avg_memory_kb', nullable: true })
  avgMemoryKb?: number;
}
