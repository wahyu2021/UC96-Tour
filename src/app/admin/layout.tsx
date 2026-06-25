import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/features/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Lapis perlindungan tambahan di Server Component
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      {/* Sidebar Navigasi Admin */}
      <AdminSidebar userName={session.user?.name} />

      {/* Konten Utama Dasbor */}
      <main className="flex-1 overflow-x-auto bg-neutral-50/50 p-6 md:p-10 dark:bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
