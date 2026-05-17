import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('warehouses')
export class Warehouse extends TenantBaseEntity {
  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  address?: string;

  @Column({ default: true })
  isActive: boolean;
}
