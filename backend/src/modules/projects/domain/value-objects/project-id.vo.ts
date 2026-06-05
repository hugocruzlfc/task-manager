import { ValueObject } from '../../../../shared/kernel/domain/value-object';
import { randomUUID } from 'crypto';

/**
 * ProjectId Value Object — Projects Domain
 * No NestJS / Prisma imports allowed here.
 */
interface ProjectIdProps {
  value: string;
}

export class ProjectId extends ValueObject<ProjectIdProps> {
  private constructor(props: ProjectIdProps) {
    super(props);
  }

  get value(): string {
    return this.props.value;
  }

  static create(value: string): ProjectId {
    return new ProjectId({ value });
  }

  static generate(): ProjectId {
    return new ProjectId({ value: randomUUID() });
  }
}
