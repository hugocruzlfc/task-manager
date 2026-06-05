import { LoginForm } from '@/modules/auth/components/login-form';

export const metadata = {
  title: 'Sign in | Task Manager',
};

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <LoginForm />
    </main>
  );
}
