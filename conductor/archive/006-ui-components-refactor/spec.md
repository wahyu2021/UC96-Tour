# Specification: UI Components Refactoring

## 1. Overview

Tujuan dari track ini adalah untuk mengekstraksi dan menstandarisasi elemen-elemen antarmuka pengguna (UI) yang sering digunakan ke dalam komponen _reusable_. Hal ini akan meningkatkan konsistensi desain (Design System), memudahkan pemeliharaan kode, dan memperkaya _User Experience_ dengan komponen kustom seperti _Dropdown_ mandiri.

## 2. Scope & Requirements

- **Lokasi Komponen:** Seluruh komponen akan diisolasi di dalam direktori `src/components/ui/`.
- **Komponen yang Dibuat:**
  1. **`Select` / `Dropdown`**: Dibangun murni dari nol (_from scratch_) menggunakan React State dan Tailwind CSS untuk menggantikan elemen `<select>` bawaan browser. Harus mendukung _Dark Mode_ dan animasi transisi.
  2. **`Input`**: Komponen form standar dengan dukungan _state error_ dan label kustom.
  3. **`Button`**: Tombol interaktif dengan berbagai varian desain (_Primary, Secondary, Outline_).
  4. **`Badge`**: Label penanda status untuk tabel.
  5. **`Modal` / `Dialog`**: Komponen dialog _popup_ untuk menampilkan form (contoh: Form Tambah Turnamen).
- **Integrasi:** Memperbarui kode di `RegistrationForm.tsx`, `TeamTableClient.tsx`, dan `TournamentTableClient.tsx` untuk menggunakan komponen UI baru ini guna menggantikan kode HTML _hardcoded_.

## 3. Out of Scope

- Penambahan logika _backend_ baru.
- Perubahan fitur selain UI.
