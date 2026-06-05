import { apiClient } from '@/infrastructure';
import type {
  CreateProjectRequest,
  PaginatedResponse,
  PaginationParams,
  Project,
  UpdateProjectRequest,
} from '@/shared/types';

const PREFIX = 'projects';

export const ProjectsService = {
  async getAll(params?: PaginationParams): Promise<PaginatedResponse<Project>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    return apiClient.get(PREFIX, { searchParams }).json();
  },

  async getById(id: string): Promise<Project> {
    return apiClient.get(`${PREFIX}/${id}`).json();
  },

  async create(data: CreateProjectRequest): Promise<Project> {
    return apiClient.post(PREFIX, { json: data }).json();
  },

  async update(id: string, data: UpdateProjectRequest): Promise<Project> {
    return apiClient.patch(`${PREFIX}/${id}`, { json: data }).json();
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`${PREFIX}/${id}`);
  },
} as const;
