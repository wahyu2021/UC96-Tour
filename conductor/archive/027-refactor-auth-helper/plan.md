# Implementation Plan: 027-refactor-auth-helper

## Phase 1: Setup & Database Schema
- [x] Task: Not applicable for this track. Skip.
- [x] Task: Conductor - User Manual Verification 'Setup & Database Schema' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend
- [x] Task: Create `src/lib/api-middleware.ts` containing the `withAdminRoute` and `withAuthRoute` HOFs.
- [x] Task: Refactor all files inside `src/app/api/admin/` to use `withAdminRoute`.
- [x] Task: Refactor files inside `src/app/api/player/` and other protected endpoints to use `withAuthRoute`.
- [x] Task: Conductor - User Manual Verification 'Pengembangan API / Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend
- [x] Task: Not applicable for this track. Skip.
- [x] Task: Conductor - User Manual Verification 'Pengembangan UI / Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi
- [x] Task: Run `npx tsc --noEmit` to verify type safety of the new HOFs across all API routes.
- [x] Task: Run existing Vitest API test suite (`npm run test`) to ensure no behavioral changes.
- [x] Task: Conductor - User Manual Verification 'Automated Testing & Validasi' (Protocol in workflow.md)
