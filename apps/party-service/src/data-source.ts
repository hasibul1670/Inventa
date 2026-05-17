import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { Customer } from './entities/customer.entity';
import { Supplier } from './entities/supplier.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.PARTY_DB_HOST ?? 'localhost',
  port: Number(process.env.PARTY_DB_PORT ?? 5432),
  username: process.env.PARTY_DB_USER ?? 'postgres',
  password: process.env.PARTY_DB_PASS ?? 'postgres',
  database: process.env.PARTY_DB_NAME ?? 'ims_parties',
  entities: [Customer, Supplier],
  migrations: ['apps/party-service/src/migrations/*.ts'],
  synchronize: false,
});
