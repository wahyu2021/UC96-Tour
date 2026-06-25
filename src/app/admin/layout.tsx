import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from '@/components/features/auth/LogoutButton';

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
    <div className="flex min-h-[calc(100vh-4rem)] w-full flex-col md:flex-row">
      {/* Sidebar Navigasi Admin */}
      <aside className="w-full shrink-0 border-r border-neutral-200 bg-white p-6 md:w-72 dark:border-neutral-800 dark:bg-[#121212]">
        <div className="mb-10">
          <h2 className="font-heading text-xl font-black tracking-widest text-neutral-900 uppercase dark:text-white">
            Admin Panel
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Halo,{' '}
            <span className="font-bold text-[var(--color-primary)]">
              {session.user?.name}
            </span>
          </p>
        </div>

        <nav className="flex flex-col gap-3">
          <Link
            href="/admin"
            className="rounded-lg bg-neutral-100 px-4 py-3 text-sm font-semibold text-neutral-900 transition-colors dark:bg-neutral-800 dark:text-white"
          >
            Manajemen Tim
          </Link>
          <button
            disabled
            className="cursor-not-allowed rounded-lg px-4 py-3 text-left text-sm font-semibold text-neutral-400 opacity-60 dark:text-neutral-600"
          >
            Input Skor (Segera Hadir)
          </button>
        </nav>

        <div className="mt-12 border-t border-neutral-200 pt-6 dark:border-neutral-800">
          <LogoutButton />
        </div>
      </aside>

      {/* Konten Utama Dasbor */}
      <main className="flex-1 overflow-x-auto bg-neutral-50/50 p-6 md:p-10 dark:bg-[#0a0a0a]">
        {children}
      </main>
    </div>
  );
}
