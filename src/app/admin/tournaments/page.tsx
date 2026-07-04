import { prisma } from '@/lib/db';
import { TournamentTableClient } from '@/components/features/admin/TournamentTableClient';

export const metadata = {
  title: 'Manajemen Turnamen | Admin Panel',
};

export default async function TournamentsPage() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: { select: { registrations: { where: { status: 'APPROVED' } } } },
    },
  });
  const now = new Date();
  
  const formattedTournaments = tournaments.map((tour) => {
    let dynamicStatus = tour.status;
    if (tour.status !== 'COMPLETED') {
      if (now < tour.startDate) {
        dynamicStatus = 'DRAFT';
      } else if (now >= tour.startDate && now <= tour.endDate) {
        dynamicStatus = 'ONGOING';
      } else if (now > tour.endDate) {
        dynamicStatus = 'COMPLETED';
      }
    }
    return { ...tour, status: dynamicStatus };
  });

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Manajemen Turnamen
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
            Buat dan pantau aktivitas turnamen. Anda bisa membuka dan menutup
            pendaftaran dari sini.
          </p>
        </div>
      </div>

      <TournamentTableClient initialTournaments={formattedTournaments} />
    </div>
  );
}
