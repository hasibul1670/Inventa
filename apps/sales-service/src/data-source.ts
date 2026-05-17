import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Invoice } from './entities/invoice.entity';
import { Payment } from './entities/payment.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Sale } from './entities/sale.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.SALES_DB_HOST ?? 'localhost',
  port: Number(process.env.SALES_DB_PORT ?? 5432),
  username: process.env.SALES_DB_USER ?? 'postgres',
  password: process.env.SALES_DB_PASS ?? 'postgres',
  database: process.env.SALES_DB_NAME ?? 'ims_sales',
  entities: [Sale, SaleItem, Invoice, Payment],
  migrations: ['apps/sales-service/src/migrations/*.ts'],
  synchronize: false,
});
