import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { BaseRepository } from '../../../../infrastructure/database/repositories/base.repository';
import { ProjectRepositoryPort } from '../../domain/ports/project.repository.port';
import { Project } from '../../domain/entities/project.entity';
import { ProjectMapper } from '../mappers/project.mapper';

/**
 * PrismaProjectRepository — Projects Infrastructure (Adapter)
 * Implements the ProjectRepositoryPort (Port) using Prisma.
 */
@Injectable()
export class PrismaProjectRepository
  extends BaseRepository<Project>
  implements ProjectRepositoryPort
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<Project | null> {
    const record = await this.prisma.project.findUnique({ where: { id } });
    return record ? ProjectMapper.toDomain(record) : null;
  }

  async findAllByOwnerId(ownerId: string): Promise<Project[]> {
    const records = await this.prisma.project.findMany({ where: { ownerId } });
    return records.map(ProjectMapper.toDomain);
  }

  async findAll(): Promise<Project[]> {
    const records = await this.prisma.project.findMany();
    return records.map(ProjectMapper.toDomain);
  }

  async save(entity: Project): Promise<void> {
    const data = ProjectMapper.toPersistence(entity);
    await this.prisma.project.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({ where: { id } });
  }
}
