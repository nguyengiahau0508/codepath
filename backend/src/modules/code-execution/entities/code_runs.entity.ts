
// code-runs/entities/code-run.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { CodeRunStatus } from '../enums/code-run-status.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { ProblemVersion } from 'src/modules/problem-authoring/entities/problem_versions.entity';
import { ProgrammingLanguage } from './programming_languages.entity';

@Entity('code_runs')
@Index('idx_code_runs_user', ['user'])
@Index('idx_code_runs_status', ['status'])
@Index('idx_code_runs_problem', ['problemVersion'])
export class CodeRun extends BaseEntity {
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

  @Column({ type: 'longtext', nullable: true })
  stdin?: string;

  @Column({ type: 'enum', enum: CodeRunStatus })
  status: CodeRunStatus;

  @Column({ name: 'time_ms', nullable: true })
  timeMs?: number;

  @Column({ name: 'memory_kb', nullable: true })
  memoryKb?: number;

  @Column({ type: 'longtext', nullable: true })
  stdout?: string;

  @Column({ type: 'longtext', nullable: true })
  stderr?: string;
}
