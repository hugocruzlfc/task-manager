import { BaseEntity } from './base.entity';
import { DomainEvent } from './domain-event.base';

/**
 * Aggregate Root — Shared Kernel
 * No NestJS / Prisma imports allowed here.
 */
export abstract class AggregateRoot<TId> extends BaseEntity<TId> {
  private _domainEvents: DomainEvent[] = [];

  get domainEvents(): ReadonlyArray<DomainEvent> {
    return this._domainEvents;
  }

  protected addDomainEvent(event: DomainEvent): void {
    this._domainEvents.push(event);
  }

  clearDomainEvents(): void {
    this._domainEvents = [];
  }
}
