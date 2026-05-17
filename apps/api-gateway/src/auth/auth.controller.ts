import { Body, Controller, Post } from '@nestjs/common';
import { PATTERNS } from '@app/common';
import { MicroserviceProxy } from '../common/microservice.proxy';
import { LoginDto, RegisterDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly proxy: MicroserviceProxy) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.proxy.send(this.proxy.auth, PATTERNS.AUTH_REGISTER, {
      context: { tenantId: '00000000-0000-0000-0000-000000000000' },
      data: dto,
    });
  }

  @Post('tenants')
  createTenant(@Body() dto: RegisterDto) {
    return this.proxy.send(this.proxy.auth, PATTERNS.AUTH_CREATE_TENANT, {
      context: { tenantId: '00000000-0000-0000-0000-000000000000' },
      data: dto,
    });
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.proxy.send(this.proxy.auth, PATTERNS.AUTH_LOGIN, {
      context: { tenantId: '00000000-0000-0000-0000-000000000000' },
      data: dto,
    });
  }
}
