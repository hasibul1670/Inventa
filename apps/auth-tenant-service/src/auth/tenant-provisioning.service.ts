import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TenantDataSourceManager } from '@app/common';
import { Customer } from '../../../party-service/src/entities/customer.entity';
import { Supplier } from '../../../party-service/src/entities/supplier.entity';
import { Product } from '../../../inventory-service/src/entities/product.entity';
import { StockMovement } from '../../../inventory-service/src/entities/stock-movement.entity';
import { Warehouse } from '../../../inventory-service/src/entities/warehouse.entity';
import { Invoice } from '../../../sales-service/src/entities/invoice.entity';
import { Payment } from '../../../sales-service/src/entities/payment.entity';
import { SaleItem } from '../../../sales-service/src/entities/sale-item.entity';
import { Sale } from '../../../sales-service/src/entities/sale.entity';

@Injectable()
export class TenantProvisioningService {
  constructor(
    private readonly config: ConfigService,
    private readonly tenantDataSources: TenantDataSourceManager,
  ) {}

  async provisionBusinessDatabases(tenantId: string) {
    const [party, inventory, sales] = await Promise.all([
      this.provisionPartyDatabase(tenantId),
      this.provisionInventoryDatabase(tenantId),
      this.provisionSalesDatabase(tenantId),
    ]);

    return { party, inventory, sales };
  }

  private async provisionPartyDatabase(tenantId: string) {
    const dataSource = await this.tenantDataSources.getDataSource({
      tenantId,
      databasePrefix: this.config.get<string>(
        'PARTY_TENANT_DB_PREFIX',
        'ims_party_tenant',
      ),
      host: this.config.get<string>('PARTY_DB_HOST', 'localhost'),
      port: this.config.get<number>('PARTY_DB_PORT', 5432),
      username: this.config.get<string>('PARTY_DB_USER', 'postgres'),
      password: this.config.get<string>('PARTY_DB_PASS', 'postgres'),
      maintenanceDatabase: this.config.get<string>(
        'POSTGRES_MAINTENANCE_DB',
        'postgres',
      ),
      entities: [Customer, Supplier],
      synchronize: this.config.get<string>('DB_SYNCHRONIZE') === 'true',
      migrations: ['dist/apps/party-service/migrations/*.js'],
    });

    return { database: dataSource.options.database };
  }

  private async provisionInventoryDatabase(tenantId: string) {
    const dataSource = await this.tenantDataSources.getDataSource({
      tenantId,
      databasePrefix: this.config.get<string>(
        'INVENTORY_TENANT_DB_PREFIX',
        'ims_inventory_tenant',
      ),
      host: this.config.get<string>('INVENTORY_DB_HOST', 'localhost'),
      port: this.config.get<number>('INVENTORY_DB_PORT', 5432),
      username: this.config.get<string>('INVENTORY_DB_USER', 'postgres'),
      password: this.config.get<string>('INVENTORY_DB_PASS', 'postgres'),
      maintenanceDatabase: this.config.get<string>(
        'POSTGRES_MAINTENANCE_DB',
        'postgres',
      ),
      entities: [Product, Warehouse, StockMovement],
      synchronize: this.config.get<string>('DB_SYNCHRONIZE') === 'true',
      migrations: ['dist/apps/inventory-service/migrations/*.js'],
    });

    return { database: dataSource.options.database };
  }

  private async provisionSalesDatabase(tenantId: string) {
    const dataSource = await this.tenantDataSources.getDataSource({
      tenantId,
      databasePrefix: this.config.get<string>(
        'SALES_TENANT_DB_PREFIX',
        'ims_sales_tenant',
      ),
      host: this.config.get<string>('SALES_DB_HOST', 'localhost'),
      port: this.config.get<number>('SALES_DB_PORT', 5432),
      username: this.config.get<string>('SALES_DB_USER', 'postgres'),
      password: this.config.get<string>('SALES_DB_PASS', 'postgres'),
      maintenanceDatabase: this.config.get<string>(
        'POSTGRES_MAINTENANCE_DB',
        'postgres',
      ),
      entities: [Sale, SaleItem, Invoice, Payment],
      synchronize: this.config.get<string>('DB_SYNCHRONIZE') === 'true',
      migrations: ['dist/apps/sales-service/migrations/*.js'],
    });

    return { database: dataSource.options.database };
  }
}
