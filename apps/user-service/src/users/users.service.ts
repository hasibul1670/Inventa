import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RequestContextDto } from '@app/common';
import { CreateUserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

const EMPTY_TENANT = '00000000-0000-0000-0000-000000000000';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async create(context: RequestContextDto, dto: CreateUserDto): Promise<User> {
    const tenantId = this.requireTenant(context, dto.tenantId);
    const existing = await this.usersRepository.findOne({
      where: { tenantId, email: dto.email },
    });
    if (existing) {
      throw new RpcException('User email already exists for this tenant');
    }

    const user = this.usersRepository.create({
      ...dto,
      tenantId,
      password: await this.hashIfPlain(dto.password),
      isActive: dto.isActive ?? true,
    });
    return this.usersRepository.save(user);
  }

  findAll(context: RequestContextDto): Promise<User[]> {
    return this.usersRepository.find({
      where: { tenantId: this.requireTenant(context) },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(context: RequestContextDto, id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id, tenantId: this.requireTenant(context) },
    });
    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }

  async findByEmail(email: string, tenantId?: string): Promise<User> {
    const where =
      tenantId && tenantId !== EMPTY_TENANT ? { email, tenantId } : { email };
    const user = await this.usersRepository.findOne({ where });
    if (!user) {
      throw new RpcException('User not found');
    }
    return user;
  }

  async update(
    context: RequestContextDto,
    id: string,
    dto: Partial<CreateUserDto>,
  ): Promise<User> {
    const user = await this.findById(context, id);
    Object.assign(user, {
      email: dto.email ?? user.email,
      password: dto.password ? await this.hashIfPlain(dto.password) : user.password,
      fullName: dto.fullName ?? user.fullName,
      role: dto.role ?? user.role,
      isActive: dto.isActive ?? user.isActive,
    });
    return this.usersRepository.save(user);
  }

  async delete(context: RequestContextDto, id: string) {
    const user = await this.findById(context, id);
    await this.usersRepository.delete({ id: user.id, tenantId: user.tenantId });
    return { deleted: true };
  }

  private requireTenant(context: RequestContextDto, explicitTenantId?: string): string {
    const tenantId = explicitTenantId ?? context?.tenantId;
    if (!tenantId || tenantId === EMPTY_TENANT) {
      throw new RpcException('tenantId is required');
    }
    return tenantId;
  }

  private async hashIfPlain(password: string): Promise<string> {
    if (password.startsWith('$2a$') || password.startsWith('$2b$')) {
      return password;
    }
    return bcrypt.hash(password, 10);
  }
}
