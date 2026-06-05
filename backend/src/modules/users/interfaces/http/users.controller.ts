import { Controller, Get } from '@nestjs/common';

/**
 * UsersController — Users Interfaces (HTTP Layer)
 * Routes are wired here; use-cases from the application layer are injected.
 */
@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    // TODO: inject and call use-case
    return 'UsersController: findAll – not implemented yet';
  }
}
