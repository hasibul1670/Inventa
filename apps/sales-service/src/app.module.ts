import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SalesModule } from './sales.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    SalesModule,
  ],
})
export class AppModule {}
