import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '@/components/features/home/HeroSection';

describe('HeroSection', () => {
  it('renders heading, description, and action buttons', () => {
    render(<HeroSection />);

    expect(screen.getByText(/Medan Laga/i)).toBeInTheDocument();
    expect(screen.getByText(/Unit Combat 96/i)).toBeInTheDocument();

    const registerLink = screen.getByRole('link', { name: /Daftarkan Timmu/i });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');

    const leaderboardLink = screen.getByRole('link', {
      name: /Lihat Turnamen Aktif/i,
    });
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute('href', '/tournaments');
  });
});
