import { prisma } from '@/lib/db';
import { TournamentTableClient } from '@/components/features/admin/TournamentTableClient';

export const metadata = {
  title: 'Manajemen Turnamen | Admin Panel',
};

export default async function TournamentsPage() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { teams: true } } },
  });

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Manajemen Turnamen
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
            Buat dan pantau aktivitas turnamen. Anda bisa membuka dan menutup pendaftaran dari sini.
          </p>
        </div>
      </div>

      <TournamentTableClient initialTournaments={tournaments} />
    </div>
  );
}
