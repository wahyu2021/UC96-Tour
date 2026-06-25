import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Navbar } from '@/components/layouts/Navbar';

// Mock ThemeToggle so it doesn't complain about next-themes in this test
vi.mock('@/components/ui/ThemeToggle', () => ({
  ThemeToggle: () => <button data-testid="theme-toggle">Theme</button>,
}));

describe('Navbar', () => {
  it('renders logo and desktop links', () => {
    render(<Navbar />);
    expect(screen.getByText('UC96')).toBeInTheDocument();
    expect(screen.getByText('Beranda')).toBeInTheDocument();
    expect(screen.getByText('Pendaftaran')).toBeInTheDocument();
  });

  it('toggles mobile menu', () => {
    render(<Navbar />);
    const menuBtn = screen.getByRole('button', { name: /toggle menu/i });

    // Initially hidden (only 1 Beranda link visible for desktop)
    const linksBefore = screen.getAllByText('Beranda');
    expect(linksBefore).toHaveLength(1);

    fireEvent.click(menuBtn);

    // After click, mobile menu shows up, so we should have 2 Beranda links
    const linksAfter = screen.getAllByText('Beranda');
    expect(linksAfter).toHaveLength(2);
  });
});
