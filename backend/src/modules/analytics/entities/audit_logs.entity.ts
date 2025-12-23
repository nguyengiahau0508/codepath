
// audit/entities/audit-log.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { User } from 'src/modules/identity/entities/users.entity';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Index,
} from 'typeorm';

@Entity('audit_logs')
@Index('idx_audit_logs_actor', ['actorUser'])
@Index('idx_audit_logs_action', ['action'])
@Index('idx_audit_logs_target', ['targetType', 'targetId'])
@Index('idx_audit_logs_created_at', ['createdAt'])
export class AuditLog extends BaseEntity {
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser?: User;

  @Column({ length: 100, nullable: true })
  action?: string;
  /**
   * ví dụ:
   * - problem.create
   * - problem.update
   * - submission.rejudge
   * - user.ban
   */

  @Column({ name: 'target_type', length: 100, nullable: true })
  targetType?: string;
  /**
   * ví dụ:
   * - problem
   * - submission
   * - contest
   * - user
   */

  @Column({ name: 'target_id', type: 'bigint', unsigned: true, nullable: true })
  targetId?: number;

  @Column({ name: 'metadata_json', type: 'json', nullable: true })
  metadata?: Record<string, any>;
  /**
   * JSON tuỳ ý:
   * {
   *   old_status: 'draft',
   *   new_status: 'published',
   *   ip: '1.2.3.4'
   * }
   */
}
