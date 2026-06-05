import { Project } from '../../domain/entities/project.entity';
import { ProjectId } from '../../domain/value-objects/project-id.vo';

/**
 * ProjectMapper — Projects Infrastructure
 * Translates between domain entities and Prisma persistence records.
 */
export class ProjectMapper {
  static toDomain(record: {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
    createdAt: Date;
    updatedAt: Date;
  }): Project {
    return Project.create(ProjectId.create(record.id), {
      name: record.name,
      description: record.description ?? undefined,
      ownerId: record.ownerId,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
    });
  }

  static toPersistence(entity: Project): {
    id: string;
    name: string;
    description: string | null;
    ownerId: string;
  } {
    return {
      id: entity.id.value,
      name: entity.name,
      description: entity.description ?? null,
      ownerId: entity.ownerId,
    };
  }
}
