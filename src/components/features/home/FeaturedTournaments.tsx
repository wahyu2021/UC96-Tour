import * as React from 'react';
import Link from 'next/link';
import { CalendarDays, Users, Trophy } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';
import { Badge } from '@/components/ui/Badge';

interface Tournament {
  id: string;
  name: string;
  bannerUrl: string | null;
  startDate: Date;
  endDate: Date;
  maxSlots: number;
  prizePool: string | null;
  status: string;
  _count: { teams: number };
}

interface Props {
  tournaments: Tournament[];
}

export function FeaturedTournaments({ tournaments }: Props) {
  if (!tournaments || tournaments.length === 0) return null;

  return (
    <section className="w-full bg-[#0a0a0a] py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-heading text-3xl font-black uppercase italic text-white md:text-4xl">
              Turnamen <span className="text-[var(--color-primary)]">Sorotan</span>
            </h2>
            <p className="mt-2 text-neutral-400">Kompetisi yang sedang atau akan segera berlangsung.</p>
          </div>
          <Link href="/tournaments" className="hidden text-sm font-bold text-neutral-300 hover:text-white md:block">
            Lihat Semua &rarr;
          </Link>
        </div>

        <div className="flex w-full snap-x snap-mandatory gap-6 overflow-x-auto pb-8 pt-4">
          {tournaments.map((tour) => (
            <Link
              key={tour.id}
              href={`/tournaments/${tour.id}`}
              className="group relative flex w-80 shrink-0 snap-center flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#121212] transition-transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-primary)]/20"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full bg-neutral-900">
                {tour.bannerUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={tour.bannerUrl}
                    alt={tour.name}
                    className="absolute inset-0 h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-neutral-700">
                    <Trophy className="h-12 w-12" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-transparent to-transparent"></div>
                <div className="absolute left-4 top-4">
                  <Badge variant={tour.status === 'ONGOING' ? 'success' : 'warning'}>
                    {tour.status === 'ONGOING' ? 'Sedang Berlangsung' : 'Pendaftaran Dibuka'}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex flex-col p-6">
                <h3 className="font-heading mb-4 line-clamp-2 text-xl font-bold leading-tight text-white group-hover:text-[var(--color-primary)]">
                  {tour.name}
                </h3>

                <div className="mb-6 space-y-3">
                  <div className="flex items-center text-sm text-neutral-400">
                    <CalendarDays className="mr-3 h-4 w-4 text-neutral-500" />
                    <span>
                      {new Date(tour.startDate).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-neutral-400">
                    <Users className="mr-3 h-4 w-4 text-neutral-500" />
                    <span>
                      Slot: <strong className="text-white">{tour._count.teams} / {tour.maxSlots}</strong> Tim
                    </span>
                  </div>
                </div>

                {/* Footer section pushes to bottom */}
                <div className="mt-auto border-t border-neutral-800 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-neutral-500">Prize Pool</span>
                    <span className="font-bold text-yellow-500">
                      {tour.prizePool ? formatRupiah(tour.prizePool) : 'TBA'}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="mt-4 flex justify-center md:hidden">
          <Link href="/tournaments" className="rounded-full bg-neutral-800 px-6 py-2 text-sm font-bold text-white hover:bg-neutral-700">
            Lihat Semua Turnamen
          </Link>
        </div>
      </div>
    </section>
  );
}
