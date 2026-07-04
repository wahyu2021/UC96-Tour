# Implementation Plan: 028-seo-optimization

## Phase 1: Setup & Configuration
- [x] Task: Create `src/app/robots.ts`.
- [x] Task: Conductor - User Manual Verification 'Setup & Configuration' (Protocol in workflow.md)

## Phase 2: Pengembangan API / Backend
- [x] Task: Create `src/app/sitemap.ts` that fetches tournaments and teams from the database via Prisma and returns the XML structure.
- [x] Task: Conductor - User Manual Verification 'Pengembangan API / Backend' (Protocol in workflow.md)

## Phase 3: Pengembangan UI / Frontend
- [x] Task: Update `src/app/layout.tsx` to include robust `metadata` export (title template, description, Open Graph).
- [x] Task: Add `generateMetadata` function to `src/app/tournaments/[id]/page.tsx` for dynamic OG tags.
- [x] Task: Add `generateMetadata` function to `src/app/teams/[id]/page.tsx` for dynamic OG tags.
- [x] Task: Conductor - User Manual Verification 'Pengembangan UI / Frontend' (Protocol in workflow.md)

## Phase 4: Automated Testing & Validasi
- [x] Task: Run `npx tsc --noEmit` to verify type safety of the new metadata functions.
- [x] Task: Conductor - User Manual Verification 'Automated Testing & Validasi' (Protocol in workflow.md)
