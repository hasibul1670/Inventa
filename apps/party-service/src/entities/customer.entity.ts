import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('customers')
export class Customer extends TenantBaseEntity {
  @Column()
  name: string;

  @Column({ nullable: true })
  phone?: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  openingBalance: number;

  @Column({ default: true })
  isActive: boolean;
}
