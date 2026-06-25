import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MainLayout } from './MainLayout';

// Mock child components to isolate layout testing
vi.mock('./Navbar', () => ({
  Navbar: () => <nav data-testid="mock-navbar">Navbar</nav>,
}));

vi.mock('./Footer', () => ({
  Footer: () => <footer data-testid="mock-footer">Footer</footer>,
}));

describe('MainLayout', () => {
  it('renders children wrapped with navbar and footer', () => {
    render(
      <MainLayout>
        <div data-testid="main-content">Content</div>
      </MainLayout>
    );

    expect(screen.getByTestId('mock-navbar')).toBeInTheDocument();
    expect(screen.getByTestId('main-content')).toBeInTheDocument();
    expect(screen.getByTestId('mock-footer')).toBeInTheDocument();
  });
});
