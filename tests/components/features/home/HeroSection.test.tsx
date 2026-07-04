import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '@/components/features/home/HeroSection';

describe('HeroSection', () => {
  it('renders heading, description, and action buttons', () => {
    render(<HeroSection />);

    expect(screen.getByText(/Medan Laga/i)).toBeInTheDocument();

    expect(screen.getByText(/Unit Combat 96/i)).toBeInTheDocument();

    const dashboardLink = screen.getByRole('link', { name: /Dasbor Kapten/i });
    expect(dashboardLink).toBeInTheDocument();
    expect(dashboardLink).toHaveAttribute('href', '/player');

    const leaderboardLink = screen.getByRole('link', {
      name: /Lihat Turnamen/i,
    });
    expect(leaderboardLink).toBeInTheDocument();
    expect(leaderboardLink).toHaveAttribute('href', '/tournaments');
  });
});
