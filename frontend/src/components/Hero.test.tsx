import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from './sections/Hero';

describe('Hero', () => {
  it('renders without crashing', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it('displays hire me link', () => {
    render(<Hero />);
    const link = screen.getByRole('link', { name: /contrátame/i });
    expect(link).toBeInTheDocument();
  });
});
