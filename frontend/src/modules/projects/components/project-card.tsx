'use client';

import type { Project } from '@/shared/types';

interface ProjectCardProps {
  project: Project;
  onClick?: (project: Project) => void;
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(project)}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 p-4 text-left transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
    >
      <h3 className="text-sm font-semibold">{project.name}</h3>
      {project.description && (
        <p className="text-xs text-zinc-500 line-clamp-2">
          {project.description}
        </p>
      )}
      <time className="mt-auto text-xs text-zinc-400">
        {new Date(project.createdAt).toLocaleDateString()}
      </time>
    </button>
  );
}
