
// discussions/entities/discussion-post.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  Index,
} from 'typeorm';
import { DiscussionThread } from './discussion_threads.entity';
import { PostVote } from './post_votes.entity';
import { ProgrammingLanguage } from 'src/modules/code-execution/entities/programming_languages.entity';
import { PostType } from '../enums/post-type.enum';
import { User } from 'src/modules/identity/entities/users.entity';

@Entity('discussion_posts')
@Index('idx_thread_time', ['thread', 'createdAt'])
@Index('idx_discussion_posts_author', ['author'])
@Index('idx_discussion_posts_parent', ['parentPost'])
@Index('idx_discussion_posts_type', ['postType'])
@Index('idx_discussion_posts_best', ['isBestSolution'])
export class DiscussionPost extends BaseEntity {
  @ManyToOne(() => DiscussionThread, (t) => t.posts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'thread_id' })
  thread: DiscussionThread;

  // self-referencing (reply tree)
  @ManyToOne(() => DiscussionPost, (p) => p.children, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  @JoinColumn({ name: 'parent_post_id' })
  parentPost?: DiscussionPost;

  @OneToMany(() => DiscussionPost, (p) => p.parentPost)
  children: DiscussionPost[];

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'author_id' })
  author: User;

  @Column({ type: 'longtext' })
  contentMd: string;

  @Column({ type: 'enum', enum: PostType })
  postType: PostType;

  @ManyToOne(() => ProgrammingLanguage, { nullable: true })
  @JoinColumn({ name: 'solution_language_id' })
  solutionLanguage?: ProgrammingLanguage;

  @Column({ name: 'is_best_solution', default: false })
  isBestSolution: boolean;

  @OneToMany(() => PostVote, (v) => v.post)
  votes: PostVote[];
}

