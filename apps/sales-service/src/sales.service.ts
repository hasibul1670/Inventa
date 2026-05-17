import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';
import { Repository } from 'typeorm';
import { RequestContextDto, TenantDataSourceManager } from '@app/common';
import { CreateInvoiceDto, CreatePaymentDto, CreateSaleDto } from './dto/sales.dto';
import { Invoice } from './entities/invoice.entity';
import { Payment } from './entities/payment.entity';
import { SaleItem } from './entities/sale-item.entity';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    private readonly config: ConfigService,
    private readonly tenantDataSources: TenantDataSourceManager,
  ) {}

  async createSale(context: RequestContextDto, dto: CreateSaleDto) {
    const {
      tenantId,
      salesRepository,
      saleItemsRepository,
    } = await this.repositories(context);
    const totalAmount = dto.items.reduce(
      (sum, item) => sum + Number(item.quantity) * Number(item.unitPrice),
      0,
    );
    const discountAmount = dto.discountAmount ?? 0;
    const taxAmount = dto.taxAmount ?? 0;
    const grandTotal = totalAmount - discountAmount + taxAmount;

    const sale = await salesRepository.save(
      salesRepository.create({
        tenantId,
        customerId: dto.customerId,
        saleNumber: dto.saleNumber ?? `SALE-${Date.now()}`,
        status: dto.status ?? 'DRAFT',
        totalAmount,
        discountAmount,
        taxAmount,
        grandTotal,
      }),
    );

    const items = dto.items.map((item) =>
      saleItemsRepository.create({
        tenantId,
        saleId: sale.id,
        productId: item.productId,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalPrice: Number(item.quantity) * Number(item.unitPrice),
      }),
    );
    await saleItemsRepository.save(items);

    return this.findSaleById(context, sale.id);
  }

  async findSales(context: RequestContextDto) {
    const { tenantId, salesRepository } = await this.repositories(context);
    return salesRepository.find({
      where: { tenantId },
      relations: { items: true },
      order: { createdAt: 'DESC' },
    });
  }

  async findSaleById(context: RequestContextDto, id: string) {
    const { tenantId, salesRepository } = await this.repositories(context);
    const sale = await salesRepository.findOne({
      where: { id, tenantId },
      relations: { items: true },
    });
    if (!sale) {
      throw new RpcException('Sale not found');
    }
    return sale;
  }

  async createInvoice(context: RequestContextDto, dto: CreateInvoiceDto) {
    const { tenantId, invoicesRepository } = await this.repositories(context);
    const sale = await this.findSaleById(context, dto.saleId);
    const invoice = invoicesRepository.create({
      tenantId,
      saleId: dto.saleId,
      invoiceNumber: dto.invoiceNumber,
      totalAmount: sale.grandTotal,
      paidAmount: 0,
      dueAmount: sale.grandTotal,
      status: 'UNPAID',
    });
    return invoicesRepository.save(invoice);
  }

  async findInvoices(context: RequestContextDto) {
    const { tenantId, invoicesRepository } = await this.repositories(context);
    return invoicesRepository.find({
      where: { tenantId },
      order: { createdAt: 'DESC' },
    });
  }

  async findInvoiceById(context: RequestContextDto, id: string) {
    const { tenantId, invoicesRepository } = await this.repositories(context);
    const invoice = await invoicesRepository.findOne({
      where: { id, tenantId },
    });
    if (!invoice) {
      throw new RpcException('Invoice not found');
    }
    return invoice;
  }

  async createPayment(context: RequestContextDto, dto: CreatePaymentDto) {
    const { tenantId, paymentsRepository, invoicesRepository } =
      await this.repositories(context);
    const invoice = await this.findInvoiceById(context, dto.invoiceId);
    const payment = await paymentsRepository.save(
      paymentsRepository.create({
        tenantId,
        invoiceId: dto.invoiceId,
        amount: dto.amount,
        paymentMethod: dto.paymentMethod,
        paymentDate: dto.paymentDate ? new Date(dto.paymentDate) : new Date(),
        note: dto.note,
      }),
    );

    invoice.paidAmount = Number(invoice.paidAmount) + Number(dto.amount);
    invoice.dueAmount = Math.max(Number(invoice.totalAmount) - Number(invoice.paidAmount), 0);
    invoice.status = invoice.dueAmount <= 0 ? 'PAID' : 'PARTIAL';
    await invoicesRepository.save(invoice);

    return payment;
  }

  async findPayments(context: RequestContextDto) {
    const { tenantId, paymentsRepository } = await this.repositories(context);
    return paymentsRepository.find({
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
    salesRepository: Repository<Sale>;
    saleItemsRepository: Repository<SaleItem>;
    invoicesRepository: Repository<Invoice>;
    paymentsRepository: Repository<Payment>;
  }> {
    const tenantId = this.requireTenant(context);
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

    return {
      tenantId,
      salesRepository: dataSource.getRepository(Sale),
      saleItemsRepository: dataSource.getRepository(SaleItem),
      invoicesRepository: dataSource.getRepository(Invoice),
      paymentsRepository: dataSource.getRepository(Payment),
    };
  }
}
