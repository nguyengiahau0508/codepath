
// contests/entities/contest.entity.ts
import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';
import { ContestType } from '../enums/contest-type.enum';
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import { ContestProblem } from './contest_problems.entity';
import { ContestParticipant } from './contest_participants.entity';
import { ContestSubmission } from './contest_submissions.entity';

@Entity('contests')
@Index('idx_contests_code', ['code'])
@Index('idx_contests_start_end', ['startAt', 'endAt'])
@Index('idx_contests_type', ['type'])
export class Contest extends BaseEntity {
  @Column({ length: 100, unique: true })
  code: string;

  @Column({ length: 255 })
  name: string;

  @Column({ name: 'start_at', type: 'datetime', nullable: true })
  startAt?: Date;

  @Column({ name: 'end_at', type: 'datetime', nullable: true })
  endAt?: Date;

  @Column({ type: 'enum', enum: ContestType })
  type: ContestType;

  @Column({ name: 'is_rated', default: false })
  isRated: boolean;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'created_by' })
  createdBy?: User;

  @OneToMany(() => ContestProblem, (cp) => cp.contest)
  problems: ContestProblem[];

  @OneToMany(() => ContestParticipant, (p) => p.contest)
  participants: ContestParticipant[];

  @OneToMany(() => ContestSubmission, (cs) => cs.contest)
  submissions: ContestSubmission[];
}
