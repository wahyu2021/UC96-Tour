import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Button } from '@/components/ui/Button';

describe('Button Component', () => {
  it('should render the button with provided text', () => {
    render(<Button>Daftar Sekarang</Button>);
    const buttonElement = screen.getByText(/Daftar Sekarang/i);
    expect(buttonElement).toBeInTheDocument();
  });
});
