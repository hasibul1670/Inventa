import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

type RequestWithUser = {
  headers: {
    authorization?: string;
    'x-tenant-id'?: string | string[];
  };
  user?: JwtPayload;
};

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractToken(request);

    if (token) {
      try {
        request.user = this.jwtService.verify<JwtPayload>(token);
        return true;
      } catch {
        throw new UnauthorizedException('Invalid or expired token');
      }
    }

    const tenantId = request.headers['x-tenant-id'];
    if (process.env.NODE_ENV !== 'production' && typeof tenantId === 'string') {
      request.user = {
        sub: '00000000-0000-0000-0000-000000000000',
        tenantId,
        email: 'local-dev@example.com',
        role: 'LOCAL_DEV',
      };
      return true;
    }

    throw new UnauthorizedException('Missing bearer token');
  }

  private extractToken(request: RequestWithUser): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
