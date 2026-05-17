import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, JwtPayload, PATTERNS } from '@app/common';
import { buildContext } from '../common/context.util';
import { MicroserviceProxy } from '../common/microservice.proxy';
import { CreatePartyDto } from './party.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class PartiesController {
  constructor(private readonly proxy: MicroserviceProxy) {}

  @Get('customers')
  customers(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.party, PATTERNS.CUSTOMER_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post('customers')
  createCustomer(@CurrentUser() user: JwtPayload, @Body() dto: CreatePartyDto) {
    return this.proxy.send(this.proxy.party, PATTERNS.CUSTOMER_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }

  @Get('suppliers')
  suppliers(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.party, PATTERNS.SUPPLIER_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post('suppliers')
  createSupplier(@CurrentUser() user: JwtPayload, @Body() dto: CreatePartyDto) {
    return this.proxy.send(this.proxy.party, PATTERNS.SUPPLIER_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }
}
