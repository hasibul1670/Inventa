import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('payments')
export class Payment extends TenantBaseEntity {
  @Column({ type: 'uuid' })
  invoiceId: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  amount: number;

  @Column()
  paymentMethod: string;

  @Column({ type: 'timestamp' })
  paymentDate: Date;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
