
// problems/entities/test-case.entity.ts
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { TestGroup } from './test_groups.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity('test_cases')
export class TestCase extends BaseEntity {
  @ManyToOne(() => TestGroup, (g) => g.testCases, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'test_group_id' })
  testGroup: TestGroup;

  @Column({ type: 'longtext' })
  inputData: string;

  @Column({ type: 'longtext', nullable: true })
  expectedOutput?: string;

  @Column({ name: 'time_limit_ms' })
  timeLimitMs: number;

  @Column({ name: 'memory_limit_kb' })
  memoryLimitKb: number;

  @Column({ name: 'is_hidden', default: true })
  isHidden: boolean;

  @Column({ length: 64, nullable: true })
  hash?: string;

  @Column({ name: 'order_no', nullable: true })
  orderNo?: number;
}
