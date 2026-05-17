import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import {
  JwtPayload,
  MicroservicePayload,
  PATTERNS,
  SERVICES,
} from '@app/common';
import { catchError, firstValueFrom, throwError, timeout } from 'rxjs';
import { LoginDto, RegisterTenantDto } from '../dto/auth.dto';

interface UserRecord {
  id: string;
  tenantId: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  isActive: boolean;
}

@Injectable()
export class AuthService {
  constructor(
    @Inject(SERVICES.USER) private readonly userClient: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterTenantDto) {
    const tenantId = randomUUID();
    const password = await bcrypt.hash(dto.password, 10);

    const user = await this.send<UserRecord>(PATTERNS.USER_CREATE, {
      context: { tenantId },
      data: {
        tenantId,
        email: dto.email,
        password,
        fullName: dto.fullName,
        role: 'ADMIN',
        isActive: true,
      },
    });

    const accessToken = this.sign(user);
    return {
      tenantId,
      companyName: dto.companyName,
      user: this.toPublicUser(user),
      accessToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.send<UserRecord>(PATTERNS.USER_FIND_BY_EMAIL, {
      context: { tenantId: '00000000-0000-0000-0000-000000000000' },
      data: { email: dto.email },
    });

    if (!user?.isActive) {
      throw new RpcException('Invalid credentials');
    }

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches) {
      throw new RpcException('Invalid credentials');
    }

    return {
      user: this.toPublicUser(user),
      accessToken: this.sign(user),
    };
  }

  validate(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(token);
    } catch {
      throw new RpcException('Invalid token');
    }
  }

  private sign(user: UserRecord): string {
    const payload: JwtPayload = {
      sub: user.id,
      tenantId: user.tenantId,
      email: user.email,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }

  private toPublicUser(user: UserRecord) {
    const { password, ...publicUser } = user;
    return publicUser;
  }

  private async send<T>(
    pattern: string,
    payload: MicroservicePayload,
  ): Promise<T> {
    return firstValueFrom(
      this.userClient.send<T>(pattern, payload).pipe(
        timeout(5000),
        catchError((error) =>
          throwError(
            () => new RpcException(error?.message ?? 'User service unavailable'),
          ),
        ),
      ),
    );
  }
}
