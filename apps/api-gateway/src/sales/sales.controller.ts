import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, JwtPayload, PATTERNS } from '@app/common';
import { buildContext } from '../common/context.util';
import { MicroserviceProxy } from '../common/microservice.proxy';
import { CreateInvoiceDto, CreatePaymentDto, CreateSaleDto } from './sales.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class SalesController {
  constructor(private readonly proxy: MicroserviceProxy) {}

  @Get('sales')
  sales(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.sales, PATTERNS.SALE_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post('sales')
  createSale(@CurrentUser() user: JwtPayload, @Body() dto: CreateSaleDto) {
    return this.proxy.send(this.proxy.sales, PATTERNS.SALE_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }

  @Get('invoices')
  invoices(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.sales, PATTERNS.INVOICE_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post('invoices')
  createInvoice(@CurrentUser() user: JwtPayload, @Body() dto: CreateInvoiceDto) {
    return this.proxy.send(this.proxy.sales, PATTERNS.INVOICE_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }

  @Post('payments')
  createPayment(@CurrentUser() user: JwtPayload, @Body() dto: CreatePaymentDto) {
    return this.proxy.send(this.proxy.sales, PATTERNS.PAYMENT_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }
}
