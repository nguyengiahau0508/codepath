
// problems/entities/problem-checker.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ProblemVersion } from './problem_versions.entity';
import { CheckerType } from '../enums/checker-type.enum';
import { ProgrammingLanguage } from 'src/modules/code-execution/entities/programming_languages.entity';

@Entity('problem_checkers')
export class ProblemChecker extends BaseEntity {
  @ManyToOne(() => ProblemVersion, (v) => v.checkers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @Column({ type: 'enum', enum: CheckerType })
  checkerType: CheckerType;

  @Column({ type: 'longtext', nullable: true })
  sourceCode?: string;

  @ManyToOne(() => ProgrammingLanguage, { nullable: true })
  @JoinColumn({ name: 'programming_language_id' })
  programmingLanguage?: ProgrammingLanguage;
}
