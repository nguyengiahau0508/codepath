
// modules/problem-metadata/entities/problem-tag.entity.ts
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Tag } from './tags.entity';
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';

@Entity('problem_tags')
@Index('idx_problem_tags_problem', ['problemId'])
@Index('idx_problem_tags_tag', ['tagId'])
export class ProblemTag {
  @PrimaryColumn({ name: 'problem_id', type: 'bigint' })
  problemId: number;

  @PrimaryColumn({ name: 'tag_id', type: 'bigint' })
  tagId: number;

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => Tag, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  /* ===== Timestamps ===== */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
