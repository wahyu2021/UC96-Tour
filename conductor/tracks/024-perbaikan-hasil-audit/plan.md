# Implementation Plan: Track 024-perbaikan-hasil-audit

- [x] **Phase 1: Security & Middleware (Keamanan Utama)**
  - [x] Task: Ubah nama `src/proxy.ts` menjadi `src/middleware.ts` dan perbarui `matcher` agar mencakup `/admin/:path*` dan `/api/admin/:path*`.
  - [x] Task: Implementasikan pengecekan peran (Role Check) di `src/middleware.ts` untuk memastikan hanya `ADMIN` dan `SUPERADMIN` yang lolos.
  - [x] Task: Implementasikan _Rate Limiting_ (contoh: _in-memory_ map) pada _endpoint_ `/api/register` untuk menangkal serangan _spam_.
  - [x] Task: Tambahkan _Auth Guard_ (`getServerSession`) pada _endpoint_ `GET /api/admin/scoring-rules` dan `GET /api/admin/matches/[id]/scores` yang sebelumnya terbuka.
  - [x] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [x] **Phase 2: Code Architecture & Error Bounds (Standarisasi)**
  - [x] Task: Buat fungsi _helper_ terpusat (contoh: `requireAdmin()`) untuk menghilangkan duplikasi logika autentikasi di seluruh API route admin.
  - [x] Task: Lakukan _refactor_ pada 10+ _route_ API admin agar menggunakan _helper_ `requireAdmin()` yang baru dibuat.
  - [x] Task: Buat batas _error_ standar Next.js yaitu `loading.tsx`, `error.tsx`, dan `not-found.tsx` di direktori _root_ (`src/app/`).
  - [x] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [x] **Phase 3: Frontend & Dead Code Removal (Optimalisasi UI)**
  - [x] Task: _Uninstall_ dependensi `zustand` (`npm uninstall zustand`) dan hapus berkas `src/store/useAppStore.ts` sepenuhnya.
  - [x] Task: _Refactor_ komponen `MatchTable` untuk mengganti fungsi _fetch_ manual `useEffect` dengan `useQuery` dari React Query.
  - [x] Task: _Refactor_ komponen `LeaderboardTable` untuk mengganti _fetch_ manual `useEffect` dengan `useQuery`.
  - [x] Task: Jalankan pengecekan keamanan tipe data (`npx tsc --noEmit`) dan seluruh _unit test_ (`npm run test`) untuk memastikan tidak ada fitur yang patah pasca-_refactor_.
  - [x] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
