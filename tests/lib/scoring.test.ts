import { describe, it, expect } from 'vitest';
import { getPlacementPoints, calculateTotalPoints } from '@/lib/scoring';

describe('Scoring Logic', () => {
  it('returns correct placement points', () => {
    expect(getPlacementPoints(1)).toBe(10);
    expect(getPlacementPoints(2)).toBe(6);
    expect(getPlacementPoints(8)).toBe(1);
    expect(getPlacementPoints(10)).toBe(0);
  });

  it('calculates total points correctly', () => {
    expect(calculateTotalPoints(1, 5)).toBe(15); // 10 placement + 5 kills
    expect(calculateTotalPoints(10, 2)).toBe(2); // 0 placement + 2 kills
  });
});
