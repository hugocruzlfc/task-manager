'use client';

import { type Task, TaskStatus } from '@/shared/types';

import { useTasks } from '../hooks/use-tasks';
import { TaskCard } from './task-card';

const COLUMNS: { status: TaskStatus; label: string }[] = [
  { status: TaskStatus.TODO, label: 'To Do' },
  { status: TaskStatus.IN_PROGRESS, label: 'In Progress' },
  { status: TaskStatus.IN_REVIEW, label: 'In Review' },
  { status: TaskStatus.DONE, label: 'Done' },
];

interface TaskBoardProps {
  projectId: string;
  onTaskClick?: (task: Task) => void;
}

export function TaskBoard({ projectId, onTaskClick }: TaskBoardProps) {
  const { data, isLoading, error } = useTasks({ projectId });

  if (isLoading) {
    return (
      <div className="grid grid-cols-4 gap-4">
        {COLUMNS.map((col) => (
          <div key={col.status} className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold uppercase text-zinc-500">
              {col.label}
            </h3>
            {Array.from({ length: 2 }).map((_, i) => (
              <div
                key={i}
                className="h-24 animate-pulse rounded-lg bg-zinc-100 dark:bg-zinc-800"
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <p className="text-sm text-red-600 dark:text-red-400">
        Failed to load tasks.
      </p>
    );
  }

  const tasks = data?.data ?? [];

  const grouped = COLUMNS.reduce<Record<TaskStatus, Task[]>>(
    (acc, col) => {
      acc[col.status] = tasks.filter((t) => t.status === col.status);
      return acc;
    },
    {} as Record<TaskStatus, Task[]>,
  );

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {COLUMNS.map((col) => (
        <div key={col.status} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {col.label}
            </h3>
            <span className="text-xs text-zinc-400">
              {grouped[col.status].length}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {grouped[col.status].map((task) => (
              <TaskCard key={task.id} task={task} onClick={onTaskClick} />
            ))}
            {grouped[col.status].length === 0 && (
              <p className="rounded-lg border border-dashed border-zinc-200 p-4 text-center text-xs text-zinc-400 dark:border-zinc-800">
                No tasks
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
