import { Column, Entity, ManyToOne } from 'typeorm';
import { TenantBaseEntity } from '@app/common';
import { Sale } from './sale.entity';

@Entity('sale_items')
export class SaleItem extends TenantBaseEntity {
  @Column({ type: 'uuid' })
  saleId: string;

  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  quantity: number;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  unitPrice: number;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  totalPrice: number;

  @ManyToOne(() => Sale, (sale) => sale.items)
  sale: Sale;
}
