# Specification: 027-refactor-auth-helper

## Overview
Refactor the repetitive server-side session validation logic across all Next.js API routes by implementing a "High-Order Function" (HOF) wrapper pattern to ensure code is DRY (Don't Repeat Yourself).

## Functional Requirements
1. Create a `withAuthRoute` and `withAdminRoute` High-Order Function in a dedicated helper (e.g., `src/lib/api-middleware.ts` or extending `src/lib/auth.ts`).
2. The HOF must handle the standard `NextRequest` (or `Request`) and dynamic route `params`.
3. The HOF must automatically return a `401 Unauthorized` JSON response if the session is invalid or the role does not match.
4. If authorized, the HOF passes the `req`, `params`, and the verified `session` down to the actual route handler.
5. Refactor all `/api/admin/*` routes to use `withAdminRoute`.
6. Refactor all `/api/player/*` and related protected routes to use `withAuthRoute`.

## Non-Functional Requirements
- Maintain exact existing API request/response contracts.
- Code should be significantly shorter and easier to read in individual route files.

## Acceptance Criteria
- [ ] HOFs `withAuthRoute` and `withAdminRoute` are implemented and typed correctly.
- [ ] Repetitive `const session = await requireAdmin(); if (!session)...` checks are removed from individual API routes.
- [ ] Existing API tests pass without modification.
