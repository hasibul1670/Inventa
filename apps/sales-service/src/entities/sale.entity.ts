import { Column, Entity, OneToMany } from 'typeorm';
import { TenantBaseEntity } from '@app/common';
import { SaleItem } from './sale-item.entity';

@Entity('sales')
export class Sale extends TenantBaseEntity {
  @Column({ type: 'uuid' })
  customerId: string;

  @Column()
  saleNumber: string;

  @Column({ default: 'DRAFT' })
  status: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  totalAmount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  discountAmount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  taxAmount: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  grandTotal: number;

  @OneToMany(() => SaleItem, (item) => item.sale, { cascade: true })
  items: SaleItem[];
}
