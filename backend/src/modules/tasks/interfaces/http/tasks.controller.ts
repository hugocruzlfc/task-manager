import { Controller, Get } from '@nestjs/common';

/**
 * TasksController — Tasks Interfaces (HTTP Layer)
 * Routes are wired here; use-cases from the application layer are injected.
 */
@Controller('tasks')
export class TasksController {
  @Get()
  findAll(): string {
    // TODO: inject and call use-case
    return 'TasksController: findAll – not implemented yet';
  }
}
