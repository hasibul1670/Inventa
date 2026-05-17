import { IsOptional, IsString, IsUUID } from 'class-validator';

export class RequestContextDto {
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @IsUUID()
  userId?: string;

  @IsOptional()
  @IsString()
  role?: string;
}

export interface MicroservicePayload<T = unknown> {
  context: RequestContextDto;
  data?: T;
}
