import { AggregateRoot } from '../../../../shared/kernel/domain/aggregate-root';
import { TaskId } from '../value-objects/task-id.vo';

/**
 * Task Entity (Aggregate Root) — Tasks Domain
 * No NestJS / Prisma imports allowed here.
 */
export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  IN_REVIEW = 'IN_REVIEW',
  DONE = 'DONE',
}

export enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
  CRITICAL = 'CRITICAL',
}

export interface TaskProps {
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  assigneeId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Task extends AggregateRoot<TaskId> {
  private readonly props: TaskProps;

  private constructor(id: TaskId, props: TaskProps) {
    super(id);
    this.props = props;
  }

  static create(id: TaskId, props: TaskProps): Task {
    return new Task(id, props);
  }

  get title(): string {
    return this.props.title;
  }

  get description(): string | undefined {
    return this.props.description;
  }

  get status(): TaskStatus {
    return this.props.status;
  }

  get priority(): TaskPriority {
    return this.props.priority;
  }

  get projectId(): string {
    return this.props.projectId;
  }

  get assigneeId(): string | undefined {
    return this.props.assigneeId;
  }

  get createdAt(): Date | undefined {
    return this.props.createdAt;
  }

  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
}
