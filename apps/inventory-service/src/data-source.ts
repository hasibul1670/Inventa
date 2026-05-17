import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Product } from './entities/product.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { Warehouse } from './entities/warehouse.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.INVENTORY_DB_HOST ?? 'localhost',
  port: Number(process.env.INVENTORY_DB_PORT ?? 5432),
  username: process.env.INVENTORY_DB_USER ?? 'postgres',
  password: process.env.INVENTORY_DB_PASS ?? 'postgres',
  database: process.env.INVENTORY_DB_NAME ?? 'ims_inventory',
  entities: [Product, Warehouse, StockMovement],
  migrations: ['apps/inventory-service/src/migrations/*.ts'],
  synchronize: false,
});
