'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  if (pathname.startsWith('/admin')) return null;

  return (
    <footer className="border-t border-neutral-200 bg-white py-8 dark:border-neutral-800 dark:bg-[#121212]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-primary)]">
              UC96 Tournament
            </span>
            <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
              Platform turnamen e-sports profesional Unit Combat 96.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4 md:items-end">
            <div className="flex gap-4 text-sm text-neutral-500 dark:text-neutral-400">
              <Link
                href="/about"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Tentang
              </Link>
              <Link
                href="/rules"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Aturan
              </Link>
              <Link
                href="/contact"
                className="transition-colors hover:text-[var(--color-primary)]"
              >
                Kontak
              </Link>
            </div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              &copy; {new Date().getFullYear()} Unit Combat 96. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
