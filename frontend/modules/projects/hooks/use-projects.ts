'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';

import type {
  CreateProjectRequest,
  PaginatedResponse,
  PaginationParams,
  Project,
  UpdateProjectRequest,
} from '@/shared/types';

import { ProjectsService } from '../services/projects.service';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (params?: PaginationParams) =>
    [...projectKeys.lists(), params] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

export function useProjects(
  params?: PaginationParams,
  options?: Partial<UseQueryOptions<PaginatedResponse<Project>>>,
) {
  return useQuery({
    queryKey: projectKeys.list(params),
    queryFn: () => ProjectsService.getAll(params),
    ...options,
  });
}

export function useProject(
  id: string,
  options?: Partial<UseQueryOptions<Project>>,
) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => ProjectsService.getById(id),
    enabled: !!id,
    ...options,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProjectRequest) => ProjectsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectRequest }) =>
      ProjectsService.update(id, data),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(variables.id),
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => ProjectsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
    },
  });
}
