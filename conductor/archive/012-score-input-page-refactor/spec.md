# Specification: Score Input Page Refactor & Dynamic Scoring System

## 1. Overview

The current modal-based score input will be refactored into a dedicated full-page UI (`/admin/matches/[id]/scores`) that automatically fetches and lists all participating teams. Additionally, the currently hardcoded PUBG scoring system will be made fully dynamic, allowing admins to modify the point distribution via a dedicated configuration page.

## 2. Functional Requirements

- **Dedicated Score Input Page**:
  - The "Input Skor" button navigates to `/admin/matches/[id]/scores`.
  - Automatically fetches all approved teams in the tournament.
  - Displays a standard table (Team Name, Rank, Kills, Total Points).
  - Validation warning if any team's score is left blank.
  - Saves scores on "Simpan Semua" with auto-save capabilities.
  - The obsolete `ScoreInputModal.tsx` will be removed.
- **Dynamic Scoring Configuration**:
  - Update database schema to store scoring rules (e.g., `ScoringConfig` model mapping Rank to Placement Points).
  - Create a new Admin Page (`/admin/scoring-rules`) to view and modify the points for each placement rank.
  - Add a "Reset to PUBG Global Rules" button that restores the standard 10, 6, 5... point distribution.
  - Update the scoring logic (`src/lib/scoring.ts`) to fetch and use rules from the database.

## 3. Out of Scope

- Modifying the public leaderboard layout (it will automatically adapt to the dynamic points without needing UI changes).
