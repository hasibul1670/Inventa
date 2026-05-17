import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ensurePostgresDatabase } from '@app/common';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const host = config.get<string>('USER_DB_HOST', 'localhost');
        const port = config.get<number>('USER_DB_PORT', 5432);
        const username = config.get<string>('USER_DB_USER', 'postgres');
        const password = config.get<string>('USER_DB_PASS', 'postgres');
        const database = config.get<string>('USER_DB_NAME', 'ims_users');

        await ensurePostgresDatabase({
          host,
          port,
          username,
          password,
          database,
          maintenanceDatabase: config.get<string>(
            'POSTGRES_MAINTENANCE_DB',
            'postgres',
          ),
        });

        return {
          type: 'postgres',
          host,
          port,
          username,
          password,
          database,
          entities: [User],
          synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
          migrations: ['dist/apps/user-service/migrations/*.js'],
        };
      },
    }),
    UsersModule,
  ],
})
export class AppModule {}
