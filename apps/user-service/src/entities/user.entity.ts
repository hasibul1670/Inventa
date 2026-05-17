import { Column, Entity, Index } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('users')
@Index(['tenantId', 'email'], { unique: true })
export class User extends TenantBaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  fullName: string;

  @Column({ default: 'EMPLOYEE' })
  role: string;

  @Column({ default: true })
  isActive: boolean;
}
