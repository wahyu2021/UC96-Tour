'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  Trophy,
  Shield,
  CalendarDays,
  BarChart3,
  Edit3,
  LayoutDashboard,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const MAIN_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang', href: '/about' },
  { name: 'Aturan', href: '/rules' },
  { name: 'Kontak', href: '/contact' },
];

const DROPDOWN_LINKS = [
  {
    name: 'Daftar Turnamen',
    href: '/tournaments',
    icon: Trophy,
    desc: 'Jelajahi turnamen dan detail',
  },
  {
    name: 'Daftar Tim',
    href: '/teams',
    icon: Shield,
    desc: 'Lihat profil dan roster pemain',
  },
  {
    name: 'Jadwal Pertandingan',
    href: '/schedule',
    icon: CalendarDays,
    desc: 'Pantau jadwal laga terbaru',
  },
  {
    name: 'Papan Peringkat',
    href: '/leaderboard',
    icon: BarChart3,
    desc: 'Klasemen dan statistik tim',
  },
];

export function Navbar({
  isAdmin,
  isPlayer,
}: {
  isAdmin?: boolean;
  isPlayer?: boolean;
}) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = React.useState(true); // Terbuka secara default di mobile

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

  const isDropdownActive = () => {
    return DROPDOWN_LINKS.some((link) => isActive(link.href));
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
        <div className="hidden md:flex md:items-center md:gap-8">
          {/* Main Links */}
          {MAIN_LINKS.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-[var(--color-primary)]',
                isActive(link.href)
                  ? 'font-bold text-[var(--color-primary)]'
                  : 'text-neutral-600 dark:text-neutral-300'
              )}
            >
              {link.name}
            </Link>
          ))}

          {/* Admin Dashboard Link (Desktop) */}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors hover:text-[var(--color-primary)]',
                isActive('/admin')
                  ? 'font-bold text-[var(--color-primary)]'
                  : 'text-neutral-600 dark:text-neutral-300'
              )}
            >
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}

          {/* Dropdown Menu (Desktop) */}
          <div className="group relative">
            <button
              className={cn(
                'flex items-center gap-1 py-4 text-sm font-medium transition-colors group-hover:text-[var(--color-primary)]',
                isDropdownActive()
                  ? 'font-bold text-[var(--color-primary)]'
                  : 'text-neutral-600 dark:text-neutral-300'
              )}
            >
              Kompetisi
              <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-180" />
            </button>

            <div className="absolute top-[calc(100%-8px)] left-1/2 hidden w-[580px] -translate-x-1/2 pt-2 group-hover:block">
              {/* Invisible bridge for hover continuity */}
              <div className="absolute -top-4 left-0 h-4 w-full bg-transparent" />

              <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white p-3 shadow-2xl dark:border-neutral-800 dark:bg-[#1a1a1a]">
                <div className="grid grid-cols-2 gap-2">
                  {DROPDOWN_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="flex items-start gap-4 rounded-xl p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-[#242424]"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <link.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <div
                          className={cn(
                            'text-sm font-bold',
                            isActive(link.href)
                              ? 'text-[var(--color-primary)]'
                              : 'text-neutral-900 dark:text-white'
                          )}
                        >
                          {link.name}
                        </div>
                        <div className="text-xs text-neutral-500 dark:text-neutral-400">
                          {link.desc}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Actions (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-3">
          {isPlayer ? (
            <>
              <Link
                href="/player"
                className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--color-primary-hover)] hover:shadow-lg"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dasbor Kapten
              </Link>
            </>
          ) : isAdmin ? (
            <>
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--color-primary-hover)] hover:shadow-lg"
              >
                <LayoutDashboard className="h-4 w-4" />
                Panel Admin
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="flex items-center gap-2 rounded-full border border-neutral-200 bg-transparent px-5 py-2 text-sm font-bold text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2 text-sm font-bold text-white transition-transform hover:scale-105 hover:bg-[var(--color-primary-hover)] hover:shadow-lg"
              >
                <Edit3 className="h-4 w-4" />
                Daftar Tim
              </Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-4 md:hidden">
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
          <div className="space-y-2 px-4 pt-4 pb-6">
            {MAIN_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'block rounded-lg px-4 py-3 text-base font-medium transition-colors hover:text-[var(--color-primary)]',
                  isActive(link.href)
                    ? 'bg-neutral-50 font-bold text-[var(--color-primary)] dark:bg-neutral-900 dark:text-[var(--color-primary)]'
                    : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-[var(--color-primary)]'
                )}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Admin Dashboard Link (Mobile) */}
            {isAdmin && (
              <Link
                href="/admin/dashboard"
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium transition-colors hover:text-[var(--color-primary)]',
                  isActive('/admin')
                    ? 'bg-neutral-50 font-bold text-[var(--color-primary)] dark:bg-neutral-900 dark:text-[var(--color-primary)]'
                    : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-[var(--color-primary)]'
                )}
                onClick={() => setIsOpen(false)}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard Admin
              </Link>
            )}

            {/* Mobile Dropdown Group */}
            <div className="mt-4">
              <button
                onClick={() => setIsMobileDropdownOpen(!isMobileDropdownOpen)}
                className="flex w-full items-center justify-between rounded-lg px-4 py-3 text-base font-bold text-neutral-900 dark:text-white"
              >
                Kompetisi
                <ChevronDown
                  className={cn(
                    'h-5 w-5 transition-transform',
                    isMobileDropdownOpen ? 'rotate-180' : ''
                  )}
                />
              </button>

              {isMobileDropdownOpen && (
                <div className="mt-2 grid grid-cols-1 gap-2 pl-4">
                  {DROPDOWN_LINKS.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-4 py-3 transition-colors',
                        isActive(link.href)
                          ? 'bg-neutral-50 text-[var(--color-primary)] dark:bg-neutral-900'
                          : 'text-neutral-600 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-900'
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <link.icon
                        className={cn(
                          'h-5 w-5',
                          isActive(link.href)
                            ? 'text-[var(--color-primary)]'
                            : ''
                        )}
                      />
                      <span
                        className={
                          isActive(link.href) ? 'font-bold' : 'font-medium'
                        }
                      >
                        {link.name}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-6 space-y-3 border-t border-neutral-100 pt-6 dark:border-neutral-800">
              {isPlayer ? (
                <Link
                  href="/player"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Dasbor Kapten
                </Link>
              ) : isAdmin ? (
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                >
                  <LayoutDashboard className="h-5 w-5" />
                  Panel Admin
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-transparent px-4 py-3 text-base font-bold text-neutral-700 transition-colors hover:bg-neutral-50 hover:text-neutral-900 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-base font-bold text-white transition-opacity hover:opacity-90"
                  >
                    <Edit3 className="h-5 w-5" />
                    Pendaftaran Tim
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
