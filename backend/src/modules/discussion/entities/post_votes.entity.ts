
// discussions/entities/post-vote.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { DiscussionPost } from './discussion_posts.entity';
import { User } from 'src/modules/identity/entities/users.entity';

@Entity('post_votes')
@Index('idx_post_votes_post', ['postId'])
@Index('idx_post_votes_user', ['userId'])
export class PostVote {
  @PrimaryColumn({ name: 'post_id', type: 'bigint' })
  postId: number;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => DiscussionPost, (p) => p.votes, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'post_id' })
  post: DiscussionPost;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  /**
   * vote: -1 (downvote), 0 (neutral/remove), 1 (upvote)
   */
  @Column({ type: 'tinyint' })
  vote: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
