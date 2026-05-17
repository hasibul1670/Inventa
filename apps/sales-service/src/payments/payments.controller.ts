import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreatePaymentDto } from '../dto/sales.dto';
import { SalesService } from '../sales.service';

@Controller()
export class PaymentsController {
  constructor(private readonly service: SalesService) {}

  @MessagePattern(PATTERNS.PAYMENT_CREATE)
  create(@Payload() payload: MicroservicePayload<CreatePaymentDto>) {
    return this.service.createPayment(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.PAYMENT_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findPayments(payload.context);
  }
}
