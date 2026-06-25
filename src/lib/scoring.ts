export function getPlacementPoints(rank: number): number {
  switch (rank) {
    case 1:
      return 10;
    case 2:
      return 6;
    case 3:
      return 5;
    case 4:
      return 4;
    case 5:
      return 3;
    case 6:
      return 2;
    case 7:
    case 8:
      return 1;
    default:
      return 0; // Rank 9-16+ gets 0 placement points
  }
}

export function calculateTotalPoints(rank: number, kills: number): number {
  return getPlacementPoints(rank) + kills;
}
