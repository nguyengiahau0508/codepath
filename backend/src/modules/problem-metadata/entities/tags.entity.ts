
// modules/problem-metadata/entities/tag.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, OneToMany } from 'typeorm';
import { ProblemTag } from './problem_tags.entity';
@Entity('tags')
export class Tag extends BaseEntity {
  @Column({ length: 100, unique: true, nullable: true })
  slug?: string;

  @Column({ length: 100 })
  name: string;

  @OneToMany(() => ProblemTag, (pt) => pt.tag)
  problemTags: ProblemTag[];
}
