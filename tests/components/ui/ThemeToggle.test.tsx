import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { useTheme } from 'next-themes';

// Mock next-themes
vi.mock('next-themes', () => ({
  useTheme: vi.fn(),
}));

describe('ThemeToggle', () => {
  it('renders correctly and toggles theme', () => {
    const setTheme = vi.fn();
    (useTheme as Mock).mockReturnValue({ theme: 'dark', setTheme });

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(setTheme).toHaveBeenCalledWith('light');
  });
});
