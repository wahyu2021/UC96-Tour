# Implementation Plan: One-Click Tournament Join

## Phase 1: Setup & Database Schema

- [ ] Task: Update `prisma/schema.prisma` to change 1-N relation to N-N by creating a `TournamentRegistration` model mapping `Team` and `Tournament`.
- [ ] Task: Generate and apply Prisma migrations.
- [ ] Task: Conductor - User Manual Verification 'Setup & Database Schema' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend

- [ ] Task: Create new POST API endpoint `/api/player/tournaments/join` for Captains to register their team.
- [ ] Task: Implement validation logic in the API to ensure the team has a logo and 4 players.
- [ ] Task: Update existing admin APIs (e.g., getting tournament teams) to use the new `TournamentRegistration` relation instead of `team.tournamentId`.
- [ ] Task: Conductor - User Manual Verification 'Pengembangan API / Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend

- [ ] Task: Remove the existing public registration form (`/register`).
- [ ] Task: Update the "Daftar" button on the public tournament details page to show a Modal for Unregistered users (redirecting to login).
- [ ] Task: Implement the "Quick Join" confirmation Modal for logged-in Captains.
- [ ] Task: Add API call from the Quick Join Modal to the new `/api/player/tournaments/join` endpoint.
- [ ] Task: Conductor - User Manual Verification 'Pengembangan UI / Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi

- [ ] Task: Write automated tests for the new `join` API endpoint.
- [ ] Task: Write automated tests for the "Quick Join" and "Unregistered User" modals.
- [ ] Task: Run `npm run test` and verify all tests pass.
- [ ] Task: Conductor - User Manual Verification 'Automated Testing & Validasi' (Protocol in workflow.md)
