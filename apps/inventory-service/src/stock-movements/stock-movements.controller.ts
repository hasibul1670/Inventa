import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateStockMovementDto } from '../dto/inventory.dto';
import { InventoryService } from '../inventory.service';

@Controller()
export class StockMovementsController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern(PATTERNS.STOCK_MOVEMENT_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateStockMovementDto>) {
    return this.service.createStockMovement(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.STOCK_MOVEMENT_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findStockMovements(payload.context);
  }
}
