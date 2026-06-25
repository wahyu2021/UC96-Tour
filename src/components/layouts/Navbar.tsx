'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tim', href: '/teams' },
  { name: 'Jadwal', href: '/schedule' },
  { name: 'Papan Peringkat', href: '/leaderboard' },
  { name: 'Pendaftaran', href: '/register' },
];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  if (
    pathname &&
    (pathname.startsWith('/admin') || pathname.startsWith('/login'))
  )
    return null;

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path: string) => {
    if (!pathname) return false;
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-neutral-200/50 bg-white/70 backdrop-blur-md dark:border-neutral-800/50 dark:bg-[#121212]/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-heading text-xl font-bold tracking-tight text-[var(--color-primary)]">
              UC96
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[var(--color-primary)]',
                isActive(link.href)
                  ? 'font-bold text-[var(--color-primary)] dark:text-[var(--color-primary)]'
                  : 'text-neutral-600 dark:text-neutral-300 dark:hover:text-[var(--color-primary)]'
              )}
            >
              {link.name}
            </Link>
          ))}
          <div className="ml-4 flex items-center border-l border-neutral-200 pl-4 dark:border-neutral-800">
            {/* <ThemeToggle /> */}
          </div>
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* <ThemeToggle /> */}
          <button
            onClick={toggleMenu}
            className="inline-flex items-center justify-center rounded-md p-2 text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
            aria-expanded={isOpen}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="border-t border-neutral-200 bg-white md:hidden dark:border-neutral-800 dark:bg-[#121212]">
          <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'block rounded-md px-3 py-2 text-base font-medium transition-colors hover:text-[var(--color-primary)]',
                  isActive(link.href)
                    ? 'bg-neutral-100 font-bold text-[var(--color-primary)] dark:bg-neutral-800 dark:text-[var(--color-primary)]'
                    : 'text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-[var(--color-primary)]'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
