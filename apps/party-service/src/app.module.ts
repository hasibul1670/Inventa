import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PartiesModule } from './parties.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PartiesModule,
  ],
})
export class AppModule {}
