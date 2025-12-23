
// problems/entities/test-group.entity.ts
import { Entity, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { TestCase } from './test_cases.entity';
import { ProblemVersion } from './problem_versions.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('test_groups')
export class TestGroup extends BaseEntity {
  @ManyToOne(() => ProblemVersion, (v) => v.testGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @Column({ nullable: true })
  name?: string;

  @Column({ name: 'order_no', nullable: true })
  orderNo?: number;

  @Column({ default: 0 })
  points: number;

  @Column({ name: 'is_sample', default: false })
  isSample: boolean;

  @OneToMany(() => TestCase, (tc) => tc.testGroup)
  testCases: TestCase[];
}
