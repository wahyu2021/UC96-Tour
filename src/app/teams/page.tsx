import { Metadata } from 'next';
import { getPublicTeams, getActiveTournaments } from '@/lib/api/teams';
import { TeamCard } from '@/components/features/teams/TeamCard';
import { TeamsFilter } from '@/components/features/teams/TeamsFilter';
import { Pagination } from '@/components/ui/Pagination';

export const metadata: Metadata = {
  title: 'Daftar Tim - UC96 Tournament',
  description: 'Daftar tim yang berpartisipasi dalam turnamen Unit Combat 96.',
};

export default async function TeamsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q : undefined;
  const tournamentId =
    typeof params.tournament === 'string' ? params.tournament : undefined;
  const page = typeof params.page === 'string' ? parseInt(params.page, 10) : 1;

  // Fetch data
  const [teamsData, activeTournaments] = await Promise.all([
    getPublicTeams({ search: q, tournamentId, page, limit: 12 }),
    getActiveTournaments(),
  ]);

  const { teams, metadata: pageMeta } = teamsData;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-heading text-4xl font-black tracking-tight text-neutral-900 uppercase md:text-5xl dark:text-white">
          Daftar Tim{' '}
          <span className="text-[var(--color-primary)]">Peserta</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Temukan dan dukung tim favoritmu di turnamen UC96.
        </p>
      </div>

      <TeamsFilter tournaments={activeTournaments} />

      {teams.length > 0 ? (
        <>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teams.map(
              (
                team: any // eslint-disable-line @typescript-eslint/no-explicit-any
              ) => (
                <TeamCard key={team.id} team={team} />
              )
            )}
          </div>
          <Pagination
            currentPage={pageMeta.page}
            totalPages={pageMeta.totalPages}
          />
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200/50 text-4xl dark:bg-neutral-800/50">
            🔍
          </div>
          <h3 className="font-heading mt-6 text-xl font-bold text-neutral-900 dark:text-white">
            Tidak ada tim yang ditemukan
          </h3>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Coba gunakan kata kunci pencarian yang berbeda atau pilih turnamen
            lain.
          </p>
        </div>
      )}
    </div>
  );
}
