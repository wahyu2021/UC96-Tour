import { ScoringRule } from '@/types';

export const DEFAULT_RULES: ScoringRule[] = [
  { rank: 1, placementPoints: 10 },
  { rank: 2, placementPoints: 6 },
  { rank: 3, placementPoints: 5 },
  { rank: 4, placementPoints: 4 },
  { rank: 5, placementPoints: 3 },
  { rank: 6, placementPoints: 2 },
  { rank: 7, placementPoints: 1 },
  { rank: 8, placementPoints: 1 },
];

export function getPlacementPoints(
  rank: number,
  rules: ScoringRule[] = DEFAULT_RULES
): number {
  const rule = rules.find((r) => r.rank === rank);
  return rule ? rule.placementPoints : 0; // Rank without specific rule gets 0
}

export function calculateTotalPoints(
  rank: number,
  kills: number,
  rules: ScoringRule[] = DEFAULT_RULES
): number {
  return getPlacementPoints(rank, rules) + kills;
}
