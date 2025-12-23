
// problems/entities/problem-statement.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ProblemVersion } from './problem_versions.entity';
import { Language } from 'src/modules/reference/entities/languages.entity';

@Entity('problem_statements')
@Unique(['problemVersion', 'language'])
export class ProblemStatement extends BaseEntity {
  @ManyToOne(() => ProblemVersion, (v) => v.statements, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @ManyToOne(() => Language, (l) => l.statements)
  @JoinColumn({ name: 'language_id' })
  language: Language;

  @Column()
  title: string;

  @Column({ type: 'longtext' })
  descriptionMd: string;

  @Column({ type: 'longtext', nullable: true })
  inputSpecMd?: string;

  @Column({ type: 'longtext', nullable: true })
  outputSpecMd?: string;

  @Column({ type: 'longtext', nullable: true })
  constraintsMd?: string;

  @Column({ type: 'longtext', nullable: true })
  notesMd?: string;
}
