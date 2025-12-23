
// discussions/entities/discussion-thread.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
} from 'typeorm';
import { DiscussionPost } from './discussion_posts.entity';

@Entity('discussion_threads')
export class DiscussionThread extends BaseEntity {
  @ManyToOne(() => Problem, { nullable: false })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @Column({ length: 255, nullable: true })
  title?: string;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'created_by' })
  createdBy: User;

  @Column({ name: 'is_locked', default: false })
  isLocked: boolean;

  @OneToMany(() => DiscussionPost, (p) => p.thread)
  posts: DiscussionPost[];
}
