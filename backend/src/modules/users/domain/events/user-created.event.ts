import { DomainEvent } from '../../../../shared/kernel/domain/domain-event.base';

/**
 * UserCreated Domain Event — Users Domain
 * No NestJS / Prisma imports allowed here.
 */
export class UserCreatedEvent extends DomainEvent {
  constructor(
    public readonly userId: string,
    public readonly email: string,
    public readonly name: string,
  ) {
    super(userId);
  }
}
