<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project Specific Rules
- **Middleware deprecation**: In this specific project version, the standard Next.js `middleware.ts` has been deprecated. All middleware logic MUST reside in `src/proxy.ts`. Do not rename `src/proxy.ts` to `middleware.ts`.
