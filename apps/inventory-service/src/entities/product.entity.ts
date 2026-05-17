import { Column, Entity, Index } from 'typeorm';
import { TenantBaseEntity } from '@app/common';

@Entity('products')
@Index(['tenantId', 'sku'], { unique: true })
export class Product extends TenantBaseEntity {
  @Column()
  name: string;

  @Column()
  sku: string;

  @Column({ nullable: true })
  barcode?: string;

  @Column({ nullable: true })
  category?: string;

  @Column({ nullable: true })
  brand?: string;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  purchasePrice: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  salePrice: number;

  @Column({ type: 'numeric', precision: 14, scale: 2, default: 0 })
  stockQuantity: number;

  @Column({ default: true })
  isActive: boolean;
}
