# Specification: 019-frontend-polish

## Overview

Track ini berfokus pada penyempurnaan UI/UX (Antarmuka dan Pengalaman Pengguna) di sisi _frontend_ aplikasi. Hal ini mencakup perbaikan tata letak yang rusak pada tema tertentu, pengaturan visibilitas menu berbasis otentikasi, hingga penambahan SEO dasar.

## Functional Requirements

1. **Otentikasi Navbar:** Menu "Admin" pada komponen `Navbar.tsx` harus disembunyikan secara _default_ dari pengunjung anonim, dan hanya dirender/ditampilkan apabila pengguna memiliki sesi aktif dengan _role_ Admin.
2. **Perbaikan Tema _Light Mode_:** Komponen halaman utama (terutama bagian _Hero Section_) yang saat ini memiliki warna latar/teks yang di-_hardcode_ untuk _Dark Mode_ harus disesuaikan menggunakan variabel CSS tema Tailwind (`bg-background`, `text-foreground`, dll) agar terlihat baik di _Light Mode_.
3. **Transisi Modal:** Menambahkan efek animasi (seperti _fade-in/out_ atau _scale_) pada komponen `Modal.tsx` menggunakan kelas utilitas CSS transisi agar tidak muncul/hilang secara kaku.
4. **Metadata SEO Dasar:** Menyematkan informasi _Open Graph_ (OG Meta Tags) pada halaman publik utama (seperti _Home_, _Tournaments_) agar pratinjau _link_ terlihat menarik saat dibagikan ke media sosial.

## Non-Functional Requirements

- Perubahan komponen antarmuka tidak boleh merusak tes unit (_Vitest_) yang sudah ada.

## Out of Scope

- Desain ulang (_redesign_) halaman secara penuh.
- Pembuatan fitur _frontend_ baru yang belum ada sebelumnya (seperti halaman _Profile_ pengguna).
