
// problems/entities/problem-example.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ProblemVersion } from './problem_versions.entity';

@Entity('problem_examples')
export class ProblemExample extends BaseEntity {
  @ManyToOne(() => ProblemVersion, (v) => v.examples, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @Column({ name: 'order_no' })
  orderNo: number;

  @Column({ type: 'longtext' })
  inputText: string;

  @Column({ type: 'longtext' })
  outputText: string;

  @Column({ type: 'longtext', nullable: true })
  explanationMd?: string;
}
