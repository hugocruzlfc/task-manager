import { TaskBoard } from '@/modules/tasks';

interface ProjectTasksPageProps {
  params: Promise<{ projectId: string }>;
}

export async function generateMetadata({ params }: ProjectTasksPageProps) {
  const { projectId } = await params;
  return { title: `Project ${projectId} | Tasks` };
}

export default async function ProjectTasksPage({
  params,
}: ProjectTasksPageProps) {
  const { projectId } = await params;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10">
      <h1 className="mb-6 text-2xl font-semibold">Task Board</h1>
      <TaskBoard projectId={projectId} />
    </main>
  );
}
