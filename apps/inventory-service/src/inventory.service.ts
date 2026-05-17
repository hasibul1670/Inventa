import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { RequestContextDto, TenantDataSourceManager } from '@app/common';
import {
  CreateProductDto,
  CreateStockMovementDto,
  CreateWarehouseDto,
} from './dto/inventory.dto';
import { Product } from './entities/product.entity';
import { StockMovement } from './entities/stock-movement.entity';
import { Warehouse } from './entities/warehouse.entity';

@Injectable()
export class InventoryService {
  constructor(
    private readonly config: ConfigService,
    private readonly tenantDataSources: TenantDataSourceManager,
  ) {}

  async createProduct(context: RequestContextDto, dto: CreateProductDto) {
    const { tenantId, productsRepository } = await this.repositories(context);
    const product = productsRepository.create({
      ...dto,
      tenantId,
      stockQuantity: dto.stockQuantity ?? 0,
      isActive: dto.isActive ?? true,
    });
    return productsRepository.save(product);
  }

  async findProducts(context: RequestContextDto) {
    const { tenantId, productsRepository } = await this.repositories(context);
    return productsRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findProductById(context: RequestContextDto, id: string) {
    const { tenantId, productsRepository } = await this.repositories(context);
    const product = await productsRepository.findOne({
      where: { id, tenantId },
    });
    if (!product) {
      throw new RpcException('Product not found');
    }
    return product;
  }

  async updateProduct(context: RequestContextDto, id: string, dto: Partial<CreateProductDto>) {
    const { productsRepository } = await this.repositories(context);
    const product = await this.findProductById(context, id);
    Object.assign(product, dto);
    return productsRepository.save(product);
  }

  async deleteProduct(context: RequestContextDto, id: string) {
    const { productsRepository } = await this.repositories(context);
    const product = await this.findProductById(context, id);
    await productsRepository.delete({ id: product.id, tenantId: product.tenantId });
    return { deleted: true };
  }

  async createWarehouse(context: RequestContextDto, dto: CreateWarehouseDto) {
    const { tenantId, warehousesRepository } = await this.repositories(context);
    const warehouse = warehousesRepository.create({
      ...dto,
      tenantId,
      isActive: dto.isActive ?? true,
    });
    return warehousesRepository.save(warehouse);
  }

  async findWarehouses(context: RequestContextDto) {
    const { tenantId, warehousesRepository } = await this.repositories(context);
    return warehousesRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findWarehouseById(context: RequestContextDto, id: string) {
    const { tenantId, warehousesRepository } = await this.repositories(context);
    const warehouse = await warehousesRepository.findOne({
      where: { id, tenantId },
    });
    if (!warehouse) {
      throw new RpcException('Warehouse not found');
    }
    return warehouse;
  }

  async updateWarehouse(
    context: RequestContextDto,
    id: string,
    dto: Partial<CreateWarehouseDto>,
  ) {
    const { warehousesRepository } = await this.repositories(context);
    const warehouse = await this.findWarehouseById(context, id);
    Object.assign(warehouse, dto);
    return warehousesRepository.save(warehouse);
  }

  async deleteWarehouse(context: RequestContextDto, id: string) {
    const { warehousesRepository } = await this.repositories(context);
    const warehouse = await this.findWarehouseById(context, id);
    await warehousesRepository.delete({
      id: warehouse.id,
      tenantId: warehouse.tenantId,
    });
    return { deleted: true };
  }

  async createStockMovement(context: RequestContextDto, dto: CreateStockMovementDto) {
    const {
      tenantId,
      productsRepository,
      movementsRepository,
    } = await this.repositories(context);
    const product = await this.findProductById(context, dto.productId);
    await this.findWarehouseById(context, dto.warehouseId);

    const movement = movementsRepository.create({ ...dto, tenantId });
    const saved = await movementsRepository.save(movement);

    const signedQuantity = ['OUT', 'SALE', 'RETURN_TO_SUPPLIER'].includes(
      dto.type.toUpperCase(),
    )
      ? -Number(dto.quantity)
      : Number(dto.quantity);

    product.stockQuantity = Number(product.stockQuantity) + signedQuantity;
    await productsRepository.save(product);

    return saved;
  }

  async findStockMovements(context: RequestContextDto) {
    const { tenantId, movementsRepository } = await this.repositories(context);
    return movementsRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  private requireTenant(context: RequestContextDto): string {
    if (!context?.tenantId) {
      throw new RpcException('tenantId is required');
    }
    return context.tenantId;
  }

  private async repositories(context: RequestContextDto): Promise<{
    tenantId: string;
    productsRepository: Repository<Product>;
    warehousesRepository: Repository<Warehouse>;
    movementsRepository: Repository<StockMovement>;
  }> {
    const tenantId = this.requireTenant(context);
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

    return {
      tenantId,
      productsRepository: dataSource.getRepository(Product),
      warehousesRepository: dataSource.getRepository(Warehouse),
      movementsRepository: dataSource.getRepository(StockMovement),
    };
  }
}
