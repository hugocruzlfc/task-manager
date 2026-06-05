import { RegisterForm } from '@/modules/auth/components/register-form';

export const metadata = {
  title: 'Create account | Task Manager',
};

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <RegisterForm />
    </main>
  );
}
