'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      {/* Prev Button */}
      {currentPage > 1 ? (
        <Link
          href={createPageUrl(currentPage - 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#121212] dark:hover:bg-neutral-800"
        >
          <ChevronLeft className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-700">
          <ChevronLeft className="h-5 w-5" />
        </div>
      )}

      {/* Page Info */}
      <div className="flex h-10 items-center justify-center px-4 text-sm font-semibold text-neutral-600 dark:text-neutral-400">
        Halaman {currentPage} dari {totalPages}
      </div>

      {/* Next Button */}
      {currentPage < totalPages ? (
        <Link
          href={createPageUrl(currentPage + 1)}
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white text-neutral-500 transition-colors hover:bg-neutral-100 dark:border-neutral-800 dark:bg-[#121212] dark:hover:bg-neutral-800"
        >
          <ChevronRight className="h-5 w-5" />
        </Link>
      ) : (
        <div className="flex h-10 w-10 cursor-not-allowed items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 text-neutral-300 dark:border-neutral-800 dark:bg-neutral-900/50 dark:text-neutral-700">
          <ChevronRight className="h-5 w-5" />
        </div>
      )}
    </div>
  );
}
