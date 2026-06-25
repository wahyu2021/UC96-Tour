import { Metadata } from 'next';
import { getPublicMatches, getMatchDates } from '@/lib/api/matches';
import { MatchCard } from '@/components/features/schedule/MatchCard';
import { DateFilter } from '@/components/features/schedule/DateFilter';
import { CalendarX } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Jadwal Pertandingan - UC96 Tournament',
  description: 'Jadwal lengkap pertandingan turnamen Unit Combat 96.',
};

export default async function SchedulePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const dateParam =
    typeof searchParams.date === 'string' ? searchParams.date : undefined;

  // Fetch unique dates for the filter
  const availableDates = await getMatchDates();

  // Determine the active date: from URL param, or the first available date, or undefined
  const activeDate =
    dateParam || (availableDates.length > 0 ? availableDates[0] : undefined);

  // Fetch matches for the active date
  const matches = await getPublicMatches({ date: activeDate });

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center md:text-left">
        <h1 className="font-heading text-4xl font-black tracking-tight text-neutral-900 uppercase md:text-5xl dark:text-white">
          Jadwal{' '}
          <span className="text-[var(--color-primary)]">Pertandingan</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-600 dark:text-neutral-400">
          Pantau waktu tanding, pembagian grup, dan map yang akan dimainkan.
        </p>
      </div>

      {availableDates.length > 0 ? (
        <>
          <DateFilter availableDates={availableDates} />

          {matches.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {matches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          ) : (
            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/20">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200/50 text-4xl dark:bg-neutral-800/50">
                <CalendarX className="h-10 w-10 text-neutral-400" />
              </div>
              <h3 className="font-heading mt-6 text-xl font-bold text-neutral-900 dark:text-white">
                Tidak ada pertandingan
              </h3>
              <p className="mt-2 text-neutral-500 dark:text-neutral-400">
                Belum ada jadwal pertandingan yang dijadwalkan untuk tanggal
                ini.
              </p>
            </div>
          )}
        </>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-300 bg-neutral-50/50 p-12 text-center dark:border-neutral-800 dark:bg-neutral-900/20">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-200/50 text-4xl dark:bg-neutral-800/50">
            ⏳
          </div>
          <h3 className="font-heading mt-6 text-xl font-bold text-neutral-900 dark:text-white">
            Jadwal Belum Tersedia
          </h3>
          <p className="mt-2 text-neutral-500 dark:text-neutral-400">
            Panitia sedang menyusun jadwal turnamen. Silakan kembali lagi nanti.
          </p>
        </div>
      )}
    </div>
  );
}
