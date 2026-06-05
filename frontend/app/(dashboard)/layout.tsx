import type { ReactNode } from 'react';

import { AuthGuard } from '@/modules/auth/components/auth-guard';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
