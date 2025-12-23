
// contests/entities/contest-submission.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { Contest } from './contests.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { Submission } from 'src/modules/judge/entities/submissions.entity';
import { ProblemVersion } from 'src/modules/problem-authoring/entities/problem_versions.entity';

@Entity('contest_submissions')
@Index('idx_contest_submissions_contest', ['contest'])
@Index('idx_contest_submissions_user', ['user'])
@Index('idx_contest_submissions_submission', ['submission'])
export class ContestSubmission extends BaseEntity {
  @ManyToOne(() => Contest, { nullable: false })
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Submission, { nullable: false })
  @JoinColumn({ name: 'submission_id' })
  submission: Submission;

  @ManyToOne(() => ProblemVersion, { nullable: false })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @CreateDateColumn({ name: 'submitted_at' })
  submittedAt: Date;
}
