'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type {
  CreateTaskRequest,
  PaginatedResponse,
  PaginationParams,
  Task,
  UpdateTaskRequest,
} from '@/shared/types';

import { TasksService } from '../services/tasks.service';

export const taskKeys = {
  all: ['tasks'] as const,
  lists: () => [...taskKeys.all, 'list'] as const,
  list: (params?: PaginationParams & { projectId?: string }) =>
    [...taskKeys.lists(), params] as const,
  details: () => [...taskKeys.all, 'detail'] as const,
  detail: (id: string) => [...taskKeys.details(), id] as const,
};

export function useTasks(
  params?: PaginationParams & { projectId?: string },
  options?: Partial<UseQueryOptions<PaginatedResponse<Task>>>,
) {
  return useQuery({
    queryKey: taskKeys.list(params),
    queryFn: () => TasksService.getAll(params),
    ...options,
  });
}

export function useTask(id: string, options?: Partial<UseQueryOptions<Task>>) {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => TasksService.getById(id),
    enabled: !!id,
    ...options,
  });
}

export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateTaskRequest) => TasksService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}

export function useUpdateTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateTaskRequest }) =>
      TasksService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: taskKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteTask() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => TasksService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: taskKeys.lists() });
    },
  });
}
