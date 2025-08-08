import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserSession {
  @PrimaryGeneratedColumn({ type: 'bigint', unsigned: true })
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'device_info', length: 512, nullable: true })
  deviceInfo?: string;

  @Column({ name: 'ip_address', length: 45, nullable: true })
  ipAddress?: string;

  @Column({ name: 'login_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  loginAt: Date;

  @Column({ name: 'logout_at', type: 'timestamp', nullable: true })
  logoutAt?: Date;

  @Column({ name: 'refresh_jti', type: 'char', length: 36, nullable: true })
  refreshJti?: string | null;
}

