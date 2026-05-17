import { JwtPayload, RequestContextDto } from '@app/common';

export function buildContext(user: JwtPayload): RequestContextDto {
  return {
    tenantId: user.tenantId,
    userId: user.sub,
    role: user.role,
  };
}
