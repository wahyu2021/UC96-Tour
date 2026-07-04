# Implementation Plan: 026-image-optimization

## Phase 1: Setup & Configuration
- [x] Task: Update `next.config.ts` to include `remotePatterns` configuration for wildcard images (`*`).
- [x] Task: Conductor - User Manual Verification 'Setup & Configuration' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend
- [x] Task: Not applicable for this track. Skip.
- [x] Task: Conductor - User Manual Verification 'Pengembangan API / Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend
- [x] Task: Identify all files containing `<img>` tags.
- [x] Task: Refactor image tags in `src/app/admin/page.tsx` and `src/app/teams/[id]/page.tsx` to `<Image />`.
- [x] Task: Refactor image tags in `src/app/tournaments/[id]/page.tsx` and `src/app/tournaments/page.tsx` to `<Image />`.
- [x] Task: Refactor image tags in `src/components/features/admin/TeamTableClient.tsx` and `src/components/features/admin/TournamentTableClient.tsx`.
- [x] Task: Refactor image tags in `src/components/features/home/FeaturedTournaments.tsx`, `HeroSection.tsx`, and `MiniLeaderboard.tsx`.
- [x] Task: Refactor image tags in `src/components/features/player/PlayerDashboard.tsx`, `src/components/features/public/LeaderboardTable.tsx`, and `src/components/features/teams/TeamCard.tsx`.
- [x] Task: Conductor - User Manual Verification 'Pengembangan UI / Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi
- [x] Task: Update any impacted unit tests that assert against `<img>` tags (if applicable).
- [x] Task: Run `npm run test` and `npx tsc --noEmit` to ensure everything compiles and passes.
- [x] Task: Conductor - User Manual Verification 'Automated Testing & Validasi' (Protocol in workflow.md)
