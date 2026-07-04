# Specification: 023-global-refactor

## Overview

This track aims to perform a comprehensive, global code refactor for the UC96 Tournament Platform to ensure best practices, maintainability, and scalability. It absorbs the unfinished TypeScript refactor (from track 020) and introduces robust state management and architectural standards.

## Functional Requirements

1. **Architecture & Folder Structure:** Reorganize the `src/components` directory strictly into `ui`, `features`, and `layouts`. Isolate business logic into custom hooks.
2. **TypeScript Strict Typing:** Eradicate all `any` types. Enable `strict: true` in `tsconfig.json`. Implement centralized types in `src/types/` for API payloads and Prisma models.
3. **State Management & Fetching:** Implement TanStack Query (React Query) for optimal, scalable client-side data fetching and caching. Introduce Zustand if complex global UI state management is required.
4. **Performance Optimization:** Implement `next/dynamic` for lazy-loading heavy components (e.g., Modals). Optimize images using `next/image` and clean up unused Tailwind utility classes.
5. **Validation Standardization:** Centralize all Zod schemas into `src/lib/validations/`.

## Non-Functional Requirements

- Zero compilation errors (`tsc --noEmit`).
- No regressions in existing features (Auth, Dashboard, Public Pages).
- ESLint must pass without warnings.

## Out of Scope

- Adding entirely new major features (e.g., live chat, payment gateway) not related to code quality.
