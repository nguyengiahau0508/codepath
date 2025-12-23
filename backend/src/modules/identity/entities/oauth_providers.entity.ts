
// modules/identity/entities/oauth-provider.entity.ts
import { BaseEntity } from 'src/common/base/base.entity';
import { Entity, Column } from 'typeorm';

@Entity('oauth_providers')
export class OAuthProvider extends BaseEntity {
  @Column({ unique: true, length: 50 })
  code: string;
}
