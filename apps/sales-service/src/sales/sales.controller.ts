import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateSaleDto } from '../dto/sales.dto';
import { SalesService } from '../sales.service';

@Controller()
export class SalesController {
  constructor(private readonly service: SalesService) {}

  @MessagePattern(PATTERNS.SALE_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateSaleDto>) {
    return this.service.createSale(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.SALE_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findSales(payload.context);
  }

  @MessagePattern(PATTERNS.SALE_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findSaleById(payload.context, payload.data!.id);
  }
}
