
// modules/identity/entities/role.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('roles')
export class Role extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string;
}

