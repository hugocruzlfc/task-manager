import { Module } from '@nestjs/common';
import { UsersController } from './interfaces/http/users.controller';
import { PrismaUserRepository } from './infrastructure/persistence/prisma-user.repository';
import { USER_REPOSITORY } from './domain/ports/user.repository.port';

/**
 * UsersModule — wires the Ports ↔ Adapters for the Users bounded context.
 *
 * Dependency flow:
 *   interfaces/http  →  application/use-cases  →  domain ports
 *                                                      ↑
 *                                         infrastructure/persistence
 */
@Module({
  controllers: [UsersController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UsersModule {}
