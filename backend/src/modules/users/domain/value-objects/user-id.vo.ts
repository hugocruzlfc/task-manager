import { ValueObject } from '../../../../shared/kernel/domain/value-object';
import { randomUUID } from 'crypto';

/**
 * UserId Value Object — Users Domain
 * No NestJS / Prisma imports allowed here.
 */
interface UserIdProps {
  value: string;
}

export class UserId extends ValueObject<UserIdProps> {
  private constructor(props: UserIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(value: string): UserId {
    return new UserId({ value });
  }

  static generate(): UserId {
    return new UserId({ value: randomUUID() });
  }
}
