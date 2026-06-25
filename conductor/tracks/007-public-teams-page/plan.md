# Implementation Plan: Halaman Daftar Tim Publik (/teams)

## Phase 1: Persiapan Basis Data & Server

- [ ] Task: Pembuatan fungsi _fetching_ data Prisma (di Server Component atau layer API).
  - [ ] Sub-task: Konfigurasi query Prisma `where: { status: 'APPROVED' }`.
  - [ ] Sub-task: Implementasi relasi `include: { players: true, tournament: true }` untuk memuat roster dan info turnamen.
  - [ ] Sub-task: Susun logika parameter pencarian (`search`), filter (`tournamentId`), dan _pagination_ (`skip` & `take`).

## Phase 2: Pembuatan Komponen UI (Client)

- [ ] Task: Buat komponen `TeamCard.tsx`.
  - [ ] Sub-task: Desain tata letak yang menarik untuk Logo, Nama Tim, dan Tag.
  - [ ] Sub-task: Render barisan pemain dengan penanda visual (ikon/badge) untuk identitas Kapten.
- [ ] Task: Buat komponen `TeamsFilter.tsx` (Client Component).
  - [ ] Sub-task: Buat fungsi sinkronisasi _input text_ dan _dropdown_ dengan URL parameter menggunakan `useRouter` & `useSearchParams`.
  - [ ] Sub-task: Terapkan _debounce_ pada pencarian agar tidak _spam_ ke server saat mengetik cepat.

## Phase 3: Integrasi Halaman Publik (/teams)

- [ ] Task: Konstruksi rute Server Component `src/app/teams/page.tsx`.
  - [ ] Sub-task: Ekstrak `searchParams` dari Next.js App Router.
  - [ ] Sub-task: Panggil fungsi pemanggilan data (Prisma) dan lewatkan datanya ke _Client_.
  - [ ] Sub-task: Rangkai `TeamsFilter`, pemetaan (_mapping_) _grid_ `TeamCard`, dan komponen _Pagination_.

## Phase 4: Pengujian & Penyelesaian

- [ ] Task: Validasi Tampilan & Fungsionalitas.
  - [ ] Sub-task: Uji coba responsivitas tampilan (Grid diubah jumlah kolomnya untuk layar _mobile_ dan _desktop_).
  - [ ] Sub-task: Pastikan filter URL berfungsi mulus dan status URL bisa di-_copy-paste_.
