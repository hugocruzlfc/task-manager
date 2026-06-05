import { BaseRepositoryPort } from '../../../../shared/kernel/domain/base.repository.port';
import { Task } from '../entities/task.entity';

/**
 * Task Repository Port (interface) — Tasks Domain
 * This is the PORT; the adapter lives in the infrastructure layer.
 * No NestJS / Prisma imports allowed here.
 */
export const TASK_REPOSITORY = Symbol('TASK_REPOSITORY');

export interface TaskRepositoryPort extends BaseRepositoryPort<Task> {
  findAllByProjectId(projectId: string): Promise<Task[]>;
  findAllByAssigneeId(assigneeId: string): Promise<Task[]>;
  findAll(): Promise<Task[]>;
}
