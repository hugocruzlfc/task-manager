import {
  Task,
  TaskStatus,
  TaskPriority,
} from '../../domain/entities/task.entity';
import { TaskId } from '../../domain/value-objects/task-id.vo';

/**
 * TaskMapper — Tasks Infrastructure
 * Translates between domain entities and Prisma persistence records.
 */
export class TaskMapper {
  static toDomain(record: {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    projectId: string;
    assigneeId: string | null;
    createdAt: Date;
    updatedAt: Date;
  }): Task {
    return Task.create(TaskId.create(record.id), {
      title: record.title,
      description: record.description ?? undefined,
      status: record.status as TaskStatus,
      priority: record.priority as TaskPriority,
      projectId: record.projectId,
      assigneeId: record.assigneeId ?? undefined,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static toPersistence(entity: Task): {
    id: string;
    title: string;
    description: string | null;
    status: string;
    priority: string;
    projectId: string;
    assigneeId: string | null;
  } {
    return {
      id: entity.id.value,
      title: entity.title,
      description: entity.description ?? null,
      status: entity.status,
      priority: entity.priority,
      projectId: entity.projectId,
      assigneeId: entity.assigneeId ?? null,
    };
  }
}
