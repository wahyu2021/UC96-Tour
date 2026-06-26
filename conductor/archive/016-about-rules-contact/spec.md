# Track 016: Public Static Pages (Tentang, Aturan, Kontak)

## Overview

Implementasi halaman publik untuk informasi UC96 yang meliputi `/about`, `/rules`, dan `/contact`. Selain membangun tampilan publik, konten teks di halaman ini juga akan dirancang dinamis (dapat diedit melalui Panel Admin) untuk menghindari _hardcoding_.

## Functional Requirements

1. **Halaman Publik:**
   - **Tentang (`/about`)**: Menampilkan Hero Banner, Visi & Misi, dan Sejarah UC96.
   - **Aturan (`/rules`)**: Menampilkan tabel Sistem Poin, Aturan (Accordion), dan Syarat Pendaftaran.
   - **Kontak (`/contact`)**: Menyediakan tombol _Direct to WhatsApp/Discord_, tautan Sosial Media, dan FAQ.
2. **Manajemen Konten (CMS) di Admin:**
   - Menambahkan skema _Database_ baru (misal: `AppSetting`) untuk menyimpan data dinamis berupa JSON/Teks (Visi Misi, Aturan, FAQ, Kontak).
   - Menambahkan halaman di Panel Admin (misal: `/admin/settings`) agar Admin bisa mengedit teks/konten halaman publik dengan mudah.
   - Membuat API Endpoint untuk membaca & memperbarui konfigurasi tersebut.

## Non-Functional Requirements

- Menggunakan desain estetika E-Sports (Dark theme, _Glassmorphism_, _Micro-animations_) yang konsisten.
- Desain _Mobile-First_.

## Acceptance Criteria

- [ ] Halaman `/about`, `/rules`, dan `/contact` berhasil dibangun dengan estetika _esports_ premium.
- [ ] Semua konten di ketiga halaman tersebut bersumber dari database (dinamis).
- [ ] Terdapat panel di Dashboard Admin untuk mengubah/menyimpan data (Teks Aturan, FAQ, Link Sosmed, dll).
