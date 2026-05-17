import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.USER_DB_HOST ?? 'localhost',
  port: Number(process.env.USER_DB_PORT ?? 5432),
  username: process.env.USER_DB_USER ?? 'postgres',
  password: process.env.USER_DB_PASS ?? 'postgres',
  database: process.env.USER_DB_NAME ?? 'ims_users',
  entities: [User],
  migrations: ['apps/user-service/src/migrations/*.ts'],
  synchronize: false,
});
