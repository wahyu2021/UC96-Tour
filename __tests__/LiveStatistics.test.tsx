import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { LiveStatistics } from '../src/components/features/home/LiveStatistics';

describe('LiveStatistics Component', () => {
  const mockStats = {
    tournamentsCount: 5,
    teamsCount: 120,
    playersCount: 480,
  };

  it('renders correctly with given stats', () => {
    render(<LiveStatistics stats={mockStats} />);

    // Check if titles are rendered
    expect(screen.getByText('Turnamen Digelar')).toBeDefined();
    expect(screen.getByText('Tim Terdaftar')).toBeDefined();
    expect(screen.getByText('Pemain Aktif')).toBeDefined();

    // Check if values are rendered (numbers are typically rendered as text)
    expect(screen.getByText('5')).toBeDefined();
    expect(screen.getByText('120')).toBeDefined();
    expect(screen.getByText('480')).toBeDefined();
  });
});
