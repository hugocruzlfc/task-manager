import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { BaseRepository } from '../../../../infrastructure/database/repositories/base.repository';
import { UserRepositoryPort } from '../../domain/ports/user.repository.port';
import { User } from '../../domain/entities/user.entity';
import { UserMapper } from '../mappers/user.mapper';

/**
 * PrismaUserRepository — Users Infrastructure (Adapter)
 * Implements the UserRepositoryPort (Port) using Prisma.
 */
@Injectable()
export class PrismaUserRepository
  extends BaseRepository<User>
  implements UserRepositoryPort
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { id } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const record = await this.prisma.user.findUnique({ where: { email } });
    return record ? UserMapper.toDomain(record) : null;
  }

  async findAll(): Promise<User[]> {
    const records = await this.prisma.user.findMany();
    return records.map(UserMapper.toDomain);
  }

  async save(entity: User): Promise<void> {
    const data = UserMapper.toPersistence(entity);
    await this.prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
