import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        host: process.env.SALES_SERVICE_HOST ?? 'localhost',
        port: Number(process.env.SALES_SERVICE_PORT ?? 3005),
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);
  await app.listen();
  Logger.log(`Sales service listening on TCP ${config.get('SALES_SERVICE_PORT', 3005)}`);
}

bootstrap();
