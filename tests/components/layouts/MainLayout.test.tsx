import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MainLayout } from '@/components/layouts/MainLayout';

vi.mock('next-auth', () => ({
  getServerSession: vi.fn().mockResolvedValue(null),
}));

// Mock child components to isolate layout testing
vi.mock('@/components/layouts/Navbar', () => ({
  Navbar: () => <nav data-testid="mock-navbar">Navbar</nav>,
}));

vi.mock('@/components/layouts/Footer', () => ({
  Footer: () => <footer data-testid="mock-footer">Footer</footer>,
}));

describe('MainLayout', () => {
  it('renders children wrapped with navbar and footer', async () => {
    const layout = await MainLayout({
      children: <div data-testid="main-content">Content</div>,
    });

    render(layout);

    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
