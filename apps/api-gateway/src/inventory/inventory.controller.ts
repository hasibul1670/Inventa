import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, JwtPayload, PATTERNS } from '@app/common';
import { buildContext } from '../common/context.util';
import { MicroserviceProxy } from '../common/microservice.proxy';
import {
  CreateProductDto,
  CreateStockMovementDto,
  CreateWarehouseDto,
} from './inventory.dto';
import { UpdateProductDto } from '../productDtos/updateProduct.dto';
import { ProductQueryDto } from './product-query.dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class InventoryController {
  constructor(private readonly proxy: MicroserviceProxy) {}

  @Get('products')
  products(@CurrentUser() user: JwtPayload, @Query() query: ProductQueryDto) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_FIND_ALL, {
      context: buildContext(user),
      data: query,
    });
  }

  @Get('products/sku/:sku')
  productBySku(@CurrentUser() user: JwtPayload, @Param('sku') sku: string) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_FIND_BY_SKU, {
      context: buildContext(user),
      data: { sku },
    });
  }

  @Get('products/:id')
  product(@CurrentUser() user: JwtPayload, @Param('id') id: string) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_FIND_BY_ID, {
      context: buildContext(user),
      data: { id },
    });
  }
  @Patch('products/sku/:sku')
  updateProductBySku(
    @CurrentUser() user: JwtPayload,
    @Param('sku') sku: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_UPDATE_BY_SKU, {
      context: buildContext(user),
      data: { sku, ...dto },
    });
  }

  @Patch('products/:id')
  updateProduct(
    @CurrentUser() user: JwtPayload,
    @Param('id') id: string,
    @Body() dto: UpdateProductDto,
  ) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_UPDATE, {
      context: buildContext(user),
      data: { id, ...dto },
    });
  }

  @Post('products')
  createProduct(@CurrentUser() user: JwtPayload, @Body() dto: CreateProductDto) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.PRODUCT_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }

  @Get('warehouses')
  warehouses(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.WAREHOUSE_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post('warehouses')
  createWarehouse(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateWarehouseDto,
  ) {
    return this.proxy.send(this.proxy.inventory, PATTERNS.WAREHOUSE_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }

  @Get('stock-movements')
  stockMovements(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(
      this.proxy.inventory,
      PATTERNS.STOCK_MOVEMENT_FIND_ALL,
      { context: buildContext(user) },
    );
  }

  @Post('stock-movements')
  createStockMovement(
    @CurrentUser() user: JwtPayload,
    @Body() dto: CreateStockMovementDto,
  ) {
    return this.proxy.send(
      this.proxy.inventory,
      PATTERNS.STOCK_MOVEMENT_CREATE,
      { context: buildContext(user), data: dto },
    );
  }
}
