import { Controller, Get } from '@nestjs/common';

/**
 * ProjectsController — Projects Interfaces (HTTP Layer)
 * Routes are wired here; use-cases from the application layer are injected.
 */
@Controller('projects')
export class ProjectsController {
  @Get()
  findAll(): string {
    // TODO: inject and call use-case
    return 'ProjectsController: findAll – not implemented yet';
  }
}
