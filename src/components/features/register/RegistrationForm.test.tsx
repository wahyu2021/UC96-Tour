import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RegistrationForm } from './RegistrationForm';

// Mock Sonner Toast
vi.mock('sonner', () => ({
  toast: {
    loading: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe('RegistrationForm', () => {
  it('renders step 1 initially', () => {
    render(<RegistrationForm />);
    expect(screen.getByText('Identitas Tim')).toBeInTheDocument();
    expect(screen.getByText(/Nama Tim Lengkap/i)).toBeInTheDocument();
  });

  it('prevents next step if step 1 is invalid', async () => {
    render(<RegistrationForm />);
    const nextBtn = screen.getByRole('button', {
      name: /Lanjutkan ke Roster/i,
    });

    fireEvent.click(nextBtn);

    // Should show validation errors because inputs are empty
    expect(await screen.findByText(/Nama Tim minimal/i)).toBeInTheDocument();

    // Step 2 heading should not be rendered as the main title yet
    expect(screen.queryByText('Roster Pemain')).not.toBeInTheDocument();
  });
});
