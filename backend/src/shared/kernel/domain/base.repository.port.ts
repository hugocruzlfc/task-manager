/**
 * Base Repository Port — Shared Kernel
 * This is a pure TypeScript interface (Port).
 * No NestJS / Prisma imports allowed here.
 */
export interface BaseRepositoryPort<TEntity> {
  findById(id: string): Promise<TEntity | null>;
  save(entity: TEntity): Promise<void>;
  delete(id: string): Promise<void>;
}
