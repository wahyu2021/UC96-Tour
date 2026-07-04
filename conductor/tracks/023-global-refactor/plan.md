# Implementation Plan: 023-global-refactor

- [x] **Phase 1: Setup & Database Schema (Strict Typing & Validations)**
  - [x] Task: Set `strict: true` in `tsconfig.json` and initialize centralized `src/types/index.ts` (completing track 020).
  - [x] Task: Consolidate and move all Zod schemas into a unified `src/lib/validations/` directory.
  - [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [x] **Phase 2: Pengembangan API / Backend (API Payload Standardization)**
  - [x] Task: Scan and refactor all API route handlers (`src/app/api/`) and Server Actions to eradicate `any` types.
  - [x] Task: Implement strictly typed Request and Response payloads using the new types directory.
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [x] **Phase 3: Pengembangan UI / Frontend (Architecture & State Refactor)**
  - [x] Task: Standardize folder structure by strictly categorizing components into `ui`, `features`, and `layouts`, extracting complex fetching logic into custom hooks.
  - [x] Task: Implement TanStack Query (React Query) for optimized, scalable client-side data fetching. Introduce Zustand if complex global state dictates.
  - [x] Task: Apply `next/dynamic` for lazy-loading heavy UI elements (e.g., Modals) and eliminate dead code.
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)

- [x] **Phase 4: Automated Testing & Validasi**
  - [x] Task: Run `tsc --noEmit` and `eslint --fix` to verify 100% strict type safety and zero linter warnings.
  - [x] Task: Update and write automated test suites (`*.test.tsx`) for refactored components and hooks.
  - [x] Task: Run `npm run test` to ensure zero regressions in application logic.
  - [x] Task: Conductor - User Manual Verification 'Phase 4' (Protocol in workflow.md)
