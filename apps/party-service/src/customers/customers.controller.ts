import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreatePartyDto } from '../dto/party.dto';
import { PartyCrudService } from '../party-crud.service';

@Controller()
export class CustomersController {
  constructor(private readonly service: PartyCrudService) {}

  @MessagePattern(PATTERNS.CUSTOMER_CREATE)
  create(@Payload() payload: MicroservicePayload<CreatePartyDto>) {
    return this.service.createCustomer(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.CUSTOMER_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findCustomers(payload.context);
  }

  @MessagePattern(PATTERNS.CUSTOMER_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findCustomerById(payload.context, payload.data!.id);
  }

  @MessagePattern(PATTERNS.CUSTOMER_UPDATE)
  update(@Payload() payload: MicroservicePayload<{ id: string } & Partial<CreatePartyDto>>) {
    return this.service.updateCustomer(payload.context, payload.data!.id, payload.data!);
  }

  @MessagePattern(PATTERNS.CUSTOMER_DELETE)
  delete(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.deleteCustomer(payload.context, payload.data!.id);
  }
}
