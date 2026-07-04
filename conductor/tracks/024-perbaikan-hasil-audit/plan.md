# Implementation Plan: Track 024-perbaikan-hasil-audit

- [ ] **Phase 1: Security & Middleware (Keamanan Utama)**
  - [ ] Task: Ubah nama `src/proxy.ts` menjadi `src/middleware.ts` dan perbarui `matcher` agar mencakup `/admin/:path*` dan `/api/admin/:path*`.
  - [ ] Task: Implementasikan pengecekan peran (Role Check) di `src/middleware.ts` untuk memastikan hanya `ADMIN` dan `SUPERADMIN` yang lolos.
  - [ ] Task: Implementasikan _Rate Limiting_ (contoh: _in-memory_ map) pada _endpoint_ `/api/register` untuk menangkal serangan _spam_.
  - [ ] Task: Tambahkan _Auth Guard_ (`getServerSession`) pada _endpoint_ `GET /api/admin/scoring-rules` dan `GET /api/admin/matches/[id]/scores` yang sebelumnya terbuka.
  - [ ] Task: Conductor - User Manual Verification 'Phase 1' (Protocol in workflow.md)

- [ ] **Phase 2: Code Architecture & Error Bounds (Standarisasi)**
  - [ ] Task: Buat fungsi _helper_ terpusat (contoh: `requireAdmin()`) untuk menghilangkan duplikasi logika autentikasi di seluruh API route admin.
  - [ ] Task: Lakukan _refactor_ pada 10+ _route_ API admin agar menggunakan _helper_ `requireAdmin()` yang baru dibuat.
  - [ ] Task: Buat batas _error_ standar Next.js yaitu `loading.tsx`, `error.tsx`, dan `not-found.tsx` di direktori _root_ (`src/app/`).
  - [ ] Task: Conductor - User Manual Verification 'Phase 2' (Protocol in workflow.md)

- [ ] **Phase 3: Frontend & Dead Code Removal (Optimalisasi UI)**
  - [ ] Task: _Uninstall_ dependensi `zustand` (`npm uninstall zustand`) dan hapus berkas `src/store/useAppStore.ts` sepenuhnya.
  - [ ] Task: _Refactor_ komponen `MatchTable` untuk mengganti fungsi _fetch_ manual `useEffect` dengan `useQuery` dari React Query.
  - [ ] Task: _Refactor_ komponen `LeaderboardTable` untuk mengganti _fetch_ manual `useEffect` dengan `useQuery`.
  - [ ] Task: Jalankan pengecekan keamanan tipe data (`npx tsc --noEmit`) dan seluruh _unit test_ (`npm run test`) untuk memastikan tidak ada fitur yang patah pasca-_refactor_.
  - [ ] Task: Conductor - User Manual Verification 'Phase 3' (Protocol in workflow.md)
