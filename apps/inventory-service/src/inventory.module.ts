import { Module } from '@nestjs/common';
import { TenantDataSourceManager } from '@app/common';
import { ProductsController } from './products/products.controller';
import { WarehousesController } from './warehouses/warehouses.controller';
import { StockMovementsController } from './stock-movements/stock-movements.controller';
import { InventoryService } from './inventory.service';

@Module({
  controllers: [ProductsController, WarehousesController, StockMovementsController],
  providers: [InventoryService, TenantDataSourceManager],
})
export class InventoryModule {}
