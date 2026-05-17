import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateProductDto } from '../dto/inventory.dto';
import { InventoryService } from '../inventory.service';

@Controller()
export class ProductsController {
  constructor(private readonly service: InventoryService) {}

  @MessagePattern(PATTERNS.PRODUCT_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateProductDto>) {
    return this.service.createProduct(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.PRODUCT_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.service.findProducts(payload.context);
  }

  @MessagePattern(PATTERNS.PRODUCT_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.findProductById(payload.context, payload.data!.id);
  }

  @MessagePattern(PATTERNS.PRODUCT_UPDATE)
  update(@Payload() payload: MicroservicePayload<{ id: string } & Partial<CreateProductDto>>) {
    return this.service.updateProduct(payload.context, payload.data!.id, payload.data!);
  }

  @MessagePattern(PATTERNS.PRODUCT_DELETE)
  delete(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.service.deleteProduct(payload.context, payload.data!.id);
  }
}
