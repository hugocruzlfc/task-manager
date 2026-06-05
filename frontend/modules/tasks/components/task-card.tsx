'use client';

import { TaskPriority, TaskStatus, type Task } from '@/shared/types';

interface TaskCardProps {
  task: Task;
  onClick?: (task: Task) => void;
}

const STATUS_LABELS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'To Do',
  [TaskStatus.IN_PROGRESS]: 'In Progress',
  [TaskStatus.IN_REVIEW]: 'In Review',
  [TaskStatus.DONE]: 'Done',
};

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  [TaskPriority.LOW]:
    'bg-zinc-200 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300',
  [TaskPriority.MEDIUM]:
    'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
  [TaskPriority.HIGH]:
    'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300',
  [TaskPriority.CRITICAL]:
    'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
};

export function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <button
      type="button"
      onClick={() => onClick?.(task)}
      className="flex flex-col gap-2 rounded-lg border border-zinc-200 bg-white p-3 text-left shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-950"
    >
      <div className="flex items-center justify-between gap-2">
        <h4 className="text-sm font-medium leading-snug line-clamp-1">
          {task.title}
        </h4>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase ${PRIORITY_COLORS[task.priority]}`}
        >
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-zinc-500 line-clamp-2">{task.description}</p>
      )}

      <span className="mt-auto text-[10px] text-zinc-400">
        {STATUS_LABELS[task.status]}
      </span>
    </button>
  );
}
