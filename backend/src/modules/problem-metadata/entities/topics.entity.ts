
// modules/problem-metadata/entities/topic.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ProblemTopic } from './problem_topics.entity';

@Entity('topics')
export class Topic extends BaseEntity {
  @Column({ length: 100, unique: true, nullable: true })
  slug?: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => ProblemTopic, (pt) => pt.topic)
  problemTopics: ProblemTopic[];
}
