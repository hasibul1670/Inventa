import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('invoices')
export class Invoice extends TenantBaseEntity {
  @Column({ type: 'uuid' })
  saleId: string;

  @Column()
  invoiceNumber: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  paidAmount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  dueAmount: number;

  @Column({ default: 'UNPAID' })
  status: string;
}
