import { DomainEvent } from '../../../../shared/kernel/domain/domain-event.base';

/**
 * ProjectCreated Domain Event — Projects Domain
 * No NestJS / Prisma imports allowed here.
 */
export class ProjectCreatedEvent extends DomainEvent {
  constructor(
    public readonly projectId: string,
    public readonly name: string,
    public readonly ownerId: string,
  ) {
    super(projectId);
  }
}
