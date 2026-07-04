import * as React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MainLayoutProps } from '@/types';

export async function MainLayout({ children }: MainLayoutProps) {
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;
  const isAdmin = userRole === 'ADMIN' || userRole === 'SUPERADMIN';
  const isPlayer = userRole === 'PLAYER';

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar isAdmin={isAdmin} isPlayer={isPlayer} />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
