# Implementation Plan: UI/UX Foundation & Layout

## Phase 1: Persiapan & Konfigurasi Tema (Theme Setup)

- [ ] Task: Konfigurasi `next-themes` untuk sistem _Dark/Light Mode_.
  - [ ] Pembuatan komponen `ThemeProvider` di `src/components/ui/`.
  - [ ] Integrasi `ThemeProvider` ke tingkat tertinggi di `app/layout.tsx`.
- [ ] Task: Pembaruan konfigurasi `tailwind.config.ts`.
  - [ ] Mendaftarkan palet warna Monokrom dan aksen Merah Crimson (`#D32F2F`).
- [ ] Task: Conductor - User Manual Verification 'Persiapan & Konfigurasi Tema' (Protocol in workflow.md)

## Phase 2: Implementasi Layout Dasar & Navbar

- [ ] Task: Pembuatan `Navbar.tsx` (Atomic Component).
  - [ ] Implementasi tata letak yang _clean_ dan efek _Glassmorphism_.
  - [ ] Penambahan menu navigasi utama yang responsif.
- [ ] Task: Pembuatan sakelar tema (`ThemeToggle.tsx`).
  - [ ] Memasang tombol pergantian tema (Gelap/Terang) di dalam Navbar.
- [ ] Task: Penulisan pengujian _Colocated Tests_.
  - [ ] Pembuatan `Navbar.test.tsx` dan `ThemeToggle.test.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Implementasi Layout Dasar & Navbar' (Protocol in workflow.md)

## Phase 3: Implementasi Footer & Main Layout

- [ ] Task: Pembuatan komponen `Footer.tsx` (Atomic Component).
  - [ ] Penulisan pengujian `Footer.test.tsx`.
- [ ] Task: Pembuatan kerangka `MainLayout.tsx`.
  - [ ] Merakit `Navbar` dan `Footer` mengelilingi ruang kosong untuk konten (_children_).
- [ ] Task: Conductor - User Manual Verification 'Implementasi Footer & Main Layout' (Protocol in workflow.md)

## Phase 4: Hero Banner Halaman Beranda (Home Page)

- [ ] Task: Pembuatan kerangka awal `HeroSection.tsx`.
  - [ ] Desain bagian penyambutan beranda yang _clean_ dan memiliki tombol aksi merah.
  - [ ] Penulisan pengujian `HeroSection.test.tsx`.
- [ ] Task: Integrasi `HeroSection` dan `MainLayout` ke dalam rute utama `app/page.tsx`.
- [ ] Task: Conductor - User Manual Verification 'Hero Banner Halaman Beranda' (Protocol in workflow.md)
