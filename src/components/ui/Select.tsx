import * as React from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}

export const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ options, value, onChange, placeholder = 'Pilih opsi...', error, className }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const containerRef = React.useRef<HTMLDivElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);

    // Click outside handler
    React.useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener('mousedown', handleOutsideClick);
      return () => document.removeEventListener('mousedown', handleOutsideClick);
    }, []);

    return (
      <div 
        ref={(node) => {
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
          // @ts-ignore - internal ref binding
          containerRef.current = node;
        }} 
        className={cn("relative w-full", className)}
      >
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            'flex w-full items-center justify-between rounded-md border px-4 py-2.5 text-sm transition-colors',
            'border-neutral-300 bg-white text-neutral-900',
            'dark:border-neutral-700 dark:bg-[#121212] dark:text-white',
            'focus:outline-none focus:ring-1 focus:border-[var(--color-primary)] focus:ring-[var(--color-primary)]',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500 dark:focus:border-red-500',
            isOpen && 'border-[var(--color-primary)] ring-1 ring-[var(--color-primary)]'
          )}
        >
          <span className={cn('block truncate', !selectedOption && 'text-neutral-500 dark:text-neutral-400')}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          <ChevronDown className={cn('h-4 w-4 text-neutral-500 transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>

        {isOpen && (
          <div className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-md border border-neutral-200 bg-white py-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 dark:border-neutral-800 dark:bg-[#1e1e1e]">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={cn(
                  'flex w-full items-center px-4 py-2.5 text-sm text-left transition-colors',
                  'text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800',
                  option.value === value && 'bg-neutral-50 font-bold text-[var(--color-primary)] dark:bg-neutral-800/50 dark:text-[var(--color-primary)]'
                )}
              >
                {option.label}
              </button>
            ))}
            {options.length === 0 && (
              <div className="px-4 py-3 text-sm text-center text-neutral-500 dark:text-neutral-400">
                Tidak ada opsi tersedia
              </div>
            )}
          </div>
        )}
        
        {error && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {error}
          </p>
        )}
      </div>
    );
  }
);
Select.displayName = 'Select';
