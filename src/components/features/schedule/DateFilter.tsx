'use client';

import * as React from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Calendar } from 'lucide-react';
import { DateFilterProps } from '@/types';

export function DateFilter({ availableDates }: DateFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Ambil tanggal aktif dari URL, jika tidak ada gunakan yang pertama
  const activeDate =
    searchParams.get('date') ||
    (availableDates.length > 0 ? availableDates[0] : '');

  // Efek untuk menyetel parameter URL awal jika belum ada
  React.useEffect(() => {
    if (!searchParams.get('date') && availableDates.length > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('date', availableDates[0]);
      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [availableDates, pathname, router, searchParams]);

  const handleDateSelect = (dateStr: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('date', dateStr);
    router.push(`${pathname}?${params.toString()}`);
  };

  if (availableDates.length === 0) {
    return null;
  }

  return (
    <div className="scrollbar-hide mb-8 w-full overflow-x-auto pb-4">
      <div className="flex min-w-max items-center gap-2 rounded-xl border border-neutral-200 bg-white p-2 dark:border-neutral-800 dark:bg-[#121212]">
        <div className="flex items-center px-4 py-2 text-sm font-bold text-neutral-500 dark:text-neutral-400">
          <Calendar className="mr-2 h-4 w-4" />
          <span>Pilih Hari:</span>
        </div>

        <div className="mx-2 h-6 w-px bg-neutral-200 dark:bg-neutral-800"></div>

        {availableDates.map((dateStr) => {
          const isActive = activeDate === dateStr;
          const parsedDate = new Date(`${dateStr}T00:00:00Z`);

          // Format contoh: "Senin, 25 Jun"
          const formattedLabel = parsedDate.toLocaleDateString('id-ID', {
            weekday: 'long',
            day: 'numeric',
            month: 'short',
          });

          return (
            <button
              key={dateStr}
              onClick={() => handleDateSelect(dateStr)}
              className={cn(
                'relative rounded-lg px-4 py-2 text-sm font-bold transition-all',
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-md'
                  : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800'
              )}
            >
              {formattedLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
}
