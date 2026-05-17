import { Module } from '@nestjs/common';
import { TenantDataSourceManager } from '@app/common';
import { CustomersController } from './customers/customers.controller';
import { SuppliersController } from './suppliers/suppliers.controller';
import { PartyCrudService } from './party-crud.service';

@Module({
  controllers: [CustomersController, SuppliersController],
  providers: [PartyCrudService, TenantDataSourceManager],
})
export class PartiesModule {}
