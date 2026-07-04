# Specification: 026-image-optimization

## Overview
Optimize all existing raw HTML `<img>` tags across the project by migrating them to Next.js `<Image>` components to improve performance, loading times, and overall user experience.

## Functional Requirements
1. Identify all 16+ occurrences of `<img>` tags in the `src/` directory.
2. Replace each `<img>` tag with the `next/image` component.
3. Configure `next.config.ts` to allow wildcard remote patterns temporarily for development, with a note to restrict this to the production domain upon deployment.
4. Ensure all `<Image>` tags have required properties (e.g., `alt`, `width`/`height` or `fill` with `sizes`, and object-fit styling).

## Non-Functional Requirements
- Maintain exact visual fidelity; images must not stretch or distort post-migration.
- Performance (LCP) should improve due to automatic webp compression and lazy loading by Next.js.

## Acceptance Criteria
- [ ] No `<img>` tags remain in the `src/` directory.
- [ ] `next.config.ts` is updated with `remotePatterns`.
- [ ] UI remains visually identical across all viewports.
- [ ] The app builds without TypeScript errors related to `next/image`.
