import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { CreateUserDto, FindByEmailDto } from '../dto/user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern(PATTERNS.USER_CREATE)
  create(@Payload() payload: MicroservicePayload<CreateUserDto>) {
    return this.usersService.create(payload.context, payload.data!);
  }

  @MessagePattern(PATTERNS.USER_FIND_ALL)
  findAll(@Payload() payload: MicroservicePayload) {
    return this.usersService.findAll(payload.context);
  }

  @MessagePattern(PATTERNS.USER_FIND_BY_ID)
  findById(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.usersService.findById(payload.context, payload.data!.id);
  }

  @MessagePattern(PATTERNS.USER_FIND_BY_EMAIL)
  findByEmail(@Payload() payload: MicroservicePayload<FindByEmailDto>) {
    return this.usersService.findByEmail(payload.data!.email, payload.context.tenantId);
  }

  @MessagePattern(PATTERNS.USER_UPDATE)
  update(@Payload() payload: MicroservicePayload<{ id: string } & Partial<CreateUserDto>>) {
    return this.usersService.update(payload.context, payload.data!.id, payload.data!);
  }

  @MessagePattern(PATTERNS.USER_DELETE)
  delete(@Payload() payload: MicroservicePayload<{ id: string }>) {
    return this.usersService.delete(payload.context, payload.data!.id);
  }
}
