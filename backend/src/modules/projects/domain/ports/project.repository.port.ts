import { BaseRepositoryPort } from '../../../../shared/kernel/domain/base.repository.port';
import { Project } from '../entities/project.entity';

/**
 * Project Repository Port (interface) — Projects Domain
 * This is the PORT; the adapter lives in the infrastructure layer.
 * No NestJS / Prisma imports allowed here.
 */
export const PROJECT_REPOSITORY = Symbol('PROJECT_REPOSITORY');

export interface ProjectRepositoryPort extends BaseRepositoryPort<Project> {
  findAllByOwnerId(ownerId: string): Promise<Project[]>;
  findAll(): Promise<Project[]>;
}
