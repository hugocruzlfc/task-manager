import { DomainEvent } from '../../../../shared/kernel/domain/domain-event.base';

/**
 * TaskCreated Domain Event — Tasks Domain
 * No NestJS / Prisma imports allowed here.
 */
export class TaskCreatedEvent extends DomainEvent {
  constructor(
    public readonly taskId: string,
    public readonly title: string,
    public readonly projectId: string,
  ) {
    super(taskId);
  }
}
