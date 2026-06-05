import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../infrastructure/database/prisma/prisma.service';
import { BaseRepository } from '../../../../infrastructure/database/repositories/base.repository';
import { TaskRepositoryPort } from '../../domain/ports/task.repository.port';
import { Task } from '../../domain/entities/task.entity';
import { TaskMapper } from '../mappers/task.mapper';

/**
 * PrismaTaskRepository — Tasks Infrastructure (Adapter)
 * Implements the TaskRepositoryPort (Port) using Prisma.
 */
@Injectable()
export class PrismaTaskRepository
  extends BaseRepository<Task>
  implements TaskRepositoryPort
{
  constructor(prisma: PrismaService) {
    super(prisma);
  }

  async findById(id: string): Promise<Task | null> {
    const record = await this.prisma.task.findUnique({ where: { id } });
    return record ? TaskMapper.toDomain(record) : null;
  }

  async findAllByProjectId(projectId: string): Promise<Task[]> {
    const records = await this.prisma.task.findMany({ where: { projectId } });
    return records.map(TaskMapper.toDomain);
  }

  async findAllByAssigneeId(assigneeId: string): Promise<Task[]> {
    const records = await this.prisma.task.findMany({ where: { assigneeId } });
    return records.map(TaskMapper.toDomain);
  }

  async findAll(): Promise<Task[]> {
    const records = await this.prisma.task.findMany();
    return records.map(TaskMapper.toDomain);
  }

  async save(entity: Task): Promise<void> {
    const data = TaskMapper.toPersistence(entity);
    await this.prisma.task.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.task.delete({ where: { id } });
  }
}
