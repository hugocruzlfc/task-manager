'use client';

import type { Project } from '@/shared/types';

import { useProjects } from '../hooks/use-projects';
import { ProjectCard } from './project-card';

interface ProjectListProps {
  onSelect?: (project: Project) => void;
}

export function ProjectList({ onSelect }: ProjectListProps) {
  const { data, isLoading, error } = useProjects();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-28 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load projects.
      </p>
    );
  }

  if (!data?.data.length) {
    return (
      <p className="text-sm text-zinc-500">
        No projects yet. Create your first one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.data.map((project) => (
        <ProjectCard key={project.id} project={project} onClick={onSelect} />
      ))}
    </div>
  );
}
