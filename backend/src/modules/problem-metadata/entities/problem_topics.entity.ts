
// modules/problem-metadata/entities/problem-topic.entity.ts
import { Problem } from 'src/modules/problem-authoring/entities/problems.entity';
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  Index,
  CreateDateColumn,
} from 'typeorm';
import { Topic } from './topics.entity';

@Entity('problem_topics')
@Index('idx_problem_topics_problem', ['problemId'])
@Index('idx_problem_topics_topic', ['topicId'])
export class ProblemTopic {
  /* ===== Composite PK ===== */

  @PrimaryColumn({ name: 'problem_id', type: 'bigint' })
  problemId: number;

  @PrimaryColumn({ name: 'topic_id', type: 'bigint' })
  topicId: number;

  /* ===== Relations ===== */

  @ManyToOne(() => Problem, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'problem_id' })
  problem: Problem;

  @ManyToOne(() => Topic, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'topic_id' })
  topic: Topic;

  /* ===== Timestamps ===== */

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
