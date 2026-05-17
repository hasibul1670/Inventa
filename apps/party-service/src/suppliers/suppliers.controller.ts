import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreatePartyDto } from '../dto/party.dto';
import { PartyCrudService } from '../party-crud.service';

@Controller()
export class SuppliersController {
  constructor(private readonly service: PartyCrudService) {}

  @MessagePattern(PATTERNS.SUPPLIER_CREATE)
  create(@Payload() payload: MicroservicePayload<CreatePartyDto>) {
    return this.service.createSupplier(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.SUPPLIER_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findSuppliers(payload.context);
  }

  @MessagePattern(PATTERNS.SUPPLIER_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findSupplierById(payload.context, payload.data!.id);
  }

  @MessagePattern(PATTERNS.SUPPLIER_UPDATE)
  update(@Payload() payload: MicroservicePayload<{ id: string } & Partial<CreatePartyDto>>) {
    return this.service.updateSupplier(payload.context, payload.data!.id, payload.data!);
  }

  @MessagePattern(PATTERNS.SUPPLIER_DELETE)
  delete(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.deleteSupplier(payload.context, payload.data!.id);
  }
}
