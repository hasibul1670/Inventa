import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Repository, ObjectLiteral } from 'typeorm';
import {
  RequestContextDto,
  TenantBaseEntity,
  TenantDataSourceManager,
} from '@app/common';
import { Customer } from './entities/customer.entity';
import { Supplier } from './entities/supplier.entity';
import { CreatePartyDto } from './dto/party.dto';

type PartyEntity = TenantBaseEntity & ObjectLiteral;

@Injectable()
export class PartyCrudService {
  constructor(
    private readonly config: ConfigService,
    private readonly tenantDataSources: TenantDataSourceManager,
  ) {}

  async createCustomer(context: RequestContextDto, dto: CreatePartyDto) {
    const { customersRepository } = await this.repositories(context);
    return this.create(customersRepository, context, dto);
  }

  async findCustomers(context: RequestContextDto) {
    const { customersRepository } = await this.repositories(context);
    return this.findAll(customersRepository, context);
  }

  async findCustomerById(context: RequestContextDto, id: string) {
    const { customersRepository } = await this.repositories(context);
    return this.findById(customersRepository, context, id);
  }

  async updateCustomer(context: RequestContextDto, id: string, dto: Partial<CreatePartyDto>) {
    const { customersRepository } = await this.repositories(context);
    return this.update(customersRepository, context, id, dto);
  }

  async deleteCustomer(context: RequestContextDto, id: string) {
    const { customersRepository } = await this.repositories(context);
    return this.delete(customersRepository, context, id);
  }

  async createSupplier(context: RequestContextDto, dto: CreatePartyDto) {
    const { suppliersRepository } = await this.repositories(context);
    return this.create(suppliersRepository, context, dto);
  }

  async findSuppliers(context: RequestContextDto) {
    const { suppliersRepository } = await this.repositories(context);
    return this.findAll(suppliersRepository, context);
  }

  async findSupplierById(context: RequestContextDto, id: string) {
    const { suppliersRepository } = await this.repositories(context);
    return this.findById(suppliersRepository, context, id);
  }

  async updateSupplier(context: RequestContextDto, id: string, dto: Partial<CreatePartyDto>) {
    const { suppliersRepository } = await this.repositories(context);
    return this.update(suppliersRepository, context, id, dto);
  }

  async deleteSupplier(context: RequestContextDto, id: string) {
    const { suppliersRepository } = await this.repositories(context);
    return this.delete(suppliersRepository, context, id);
  }

  private create<T extends PartyEntity>(
    repository: Repository<T>,
    context: RequestContextDto,
    dto: CreatePartyDto,
  ) {
    const entity = repository.create({
      ...dto,
      tenantId: this.requireTenant(context),
      openingBalance: dto.openingBalance ?? 0,
      isActive: dto.isActive ?? true,
    } as unknown as T);
    return repository.save(entity);
  }

  private findAll<T extends PartyEntity>(
    repository: Repository<T>,
    context: RequestContextDto,
  ) {
    return repository.find({
      where: { tenantId: this.requireTenant(context) } as any,
      order: { createdAt: 'DESC' } as any,
    });
  }

  private async findById<T extends PartyEntity>(
    repository: Repository<T>,
    context: RequestContextDto,
    id: string,
  ) {
    const entity = await repository.findOne({
      where: { id, tenantId: this.requireTenant(context) } as any,
    });
    if (!entity) {
      throw new RpcException('Record not found');
    }
    return entity;
  }

  private async update<T extends PartyEntity>(
    repository: Repository<T>,
    context: RequestContextDto,
    id: string,
    dto: Partial<CreatePartyDto>,
  ) {
    const entity = await this.findById(repository, context, id);
    Object.assign(entity, dto);
    return repository.save(entity);
  }

  private async delete<T extends PartyEntity>(
    repository: Repository<T>,
    context: RequestContextDto,
    id: string,
  ) {
    const entity = await this.findById(repository, context, id);
    await repository.delete({ id: entity.id, tenantId: entity.tenantId } as any);
    return { deleted: true };
  }

  private requireTenant(context: RequestContextDto): string {
    if (!context?.tenantId) {
      throw new RpcException('tenantId is required');
    }
    return context.tenantId;
  }

  private async repositories(context: RequestContextDto): Promise<{
    customersRepository: Repository<Customer>;
    suppliersRepository: Repository<Supplier>;
  }> {
    const tenantId = this.requireTenant(context);
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

    return {
      customersRepository: dataSource.getRepository(Customer),
      suppliersRepository: dataSource.getRepository(Supplier),
    };
  }
}
