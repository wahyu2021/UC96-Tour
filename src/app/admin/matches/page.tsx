import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { MatchTable } from '@/components/features/admin/matches/MatchTable';

export const metadata: Metadata = {
  title: 'Manajemen Jadwal - Admin UC96',
  description: 'Kelola jadwal dan status pertandingan.',
};

export default async function AdminMatchesPage() {
  // Fetch tournaments for dropdown
  const tournaments = await prisma.tournament.findMany({
    where: {
      status: { in: ['DRAFT', 'ONGOING'] },
    },
    select: {
      id: true,
      name: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="flex w-full flex-col gap-8">
      <div>
        <h1 className="font-heading text-3xl font-black tracking-tight text-neutral-900 uppercase dark:text-white">
          Manajemen <span className="text-[var(--color-primary)]">Jadwal</span>
        </h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
          Buat jadwal pertandingan baru dan atur status (Live/Selesai) secara
          manual.
        </p>
      </div>

      <div className="rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
        <MatchTable activeTournaments={tournaments} />
      </div>
    </div>
  );
}
