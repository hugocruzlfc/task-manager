import { Module } from '@nestjs/common';
import { TasksController } from './interfaces/http/tasks.controller';
import { PrismaTaskRepository } from './infrastructure/persistence/prisma-task.repository';
import { TASK_REPOSITORY } from './domain/ports/task.repository.port';

/**
 * TasksModule — wires the Ports ↔ Adapters for the Tasks bounded context.
 */
@Module({
  controllers: [TasksController],
  providers: [
    {
      provide: TASK_REPOSITORY,
      useClass: PrismaTaskRepository,
    },
  ],
  exports: [TASK_REPOSITORY],
})
export class TasksModule {}
