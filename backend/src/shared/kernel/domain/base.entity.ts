/**
 * Base Entity — Shared Kernel
 * No NestJS / Prisma imports allowed here.
 */
export abstract class BaseEntity<TId> {
  protected readonly _id: TId;

  constructor(id: TId) {
    this._id = id;
  }

  get id(): TId {
    return this._id;
  }

  equals(other?: BaseEntity<TId>): boolean {
    if (!other || !(other instanceof BaseEntity)) return false;
    if (this === other) return true;
    return JSON.stringify(this._id) === JSON.stringify(other._id);
  }
}
