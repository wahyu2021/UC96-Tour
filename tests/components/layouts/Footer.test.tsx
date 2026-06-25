import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Footer } from '@/components/layouts/Footer';

describe('Footer', () => {
  it('renders copyright and links', () => {
    render(<Footer />);
    expect(screen.getByText(/All rights reserved/i)).toBeInTheDocument();
    expect(screen.getByText('Tentang')).toBeInTheDocument();
  });
});
