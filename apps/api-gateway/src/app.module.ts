import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { JwtModule } from '@nestjs/jwt';
import { SERVICES } from '@app/common';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { PartiesController } from './parties/parties.controller';
import { InventoryController } from './inventory/inventory.controller';
import { SalesController } from './sales/sales.controller';
import { MicroserviceProxy } from './common/microservice.proxy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET', 'change_me'),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: SERVICES.AUTH,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('AUTH_SERVICE_HOST', 'localhost'),
            port: config.get<number>('AUTH_SERVICE_PORT', 3001),
          },
        }),
      },
      {
        name: SERVICES.USER,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('USER_SERVICE_HOST', 'localhost'),
            port: config.get<number>('USER_SERVICE_PORT', 3002),
          },
        }),
      },
      {
        name: SERVICES.PARTY,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('PARTY_SERVICE_HOST', 'localhost'),
            port: config.get<number>('PARTY_SERVICE_PORT', 3003),
          },
        }),
      },
      {
        name: SERVICES.INVENTORY,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('INVENTORY_SERVICE_HOST', 'localhost'),
            port: config.get<number>('INVENTORY_SERVICE_PORT', 3004),
          },
        }),
      },
      {
        name: SERVICES.SALES,
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: config.get<string>('SALES_SERVICE_HOST', 'localhost'),
            port: config.get<number>('SALES_SERVICE_PORT', 3005),
          },
        }),
      },
    ]),
  ],
  controllers: [
    AuthController,
    UsersController,
    PartiesController,
    InventoryController,
    SalesController,
  ],
  providers: [MicroserviceProxy],
})
export class AppModule {}
