import { Module } from '@nestjs/common';
import { ProjectsController } from './interfaces/http/projects.controller';
import { PrismaProjectRepository } from './infrastructure/persistence/prisma-project.repository';
import { PROJECT_REPOSITORY } from './domain/ports/project.repository.port';

/**
 * ProjectsModule — wires the Ports ↔ Adapters for the Projects bounded context.
 */
@Module({
  controllers: [ProjectsController],
  providers: [
    {
      provide: PROJECT_REPOSITORY,
      useClass: PrismaProjectRepository,
    },
  ],
  exports: [PROJECT_REPOSITORY],
})
export class ProjectsModule {}
