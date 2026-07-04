import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/Badge';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { QuickJoinButton } from '@/components/features/public/QuickJoinButton';
import { CalendarDays, Users, Trophy, Shield, Swords } from 'lucide-react';
import Link from 'next/link';
import { formatRupiah } from '@/lib/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tour = await prisma.tournament.findUnique({ where: { id } });
  if (!tour) return { title: 'Turnamen Tidak Ditemukan' };
  return { title: `${tour.name} | UC96 Tournaments` };
}

export default async function TournamentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const tour = await prisma.tournament.findUnique({
    where: { id },
    include: {
      registrations: {
        where: { status: 'APPROVED' },
        include: {
          team: {
            include: {
              players: true,
            },
          },
        },
      },
    },
  });

  if (!tour) {
    notFound();
  }

  const teams = tour.registrations.map((r) => r.team);

  const session = await getServerSession(authOptions);
  const isLoggedIn = !!session?.user;

  // Status Logic
  let dynamicStatus = tour.status;
  const now = new Date();
  if (tour.status !== 'COMPLETED') {
    if (now < tour.startDate) {
      dynamicStatus = 'DRAFT';
    } else if (now >= tour.startDate && now <= tour.endDate) {
      dynamicStatus = 'ONGOING';
    } else if (now > tour.endDate) {
      dynamicStatus = 'COMPLETED';
    }
  }

  return (
    <div className="w-full">
      {/* Hero Banner Section */}
      <div className="relative min-h-[40vh] w-full overflow-hidden bg-neutral-900">
        {tour.backgroundUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={tour.backgroundUrl}
            alt="Landscape Background"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/images/default-bg.webp"
            alt="Default Background"
            className="absolute inset-0 h-full w-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/50 to-transparent"></div>

        <div className="relative mx-auto flex min-h-[40vh] max-w-7xl flex-col justify-end px-4 pb-12 sm:px-6 lg:px-8">
          <Badge
            variant={dynamicStatus === 'ONGOING' ? 'success' : 'default'}
            className="mb-4 w-fit px-3 py-1 font-bold"
          >
            {dynamicStatus}
          </Badge>
          <h1 className="font-heading text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {tour.name}
          </h1>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm font-medium text-neutral-300">
            <div className="flex items-center gap-2">
              <CalendarDays className="text-brand-500 h-5 w-5" />
              <span>
                {tour.startDate.toLocaleDateString('id-ID')} -{' '}
                {tour.endDate.toLocaleDateString('id-ID')}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="text-brand-500 h-5 w-5" />
              <span>
                {teams.length} / {tour.maxSlots} Tim Terdaftar
              </span>
            </div>
            {tour.prizePool && (
              <div className="flex items-center gap-2 text-yellow-400">
                <Trophy className="h-5 w-5" />
                <span className="font-bold">
                  {formatRupiah(tour.prizePool)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 lg:gap-10">
          {/* Kolom 1: Poster 9:16 (Kiri) */}
          <div className="lg:col-span-1">
            {tour.bannerUrl ? (
              <div className="sticky top-24 overflow-hidden rounded-2xl border border-neutral-200 shadow-xl dark:border-neutral-800">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={tour.bannerUrl}
                  alt={tour.name}
                  className="aspect-[9/16] w-full object-cover"
                />
              </div>
            ) : (
              <div className="sticky top-24 flex aspect-[9/16] w-full flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50 dark:border-neutral-800 dark:bg-[#121212]">
                <Trophy className="h-12 w-12 text-neutral-400 opacity-50" />
                <span className="mt-2 px-4 text-center text-xs font-bold tracking-widest text-neutral-500 uppercase">
                  NO POSTER
                </span>
              </div>
            )}
          </div>

          {/* Kolom 2: Informasi Utama (Tengah, lebih lebar) */}
          <div className="space-y-12 lg:col-span-2">
            <section>
              <h2 className="font-heading mb-6 flex items-center gap-2 text-2xl font-bold text-neutral-900 dark:text-white">
                <Shield className="text-brand-500 h-6 w-6" />
                Informasi & Aturan Turnamen
              </h2>
              <div className="prose prose-neutral dark:prose-invert max-w-none rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-[#121212]">
                {tour.description ? (
                  <p className="leading-relaxed whitespace-pre-wrap">
                    {tour.description}
                  </p>
                ) : (
                  <p className="text-neutral-500 italic">
                    Tidak ada deskripsi spesifik untuk turnamen ini.
                  </p>
                )}
              </div>
            </section>
          </div>

          {/* Teams Roster Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="font-heading mb-6 flex items-center gap-2 text-xl font-bold text-neutral-900 dark:text-white">
              <Swords className="text-brand-500 h-6 w-6" />
              Tim Berpartisipasi ({teams.length})
            </h2>

            <div className="flex flex-col gap-3">
              {teams.length === 0 ? (
                <div className="rounded-xl border border-dashed border-neutral-300 p-6 text-center text-sm text-neutral-500 dark:border-neutral-800">
                  Belum ada tim yang disetujui.
                </div>
              ) : (
                teams.map((team) => (
                  <Link
                    href={`/teams/${team.id}`}
                    key={team.id}
                    className="group hover:border-brand-500 dark:hover:border-brand-500/50 flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-3 transition-colors hover:bg-neutral-50 dark:border-neutral-800 dark:bg-[#121212] dark:hover:bg-neutral-900"
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-neutral-100 font-bold text-neutral-500 dark:bg-neutral-800">
                      {team.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={team.logoUrl}
                          alt={team.name}
                          className="h-full w-full rounded-lg object-cover"
                        />
                      ) : (
                        team.tag
                      )}
                    </div>
                    <div>
                      <h4 className="group-hover:text-brand-600 dark:group-hover:text-brand-400 font-bold text-neutral-900 dark:text-white">
                        {team.name}
                      </h4>
                      <p className="text-xs font-semibold text-neutral-500">
                        {team.players.length} Pemain
                      </p>
                    </div>
                  </Link>
                ))
              )}
            </div>

            {dynamicStatus !== 'COMPLETED' &&
              teams.length < tour.maxSlots && (
                <div className="mt-6">
                  <QuickJoinButton
                    tournamentId={tour.id}
                    tournamentName={tour.name}
                    isLoggedIn={isLoggedIn}
                  />
                </div>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
