import { AggregateRoot } from '../../../../shared/kernel/domain/aggregate-root';
import { UserId } from '../value-objects/user-id.vo';

/**
 * User Entity (Aggregate Root) — Users Domain
 * No NestJS / Prisma imports allowed here.
 */
export interface UserProps {
  email: string;
  name: string;
  passwordHash: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User extends AggregateRoot<UserId> {
  private readonly props: UserProps;

  private constructor(id: UserId, props: UserProps) {
    super(id);
    this.props = props;
  }

  static create(id: UserId, props: UserProps): User {
    return new User(id, props);
  }

  get email(): string {
    return this.props.email;
  }

  get name(): string {
    return this.props.name;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
