
// judge-jobs/entities/judge-job.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { JudgeJobStatus } from '../enums/judge-job-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { Submission } from './submissions.entity';

@Entity('judge_jobs')
@Index('idx_judge_jobs_submission', ['submission'])
@Index('idx_judge_jobs_status', ['queueStatus'])
@Index('idx_judge_jobs_worker', ['workerId'])
export class JudgeJob extends BaseEntity {
  @ManyToOne(() => Submission, (s) => s.judgeJobs, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @Column({ type: 'enum', enum: JudgeJobStatus })
  queueStatus: JudgeJobStatus;

  @Column({ default: 0 })
  attempt: number;

  @Column({ name: 'worker_id', length: 100, nullable: true })
  workerId?: string;

  @Column({ name: 'started_at', type: 'datetime', nullable: true })
  startedAt?: Date;

  @Column({ name: 'finished_at', type: 'datetime', nullable: true })
  finishedAt?: Date;
}
