
// contests/entities/contest-participant.entity.ts
import {
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
  CreateDateColumn,
  Column,
  Index,
} from 'typeorm';
import { Contest } from './contests.entity';
import { User } from 'src/modules/identity/entities/users.entity';

@Entity('contest_participants')
@Index('idx_contest_participants_contest', ['contestId'])
@Index('idx_contest_participants_user', ['userId'])
export class ContestParticipant {
  @PrimaryColumn({ name: 'contest_id', type: 'bigint' })
  contestId: number;

  @PrimaryColumn({ name: 'user_id', type: 'bigint' })
  userId: number;

  @ManyToOne(() => Contest)
  @JoinColumn({ name: 'contest_id' })
  contest: Contest;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ name: 'joined_at' })
  joinedAt: Date;

  @Column({
    name: 'virtual_start_at',
    type: 'datetime',
    nullable: true,
  })
  virtualStartAt?: Date;

  @Column({
    name: 'virtual_end_at',
    type: 'datetime',
    nullable: true,
  })
  virtualEndAt?: Date;
}
