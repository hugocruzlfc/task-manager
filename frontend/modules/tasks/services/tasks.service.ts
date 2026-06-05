import { apiClient } from '@/infrastructure';
import type {
  CreateTaskRequest,
  PaginatedResponse,
  PaginationParams,
  Task,
  UpdateTaskRequest,
} from '@/shared/types';

const PREFIX = 'tasks';

export const TasksService = {
  async getAll(
    params?: PaginationParams & { projectId?: string },
  ): Promise<PaginatedResponse<Task>> {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set('page', String(params.page));
    if (params?.limit) searchParams.set('limit', String(params.limit));
    if (params?.projectId)
      searchParams.set('projectId', String(params.projectId));
    return apiClient.get(PREFIX, { searchParams }).json();
  },

  async getById(id: string): Promise<Task> {
    return apiClient.get(`${PREFIX}/${id}`).json();
  },

  async create(data: CreateTaskRequest): Promise<Task> {
    return apiClient.post(PREFIX, { json: data }).json();
  },

  async update(id: string, data: UpdateTaskRequest): Promise<Task> {
    return apiClient.patch(`${PREFIX}/${id}`, { json: data }).json();
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`${PREFIX}/${id}`);
  },
} as const;
