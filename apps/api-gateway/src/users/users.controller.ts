import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUser, JwtAuthGuard, JwtPayload, PATTERNS } from '@app/common';
import { buildContext } from '../common/context.util';
import { MicroserviceProxy } from '../common/microservice.proxy';
import { CreateUserDto } from '../dtos/user.dto';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly proxy: MicroserviceProxy) {}

  @Get()
  findAll(@CurrentUser() user: JwtPayload) {
    return this.proxy.send(this.proxy.user, PATTERNS.USER_FIND_ALL, {
      context: buildContext(user),
    });
  }

  @Post()
  create(@CurrentUser() user: JwtPayload, @Body() dto: CreateUserDto) {
    return this.proxy.send(this.proxy.user, PATTERNS.USER_CREATE, {
      context: buildContext(user),
      data: dto,
    });
  }
}
