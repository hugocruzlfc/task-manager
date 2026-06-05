import { User } from '../../domain/entities/user.entity';
import { UserId } from '../../domain/value-objects/user-id.vo';

/**
 * UserMapper — Users Infrastructure
 * Translates between domain entities and Prisma persistence records.
 */
export class UserMapper {
  static toDomain(record: {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
    createdAt: Date;
    updatedAt: Date;
  }): User {
    return User.create(UserId.create(record.id), {
      email: record.email,
      name: record.name,
      passwordHash: record.passwordHash,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static toPersistence(entity: User): {
    id: string;
    email: string;
    name: string;
    passwordHash: string;
  } {
    return {
      id: entity.id.value,
      email: entity.email,
      name: entity.name,
      passwordHash: entity.passwordHash,
    };
  }
}
