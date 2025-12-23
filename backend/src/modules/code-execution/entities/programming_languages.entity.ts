
// programming-languages/entities/programming-language.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';
import { CodeDraft } from './code_drafts.entity';
import { CodeRun } from './code_runs.entity';

@Entity('programming_languages')
@Index('idx_programming_languages_code', ['code'])
@Index('idx_programming_languages_enabled', ['isEnabled'])
export class ProgrammingLanguage extends BaseEntity {
  @Column({ length: 20, unique: true })
  code: string; // cpp, python, java, ...

  @Column({ length: 50 })
  name: string;

  @Column({ type: 'text', nullable: true })
  compileCommandTpl?: string;

  @Column({ type: 'text', nullable: true })
  runCommandTpl?: string;

  @Column({ default: true })
  isEnabled: boolean;

  @OneToMany(() => CodeDraft, (d) => d.language)
  drafts: CodeDraft[];

  @OneToMany(() => CodeRun, (r) => r.language)
  runs: CodeRun[];
}
