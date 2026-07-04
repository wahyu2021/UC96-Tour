# Specification: 028-seo-optimization

## Overview
Implement Technical SEO features across the UC96 TOUR platform to improve search engine indexing and social media link previews.

## Functional Requirements
1. **Dynamic Sitemap (`src/app/sitemap.ts`)**: Generate a sitemap that includes static routes (Home, Leaderboard) and dynamic routes (all public Tournaments and Teams) fetched directly from the database.
2. **Robots.txt (`src/app/robots.ts`)**: Generate a standard `robots.txt` that allows indexing of public pages and blocks indexing of `/admin/*` routes.
3. **Global Metadata (`src/app/layout.tsx`)**: Define standard Next.js metadata, including Open Graph (OG) and Twitter Card configurations. The base title will be "UC96 TOUR" and the description "Platform Turnamen PUBG".
4. **Dynamic Metadata**: Update `src/app/tournaments/[id]/page.tsx` and `src/app/teams/[id]/page.tsx` to export `generateMetadata` so each entity has unique OG previews when shared.

## Non-Functional Requirements
- Sitemap generation must be reasonably fast (use caching or lean queries).

## Acceptance Criteria
- [ ] `/sitemap.xml` is accessible and lists valid URLs.
- [ ] `/robots.txt` is accessible and restricts `/admin/`.
- [ ] `<meta>` tags for Open Graph are correctly injected in the HTML head.
