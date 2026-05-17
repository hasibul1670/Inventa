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
        host: process.env.PARTY_SERVICE_HOST ?? 'localhost',
        port: Number(process.env.PARTY_SERVICE_PORT ?? 3003),
      },
    },
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  const config = app.get(ConfigService);
  await app.listen();
  Logger.log(`Party service listening on TCP ${config.get('PARTY_SERVICE_PORT', 3003)}`);
}

bootstrap();
