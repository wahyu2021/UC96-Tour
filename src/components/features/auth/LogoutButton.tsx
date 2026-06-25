'use client';

import { signOut } from 'next-auth/react';
import { cn } from '@/lib/utils';

interface LogoutButtonProps {
  isCollapsed?: boolean;
}

export function LogoutButton({ isCollapsed }: LogoutButtonProps) {
  return (
    <button
      onClick={() => signOut({ callbackUrl: '/login' })}
      title="Keluar"
      className={cn(
        'flex w-full items-center gap-3 rounded-lg bg-red-500/10 py-2.5 text-left text-sm font-semibold text-red-600 transition-colors hover:bg-red-500/20 dark:bg-red-500/5 dark:text-red-400 dark:hover:bg-red-500/10',
        isCollapsed ? 'justify-center px-0' : 'px-4'
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="shrink-0"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
        <polyline points="16 17 21 12 16 7"></polyline>
        <line x1="21" y1="12" x2="9" y2="12"></line>
      </svg>
      {!isCollapsed && <span>Keluar (Logout)</span>}
    </button>
  );
}
