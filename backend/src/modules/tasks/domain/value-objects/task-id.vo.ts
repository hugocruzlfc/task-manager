import { ValueObject } from '../../../../shared/kernel/domain/value-object';
import { randomUUID } from 'crypto';

/**
 * TaskId Value Object — Tasks Domain
 * No NestJS / Prisma imports allowed here.
 */
interface TaskIdProps {
  value: string;
}

export class TaskId extends ValueObject<TaskIdProps> {
  private constructor(props: TaskIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(value: string): TaskId {
    return new TaskId({ value });
  }

  static generate(): TaskId {
    return new TaskId({ value: randomUUID() });
  }
}
