
// submissions/entities/submission.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  Index,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { SubmissionStatus } from '../enums/submission-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { ProblemVersion } from 'src/modules/problem-authoring/entities/problem_versions.entity';
import { ProgrammingLanguage } from 'src/modules/code-execution/entities/programming_languages.entity';
import { SubmissionTestcaseResult } from './submission_testcase_results.entity';
import { JudgeJob } from './judge_jobs.entity';

@Entity('submissions')
@Index('idx_submissions_user', ['user', 'createdAt'])
@Index('idx_submissions_problem', ['problemVersion'])
@Index('idx_submissions_status', ['status'])
@Index('idx_submissions_language', ['language'])
export class Submission extends BaseEntity {
  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => ProblemVersion, { nullable: false })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @ManyToOne(() => ProgrammingLanguage, { nullable: false })
  @JoinColumn({ name: 'language_id' })
  language: ProgrammingLanguage;

  @Column({ type: 'longtext' })
  sourceCode: string;

  @Column({ type: 'enum', enum: SubmissionStatus })
  status: SubmissionStatus;

  @Column({ default: 0 })
  score: number;

  @Column({ name: 'runtime_ms', nullable: true })
  runtimeMs?: number;

  @Column({ name: 'memory_kb', nullable: true })
  memoryKb?: number;

  @OneToMany(
    () => SubmissionTestcaseResult,
    (r) => r.submission,
  )
  testcaseResults: SubmissionTestcaseResult[];

  @OneToMany(() => JudgeJob, (j) => j.submission)
  judgeJobs: JudgeJob[];
}
