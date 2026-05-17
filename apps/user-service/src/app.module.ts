import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('USER_DB_HOST', 'localhost'),
        port: config.get<number>('USER_DB_PORT', 5432),
        username: config.get<string>('USER_DB_USER', 'postgres'),
        password: config.get<string>('USER_DB_PASS', 'postgres'),
        database: config.get<string>('USER_DB_NAME', 'ims_users'),
        entities: [User],
        synchronize: config.get<string>('DB_SYNCHRONIZE') === 'true',
        migrations: ['dist/apps/user-service/migrations/*.js'],
      }),
    }),
    UsersModule,
  ],
})
export class AppModule {}
