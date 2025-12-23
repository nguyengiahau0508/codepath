
// code-drafts/entities/code-draft.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
  Index,
} from 'typeorm';
import { ProgrammingLanguage } from './programming_languages.entity';
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';

@Entity('code_drafts')
@Unique(['user', 'problem', 'language'])
@Index('idx_code_drafts_user', ['user'])
@Index('idx_code_drafts_problem', ['problem'])
export class CodeDraft extends BaseEntity {
  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => ProgrammingLanguage, { nullable: false })
  @JoinColumn({ name: 'language_id' })
  language: ProgrammingLanguage;

  @Column({ type: 'longtext' })
  sourceCode: string;
}
