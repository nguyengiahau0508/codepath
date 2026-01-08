
// languages/entities/language.entity.ts
import { BaseEntity } from '../../../common/base/base.entity';
import { ProblemChecker } from '../../problem-authoring/entities/problem_checkers.entity';
import { ProblemStatement } from 'src/modules/problem-authoring/entities/problem_statements.entity';
import { Entity, Column, OneToMany, Index } from 'typeorm';

@Entity('languages')
@Index('idx_languages_code', ['code'])
export class Language extends BaseEntity {
  @Column({ length: 10, unique: true })
  code: string;

  @Column({ length: 50 })
  name: string;

  @OneToMany(() => ProblemStatement, (s) => s.language)
  statements: ProblemStatement[];
}
