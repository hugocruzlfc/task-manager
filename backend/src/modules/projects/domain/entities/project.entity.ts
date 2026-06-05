import { AggregateRoot } from '../../../../shared/kernel/domain/aggregate-root';
import { ProjectId } from '../value-objects/project-id.vo';

/**
 * Project Entity (Aggregate Root) — Projects Domain
 * No NestJS / Prisma imports allowed here.
 */
export interface ProjectProps {
  name: string;
  description?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Project extends AggregateRoot<ProjectId> {
  private readonly props: ProjectProps;

  private constructor(id: ProjectId, props: ProjectProps) {
    super(id);
    this.props = props;
  }

  static create(id: ProjectId, props: ProjectProps): Project {
    return new Project(id, props);
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get ownerId(): string {
    return this.props.ownerId;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
