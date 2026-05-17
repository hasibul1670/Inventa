import { Module } from '@nestjs/common';
import { TenantDataSourceManager } from '@app/common';
import { InvoicesController } from './invoices/invoices.controller';
import { PaymentsController } from './payments/payments.controller';
import { SalesController } from './sales/sales.controller';
import { SalesService } from './sales.service';

@Module({
  controllers: [SalesController, InvoicesController, PaymentsController],
  providers: [SalesService, TenantDataSourceManager],
})
export class SalesModule {}
