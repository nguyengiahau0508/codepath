
// submissions/entities/submission-testcase-result.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
  Index,
} from 'typeorm';
import { SubmissionTestcaseStatus } from '../enums/submission-testcase-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { Submission } from './submissions.entity';
import { TestCase } from 'src/modules/problem-authoring/entities/test_cases.entity';

@Entity('submission_testcase_results')
@Unique(['submission', 'testCase'])
@Index('idx_submission_testcase_status', ['status'])
export class SubmissionTestcaseResult extends BaseEntity {
  @ManyToOne(() => Submission, (s) => s.testcaseResults, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @ManyToOne(() => TestCase, { nullable: false })
  @JoinColumn({ name: 'test_case_id' })
  testCase: TestCase;

  @Column({ type: 'enum', enum: SubmissionTestcaseStatus })
  status: SubmissionTestcaseStatus;

  @Column({ name: 'time_ms', nullable: true })
  timeMs?: number;

  @Column({ name: 'memory_kb', nullable: true })
  memoryKb?: number;

  @Column({ type: 'text', nullable: true })
  outputPreview?: string;
}
