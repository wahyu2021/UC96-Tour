import * as React from 'react';
import { Badge } from '@/components/ui/Badge';
import { Users, Crown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { TeamCardProps } from '@/types';

export function TeamCard({ team }: TeamCardProps) {
  // Ambil inisial tim untuk avatar fallback
  const initials = team.name.substring(0, 2).toUpperCase();

  return (
    <Link href={`/teams/${team.id}`} className="block h-full outline-none">
      <div className="focus:ring-brand-500 flex h-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-all hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:ring-offset-2 dark:border-neutral-800 dark:bg-[#121212] dark:focus:ring-offset-[#0a0a0a]">
        {/* Bagian Header Card */}
        <div className="flex items-start gap-4 p-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-neutral-100 text-xl font-black text-neutral-400 dark:bg-neutral-800 dark:text-neutral-500">
            {team.logo ? (
              <Image
                src={team.logo}
                alt={`Logo ${team.name}`}
                width={64}
                height={64}
                className="h-full w-full rounded-xl object-cover"
              />
            ) : (
              initials
            )}
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-heading truncate text-lg font-bold text-neutral-900 dark:text-white">
                  {team.name}
                </h3>
                <p className="font-bold text-[var(--color-primary)]">
                  [{team.tag}]
                </p>
              </div>
            </div>
            {team.tournament && (
              <div className="mt-2 inline-block">
                <Badge variant="default" className="text-[10px] uppercase">
                  {team.tournament.name}
                </Badge>
              </div>
            )}
          </div>
        </div>

        {/* Bagian Roster / Pemain */}
        <div className="flex flex-1 flex-col border-t border-neutral-100 bg-neutral-50/50 p-5 dark:border-neutral-800/50 dark:bg-neutral-900/20">
          <div className="mb-3 flex items-center gap-2 text-xs font-bold tracking-widest text-neutral-500 uppercase dark:text-neutral-400">
            <Users className="h-4 w-4" />
            <span>Roster Tim</span>
          </div>
          <ul className="flex flex-col gap-2">
            {team.players.map((player) => (
              <li
                key={player.id}
                className="flex items-center justify-between rounded-md bg-white px-3 py-2 text-sm shadow-sm dark:bg-[#0a0a0a]"
              >
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="truncate font-semibold text-neutral-700 dark:text-neutral-300">
                    {player.ign}
                  </span>
                  {player.isCaptain && (
                    <Crown className="h-3.5 w-3.5 shrink-0 text-yellow-500" />
                  )}
                </div>
                <span className="shrink-0 text-xs text-neutral-400 dark:text-neutral-500">
                  ID: {player.inGameId}
                </span>
              </li>
            ))}
            {team.players.length === 0 && (
              <li className="text-sm text-neutral-400 italic">
                Belum ada pemain.
              </li>
            )}
          </ul>
        </div>
      </div>
    </Link>
  );
}
