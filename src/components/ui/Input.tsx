import * as React from 'react';
import { cn } from '@/lib/utils';
import { InputProps } from '@/types';

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-md border px-3 py-2 text-sm transition-colors outline-none',
            'border-neutral-300 bg-white text-neutral-900',
            'dark:border-neutral-700 dark:bg-[#121212] dark:text-white',
            'focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error &&
              'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500 dark:focus:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500">{error}</p>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';
