// API Request and Response interfaces

// Standarisasi Response Format (Sukses / Error)
export interface ApiResponse<T = unknown> {
  message?: string;
  data?: T;
  error?: string;
  details?: unknown;
}

// Request Payload untuk Admin: Skor
export interface UpdateMatchScoresRequest {
  scores: Array<{
    teamId: string;
    finishPosition: number;
    kills: number;
  }>;
}

export interface UpdateMatchScoresResponse extends ApiResponse {
  count?: number;
}

// Request Payload untuk Admin: Settings
export interface UpdateSettingsRequest {
  settings: Record<string, string>;
}

// Request Payload untuk Admin: Scoring Rules
export interface UpdateScoringRulesRequest {
  rules: Array<{
    rank: number;
    placementPoints: number;
  }>;
}
