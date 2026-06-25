'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Users,
  Trophy,
  Gamepad2,
  ArrowLeft,
  ChevronLeft,
  Menu,
  CalendarDays,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LogoutButton } from '@/components/features/auth/LogoutButton';

interface AdminSidebarProps {
  userName?: string | null;
}

export function AdminSidebar({ userName }: AdminSidebarProps) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <aside
      className={cn(
        'relative shrink-0 border-r border-neutral-200 bg-white transition-all duration-300 dark:border-neutral-800 dark:bg-[#121212]',
        isCollapsed ? 'w-20' : 'w-full md:w-72'
      )}
    >
      <div className={cn('flex h-full flex-col', isCollapsed ? 'p-4' : 'p-6')}>
        {/* Header & Toggle */}
        <div className="mb-10 flex min-h-[40px] items-center justify-between">
          {!isCollapsed && (
            <div className="overflow-hidden">
              <h2 className="font-heading text-xl font-black tracking-widest whitespace-nowrap text-neutral-900 uppercase dark:text-white">
                Admin Panel
              </h2>
              <p className="mt-1 overflow-hidden text-sm text-ellipsis whitespace-nowrap text-neutral-500">
                Halo,{' '}
                <span className="font-bold text-[var(--color-primary)]">
                  {userName}
                </span>
              </p>
            </div>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto flex-shrink-0 rounded-md p-2 text-neutral-500 hover:bg-neutral-100 dark:text-neutral-400 dark:hover:bg-neutral-800"
            title={isCollapsed ? 'Perluas Sidebar' : 'Perkecil Sidebar'}
          >
            {isCollapsed ? (
              <Menu className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col gap-6">
          {/* Grup Manajemen */}
          <div className="flex flex-col gap-2">
            {!isCollapsed && (
              <span className="px-4 text-xs font-black tracking-widest whitespace-nowrap text-neutral-400 uppercase dark:text-neutral-500">
                Manajemen
              </span>
            )}
            <Link
              href="/admin"
              title="Manajemen Tim"
              className={cn(
                'flex items-center gap-3 rounded-lg py-3 text-sm font-semibold transition-colors',
                isCollapsed ? 'justify-center px-0' : 'px-4',
                pathname === '/admin'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-red-500/20'
                  : 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white'
              )}
            >
              <Users className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="whitespace-nowrap">Manajemen Tim</span>
              )}
            </Link>
            <Link
              href="/admin/tournaments"
              title="Manajemen Turnamen"
              className={cn(
                'flex items-center gap-3 rounded-lg py-3 text-sm font-semibold transition-colors',
                isCollapsed ? 'justify-center px-0' : 'px-4',
                pathname === '/admin/tournaments'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-red-500/20'
                  : 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white'
              )}
            >
              <Trophy className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="whitespace-nowrap">Manajemen Turnamen</span>
              )}
            </Link>
          </div>

          {/* Grup Operasional */}
          <div className="flex flex-col gap-2">
            {!isCollapsed && (
              <span className="px-4 text-xs font-black tracking-widest whitespace-nowrap text-neutral-400 uppercase dark:text-neutral-500">
                Operasional
              </span>
            )}
            <Link
              href="/admin/matches"
              title="Jadwal Pertandingan"
              className={cn(
                'flex items-center gap-3 rounded-lg py-3 text-sm font-semibold transition-colors',
                isCollapsed ? 'justify-center px-0' : 'px-4',
                pathname === '/admin/matches'
                  ? 'bg-[var(--color-primary)] text-white shadow-md shadow-red-500/20'
                  : 'bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white'
              )}
            >
              <CalendarDays className="h-5 w-5 shrink-0" />
              {!isCollapsed && (
                <span className="whitespace-nowrap">Jadwal & Status</span>
              )}
            </Link>
          </div>

          <div className="my-2 border-t border-neutral-200 dark:border-neutral-800"></div>

          <Link
            href="/"
            title="Ke Website Publik"
            className={cn(
              'flex items-center gap-3 rounded-lg py-3 text-sm font-semibold text-neutral-600 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800/50 dark:hover:text-white',
              isCollapsed ? 'justify-center px-0' : 'px-4'
            )}
          >
            <ArrowLeft className="h-5 w-5 shrink-0" />
            {!isCollapsed && (
              <span className="whitespace-nowrap">Ke Website Publik</span>
            )}
          </Link>
        </nav>

        {/* Footer Area */}
        <div
          className={cn(
            'mt-6 flex border-t border-neutral-200 pt-6 dark:border-neutral-800',
            isCollapsed ? 'justify-center' : 'justify-start'
          )}
        >
          <LogoutButton isCollapsed={isCollapsed} />
        </div>
      </div>
    </aside>
  );
}
