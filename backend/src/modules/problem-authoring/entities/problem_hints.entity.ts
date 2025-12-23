
// problems/entities/problem-hint.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import {
  Entity,
  Column,
  ManyToOne,
  Unique,
  JoinColumn,
} from 'typeorm';
import { ProblemVersion } from './problem_versions.entity';

@Entity('problem_hints')
@Unique(['problemVersion', 'stepNo'])
export class ProblemHint extends BaseEntity {
  @ManyToOne(() => ProblemVersion, (v) => v.hints, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'problem_version_id' })
  problemVersion: ProblemVersion;

  @Column({ name: 'step_no' })
  stepNo: number;

  @Column({ type: 'longtext' })
  contentMd: string;
}
