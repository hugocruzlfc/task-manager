import { BaseRepositoryPort } from '../../../shared/kernel/domain/base.repository.port';
import { PrismaService } from '../prisma/prisma.service';

/**
 * BaseRepository — Infrastructure Layer
 * Abstract adapter that all Prisma repository implementations extend.
 * Provides the PrismaService to concrete repositories.
 */
export abstract class BaseRepository<
  TEntity,
> implements BaseRepositoryPort<TEntity> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract findById(id: string): Promise<TEntity | null>;
  abstract save(entity: TEntity): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
