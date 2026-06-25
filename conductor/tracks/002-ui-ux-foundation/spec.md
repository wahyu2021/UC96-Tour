# Track Specification: UI/UX Foundation & Layout (Phase 3)

## Overview

Track ini berfokus pada eksekusi **Fase 3**, yaitu pembuatan komponen UI/UX dasar (Navbar, Footer, dan Sistem Tema).

## Functional Requirements

- **Navigasi Utama (Navbar):** Berisi tautan inti: Beranda, Tim, Jadwal, Papan Peringkat, Pendaftaran, Aturan Main, Kontak.
- **Sistem Tema (Dark/Light Mode):** Mengimplementasikan `next-themes`.
- **Layout Dasar:** Membangun komponen rangka utama (`MainLayout`).
- **Hero Banner:** Membangun area sambutan (_Hero_) awal di halaman beranda.

## Non-Functional Requirements (Aesthetics & Code Quality)

- **Identitas Visual (Clean Design):** Mengusung estetika **Clean & Minimalist** (Bersih, rapi, dan lapang). Tema warna didominasi gaya **Monokrom (Hitam/Putih/Abu-abu bersih)** dengan aksen warna **Merah (Red)** sebagai sorotan interaktif yang elegan.
- **Efek UI:** Menggunakan _Glassmorphism_ (transparansi blur) yang _subtle_ (halus) dan tidak berlebihan, mempertahankan kesan _clean_.
- **Tipografi:** Menggunakan integrasi Google Fonts (_Inter_ untuk teks, _Outfit_ untuk judul/heading).
- **Code Quality & Testing:** Setiap komponen baru WAJIB didampingi file uji fungsionalitas (_Colocated Test_ menggunakan Vitest).

## Acceptance Criteria

- [ ] Desain antarmuka secara keseluruhan berhasil menerapkan gaya **Clean Minimalist dengan aksen Merah**.
- [ ] _Navbar_ responsif, _sticky_, dengan efek _glassmorphism_ tipis.
- [ ] Seluruh komponen dasar memiliki file pengujian (`.test.tsx`) yang berjalan sukses.
