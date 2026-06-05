import { BaseRepositoryPort } from '../../../../shared/kernel/domain/base.repository.port';
import { User } from '../entities/user.entity';

/**
 * User Repository Port (interface) — Users Domain
 * This is the PORT; the adapter lives in the infrastructure layer.
 * No NestJS / Prisma imports allowed here.
 */
export const USER_REPOSITORY = Symbol('USER_REPOSITORY');

export interface UserRepositoryPort extends BaseRepositoryPort<User> {
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
}
