import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateInvoiceDto } from '../dto/sales.dto';
import { SalesService } from '../sales.service';

@Controller()
export class InvoicesController {
  constructor(private readonly service: SalesService) {}

  @MessagePattern(PATTERNS.INVOICE_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateInvoiceDto>) {
    return this.service.createInvoice(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.INVOICE_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findInvoices(payload.context);
  }

  @MessagePattern(PATTERNS.INVOICE_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findInvoiceById(payload.context, payload.data!.id);
  }
}
