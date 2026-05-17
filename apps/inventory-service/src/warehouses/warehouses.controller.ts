import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateWarehouseDto } from '../dto/inventory.dto';
import { InventoryService } from '../inventory.service';

@Controller()
export class WarehousesController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern(PATTERNS.WAREHOUSE_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateWarehouseDto>) {
    return this.service.createWarehouse(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.WAREHOUSE_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findWarehouses(payload.context);
  }

  @MessagePattern(PATTERNS.WAREHOUSE_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findWarehouseById(payload.context, payload.data!.id);
  }

  @MessagePattern(PATTERNS.WAREHOUSE_UPDATE)
  update(@Payload() payload: MicroservicePayload<{ id: string } & Partial<CreateWarehouseDto>>) {
    return this.service.updateWarehouse(payload.context, payload.data!.id, payload.data!);
  }

  @MessagePattern(PATTERNS.WAREHOUSE_DELETE)
  delete(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.deleteWarehouse(payload.context, payload.data!.id);
  }
}
