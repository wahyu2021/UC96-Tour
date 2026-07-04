import * as React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

interface MainLayoutProps {
  children: React.ReactNode;
}

export async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions);
  const isAdmin =
    (session?.user as { role?: string })?.role === 'ADMIN' ||
    (session?.user as { role?: string })?.role === 'SUPERADMIN';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAdmin={isAdmin} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
