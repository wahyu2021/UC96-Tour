# Track 024: Perbaikan Hasil Audit (Audit Fixes)

## Overview

Track ini berfokus pada perbaikan komprehensif berdasarkan temuan kritis dari hasil audit proyek UC96 TOUR. Perbaikan mencakup pilar keamanan (Security & Backend), perampingan _state_ (Frontend), serta arsitektur.

## Functional Requirements

1. **Keamanan & Middleware (Prioritas 1)**
   - Memindahkan `src/proxy.ts` menjadi `src/middleware.ts` dan memperkuat _matcher_.
   - Menambahkan validasi peran (Role Check) untuk `ADMIN` & `SUPERADMIN` secara terpusat pada middleware untuk semua rute `/admin` dan `/api/admin`.
   - Menambahkan _Auth Guard_ pada endpoint yang sebelumnya "bocor" (seperti `/api/admin/scoring-rules` & `scores`).
   - Menerapkan pembatasan `Rate Limiting` dasar pada pendaftaran publik (`/api/register`).
2. **Frontend & State Management (Prioritas 2)**
   - Menghapus pustaka `zustand` karena terbukti sebagai _dead code_, lalu menghapus berkas `src/store/useAppStore.ts`.
   - Memigrasikan _data fetching_ kuno (`useEffect` + `fetch`) ke dalam `React Query` (yang sudah ter-install) pada komponen tabel penting seperti `MatchTable` dan `LeaderboardTable`.
3. **Architecture & Error Handling (Prioritas 3)**
   - Menambahkan batas _error_ standar Next.js (`loading.tsx`, `error.tsx`, `not-found.tsx`) di root.
   - Mengonsolidasikan logika pengecekan autentikasi yang berulang (_duplicate_) di API routes ke dalam sebuah _helper/utility function_.

## Out of Scope

- Migrasi tag `<img>` secara masif ke `next/image` (akan dikerjakan di track UI khusus).
- Refactor pemecahan komponen raksasa (seperti `TournamentTableClient.tsx` yang mencapai >400 baris).
