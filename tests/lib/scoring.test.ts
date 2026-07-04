import { describe, it, expect } from 'vitest';
import {
  getPlacementPoints,
  calculateTotalPoints,
} from '@/lib/scoring';

describe('Scoring Logic', () => {
  it('returns correct placement points with default rules', () => {
    expect(getPlacementPoints(1)).toBe(10);
    expect(getPlacementPoints(2)).toBe(6);
    expect(getPlacementPoints(8)).toBe(1);
    expect(getPlacementPoints(10)).toBe(0);
  });

  it('calculates total points correctly with default rules', () => {
    expect(calculateTotalPoints(1, 5)).toBe(15); // 10 placement + 5 kills
    expect(calculateTotalPoints(10, 2)).toBe(2); // 0 placement + 2 kills
  });

  it('calculates points correctly with custom dynamic rules', () => {
    const customRules = [
      { rank: 1, placementPoints: 20 },
      { rank: 2, placementPoints: 10 },
    ];
    expect(getPlacementPoints(1, customRules)).toBe(20);
    expect(calculateTotalPoints(2, 3, customRules)).toBe(13); // 10 placement + 3 kills
    expect(getPlacementPoints(3, customRules)).toBe(0); // Undefined rank gets 0
  });
});
