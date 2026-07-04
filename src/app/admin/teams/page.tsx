import { TeamTableClient } from '@/components/features/admin/TeamTableClient';
import { prisma } from '@/lib/db';

export const metadata = {
  title: 'Manajemen Tim | Admin Panel',
};

// Pastikan halaman ini dinamis karena menarik data database setiap kali dimuat
export const dynamic = 'force-dynamic';

export default async function AdminTeamsPage() {
  // Menarik semua data tim beserta pemainnya dari MySQL
  const teams = await prisma.team.findMany({
    include: {
      players: true,
      registrations: { include: { tournament: true } },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl">
      <div className="mb-10 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl dark:text-white">
            Manajemen Tim
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 sm:text-base dark:text-neutral-400">
            Tinjau, filter, dan ubah status persetujuan pendaftar. Tim yang
            berstatus &quot;Approved&quot; akan dianggap sah mengikuti turnamen.
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex flex-col items-center justify-center rounded-lg border border-neutral-200 bg-white px-4 py-2 shadow-sm dark:border-neutral-800 dark:bg-[#121212]">
            <span className="text-xs font-semibold text-neutral-500 uppercase">
              Total Tim
            </span>
            <span className="font-heading text-xl font-bold text-neutral-900 dark:text-white">
              {teams.length}
            </span>
          </div>
        </div>
      </div>

      {/* Komponen Klien untuk Filter dan Tombol Interaktif */}
      <TeamTableClient initialTeams={teams} />
    </div>
  );
}
