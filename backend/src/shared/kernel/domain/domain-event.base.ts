import { randomUUID } from 'crypto';

/**
 * Domain Event base — Shared Kernel
 * No NestJS / Prisma imports allowed here.
 */
export abstract class DomainEvent {
  public readonly eventId: string;
  public readonly occurredAt: Date;

  constructor(public readonly aggregateId: string) {
    this.eventId = randomUUID();
    this.occurredAt = new Date();
  }
}
