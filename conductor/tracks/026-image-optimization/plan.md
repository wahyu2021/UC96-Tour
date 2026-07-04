# Implementation Plan: 026-image-optimization

## Phase 1: Setup & Configuration
- [ ] Task: Update `next.config.ts` to include `remotePatterns` configuration for wildcard images (`*`).
- [ ] Task: Conductor - User Manual Verification 'Setup & Configuration' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend
- [ ] Task: Not applicable for this track. Skip.
- [ ] Task: Conductor - User Manual Verification 'Pengembangan API / Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend
- [ ] Task: Identify all files containing `<img>` tags.
- [ ] Task: Refactor image tags in `src/app/admin/page.tsx` and `src/app/teams/[id]/page.tsx` to `<Image />`.
- [ ] Task: Refactor image tags in `src/app/tournaments/[id]/page.tsx` and `src/app/tournaments/page.tsx` to `<Image />`.
- [ ] Task: Refactor image tags in `src/components/features/admin/TeamTableClient.tsx` and `src/components/features/admin/TournamentTableClient.tsx`.
- [ ] Task: Refactor image tags in `src/components/features/home/FeaturedTournaments.tsx`, `HeroSection.tsx`, and `MiniLeaderboard.tsx`.
- [ ] Task: Refactor image tags in `src/components/features/player/PlayerDashboard.tsx`, `src/components/features/public/LeaderboardTable.tsx`, and `src/components/features/teams/TeamCard.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Pengembangan UI / Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi
- [ ] Task: Update any impacted unit tests that assert against `<img>` tags (if applicable).
- [ ] Task: Run `npm run test` and `npx tsc --noEmit` to ensure everything compiles and passes.
- [ ] Task: Conductor - User Manual Verification 'Automated Testing & Validasi' (Protocol in workflow.md)
