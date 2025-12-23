
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
import { Language } from 'src/modules/reference/entities/languages.entity';

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

  @ManyToOne(() => Language, { nullable: true })
  @JoinColumn({ name: 'language_id' })
  language?: Language;
}
