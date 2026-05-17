import { Column, Entity } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('stock_movements')
export class StockMovement extends TenantBaseEntity {
  @Column({ type: 'uuid' })
  productId: string;

  @Column({ type: 'uuid' })
  warehouseId: string;

  @Column()
  type: string;

  @Column({ type: 'numeric', precision: 14, scale: 2 })
  quantity: number;

  @Column({ nullable: true })
  referenceType?: string;

  @Column({ type: 'uuid', nullable: true })
  referenceId?: string;

  @Column({ type: 'text', nullable: true })
  note?: string;
}
