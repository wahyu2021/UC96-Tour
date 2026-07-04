import * as React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { MatchStatus } from '@prisma/client';
import { cn } from '@/lib/utils';
import { Match, MatchCardProps } from '@/types';

export function MatchCard({ match }: MatchCardProps) {
  const isOngoing = match.status === 'ONGOING';
  const isCompleted = match.status === 'COMPLETED';

  const dateObj = new Date(match.scheduledAt);
  // Format waktu: "19:00"
  const timeString = dateObj.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  });

  // Format tanggal lengkap
  const dateString = dateObj.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden rounded-xl border bg-white transition-all hover:shadow-lg dark:bg-[#121212]',
        isOngoing
          ? 'border-red-500/50 shadow-red-500/10 dark:border-red-500/30'
          : 'border-neutral-200 dark:border-neutral-800'
      )}
    >
      {/* Bagian Header / Status */}
      <div
        className={cn(
          'flex items-center justify-between border-b px-5 py-3',
          isOngoing
            ? 'border-red-100 bg-red-50 dark:border-red-900/30 dark:bg-red-900/10'
            : 'border-neutral-100 bg-neutral-50/50 dark:border-neutral-800/50 dark:bg-neutral-900/20'
        )}
      >
        <div className="flex items-center gap-2 text-sm font-bold text-neutral-500 dark:text-neutral-400">
          <Clock className="h-4 w-4" />
          <span>
            {dateString} • {timeString} WIB
          </span>
        </div>

        {/* Indikator Status */}
        {isOngoing ? (
          <div className="flex items-center gap-2 rounded-full border border-red-200 bg-red-100 px-3 py-1 shadow-sm dark:border-red-800 dark:bg-red-900/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-600"></span>
            </span>
            <span className="text-xs font-black tracking-widest text-red-700 uppercase dark:text-red-400">
              Live
            </span>
          </div>
        ) : isCompleted ? (
          <Badge
            variant="outline"
            className="text-neutral-500 dark:text-neutral-400"
          >
            Selesai
          </Badge>
        ) : (
          <Badge variant="default" className="bg-[var(--color-primary)]">
            Akan Datang
          </Badge>
        )}
      </div>

      {/* Bagian Info Utama */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h3 className="font-heading text-2xl font-black tracking-tight text-neutral-900 uppercase dark:text-white">
              {match.map}
            </h3>

            <div className="mt-2 flex flex-wrap gap-3">
              {match.group && match.group.trim() !== '' && (
                <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                  <Users className="h-4 w-4 text-[var(--color-primary)]" />
                  <span>{match.group}</span>
                </div>
              )}
              <div className="flex items-center gap-1.5 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
                <MapPin className="h-4 w-4 text-emerald-500" />
                <span>Map {match.map}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
