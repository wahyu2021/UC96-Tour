import { prisma } from '@/lib/db';
import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';
import { CalendarDays, Users, Trophy, ExternalLink } from 'lucide-react';
import { formatRupiah } from '@/lib/utils';

export const metadata = {
  title: 'Daftar Turnamen | UC96 E-Sports',
  description: 'Ikuti dan pantau berbagai turnamen PUBG Mobile dari UC96.',
};

export default async function PublicTournamentsPage() {
  const tournaments = await prisma.tournament.findMany({
    orderBy: { startDate: 'desc' },
    include: {
      _count: {
        select: { registrations: { where: { status: 'APPROVED' } } },
      },
    },
  });

  return (
    <div className="mx-auto w-full max-w-7xl pt-10 pb-24 px-4 sm:px-6 lg:px-8">
      <div className="mb-12 text-center">
        <h1 className="font-heading mb-4 text-4xl font-black tracking-tight text-neutral-900 sm:text-5xl dark:text-white">
          Turnamen <span className="text-[var(--color-primary)]">UC96</span>
        </h1>
        <p className="mx-auto max-w-2xl text-neutral-500 dark:text-neutral-400">
          Daftar turnamen esports bergengsi yang diselenggarakan oleh UC96. 
          Ikuti kompetisinya, raih kemenangan, dan jadilah yang terbaik.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {tournaments.length === 0 ? (
          <div className="col-span-full rounded-2xl border border-dashed border-neutral-300 py-20 text-center dark:border-neutral-800">
            <Trophy className="mx-auto mb-4 h-12 w-12 text-neutral-400 opacity-50" />
            <p className="text-neutral-500">Belum ada turnamen yang tersedia saat ini.</p>
          </div>
        ) : (
          tournaments.map((tour) => {
            // Status Logic
            let dynamicStatus = tour.status;
            const now = new Date();
            if (tour.status !== 'COMPLETED') {
              if (now < tour.startDate) {
                dynamicStatus = 'DRAFT'; // UPCOMING
              } else if (now >= tour.startDate && now <= tour.endDate) {
                dynamicStatus = 'ONGOING';
              } else if (now > tour.endDate) {
                dynamicStatus = 'COMPLETED';
              }
            }

            const statusColors = {
              DRAFT: 'warning', // Upcoming
              ONGOING: 'success', // Live
              COMPLETED: 'default', // Past
            } as const;

            return (
              <Link
                key={tour.id}
                href={`/tournaments/${tour.id}`}
                className="group relative flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-[#121212]"
              >
                {/* Banner Image - Left Side on Desktop */}
                <div className="relative w-full shrink-0 sm:w-48 md:w-56 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                  {/* Memaksa aspect ratio di mobile, dan full height di desktop */}
                  <div className="aspect-[9/16] sm:aspect-auto sm:h-full w-full relative">
                    {tour.bannerUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img 
                        src={tour.bannerUrl} 
                        alt={tour.name}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center gap-2 text-neutral-400 opacity-50 transition-transform duration-700 group-hover:scale-105">
                        <Trophy className="h-10 w-10" />
                        <span className="text-xs font-bold uppercase tracking-widest">NO BANNER</span>
                      </div>
                    )}
                    {/* Gradient Overlay for bottom of image on mobile only */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent sm:hidden"></div>
                    
                    {/* Status Badge */}
                    <div className="absolute left-4 top-4">
                      <Badge variant={statusColors[dynamicStatus as keyof typeof statusColors]} className="shadow-lg backdrop-blur-md font-bold">
                        {dynamicStatus === 'DRAFT' ? 'MENDATANG' : dynamicStatus === 'ONGOING' ? 'LIVE SEKARANG' : 'SELESAI'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Content - Right Side on Desktop */}
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <h3 className="font-heading mb-4 text-2xl font-bold text-neutral-900 transition-colors group-hover:text-[var(--color-primary)] dark:text-white">
                    {tour.name}
                  </h3>
                  
                  <div className="mt-auto space-y-4">
                    <div className="flex items-center gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                        <CalendarDays className="h-4 w-4 shrink-0" />
                      </div>
                      <span>{tour.startDate.toLocaleDateString('id-ID')} - {tour.endDate.toLocaleDateString('id-ID')}</span>
                    </div>
                    
                    <div className="flex items-center justify-between gap-3 text-sm font-medium text-neutral-600 dark:text-neutral-400">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-900/20 dark:text-brand-400">
                          <Users className="h-4 w-4 shrink-0" />
                        </div>
                        <span>{tour._count.registrations} / {tour.maxSlots} Tim</span>
                      </div>
                      
                      {tour.prizePool && (
                        <div className="flex items-center gap-2 rounded-lg bg-yellow-50 px-3 py-1.5 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                          <Trophy className="h-4 w-4 shrink-0" />
                          <span className="font-bold">{formatRupiah(tour.prizePool)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Hover indicator */}
                <div className="absolute right-6 top-6 -translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 hidden sm:block">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-neutral-500 hover:bg-[var(--color-primary)] hover:text-white dark:bg-neutral-800 dark:text-neutral-400 dark:hover:bg-[var(--color-primary)] dark:hover:text-white transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}
