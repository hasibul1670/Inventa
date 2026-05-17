import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MicroservicePayload, PATTERNS } from '@app/common';
import { LoginDto, RegisterTenantDto } from '../dto/auth.dto';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern(PATTERNS.AUTH_REGISTER)
  register(@Payload() payload: MicroservicePayload<RegisterTenantDto>) {
    return this.authService.register(payload.data!);
  }

  @MessagePattern(PATTERNS.AUTH_CREATE_TENANT)
  createTenant(@Payload() payload: MicroservicePayload<RegisterTenantDto>) {
    return this.authService.createTenant(payload.data!);
  }

  @MessagePattern(PATTERNS.AUTH_LOGIN)
  login(@Payload() payload: MicroservicePayload<LoginDto>) {
    return this.authService.login(payload.data!);
  }

  @MessagePattern(PATTERNS.AUTH_VALIDATE)
  validate(@Payload() payload: MicroservicePayload<{ token: string }>) {
    return this.authService.validate(payload.data!.token);
  }
}
