# Specification: 021-daily-scrim-system

## Overview

Implementasi sistem "Enterprise-grade" untuk manajemen Daily Scrim (Turnamen Harian) yang berfokus pada kecepatan pendaftaran, kemudahan administrasi, dan pencegahan _smurfing_. Fitur utama mencakup Dasbor Kapten (Player Account), pendaftaran 1-klik, sistem persetujuan (_approval queue_), dan tombol _Auto-Generate_ jadwal Scrim harian.

## Functional Requirements

1. **Otentikasi & Dasbor Kapten (Player Account):**
   - Penambahan _Role_ `PLAYER` di otentikasi NextAuth.
   - Fitur _Login/Register_ publik untuk Kapten (Email/Password atau Google).
   - Dasbor Kapten untuk membuat dan mengelola "Profil Tim" secara permanen (menyimpan Nama, Tag, Logo, dan Roster/IGN 4-5 pemain).
2. **Pendaftaran "Satu Klik" (1-Click Fast Registration):**
   - Halaman pendaftaran turnamen berubah menjadi antarmuka pendaftaran instan jika Kapten sudah _login_ dan memiliki Profil Tim.
   - Pendaftaran tidak lagi mensyaratkan pengisian _form_ manual.
3. **Sistem Antrean & Verifikasi Anti-Smurf:**
   - Registrasi 1-klik akan memasukkan tim ke status `PENDING` (_Waiting List_).
   - Pendaftaran berstatus `PENDING` **tidak** mengurangi kuota (Slot) maksimum turnamen.
   - Dasbor Admin menampilkan daftar tim yang `PENDING` beserta IGN anggota untuk diverifikasi (Anti-Smurf).
   - Jika Admin mengklik `Approve`, barulah tim resmi mengambil slot turnamen. Pendaftar yang tidak disetujui akan tetap berada di antrean atau di `Reject`.
4. **Daily Scrim Auto-Generator (Admin):**
   - Tombol khusus di panel Admin untuk men- _generate_ turnamen harian dalam 1 klik.
   - Otomatis membuat _Tournament_ dengan format: "Daily Scrim - [Tanggal]".
   - Otomatis membuat 3 jadwal pertandingan (Matches) bawaan: Erangel, Miramar, dan Sanhok.

## Non-Functional Requirements

- Menggunakan arsitektur _Typescript_ yang _typesafe_ dan lolos pengecekan ESLint.
- Desain antarmuka (UI) Dasbor Pemain disesuaikan dengan bahasa visual yang sudah ada (Modern & _Sleek_).

## Acceptance Criteria

- Kapten bisa _login_, menyimpan Roster Tim secara permanen, dan melakukan pendaftaran 1-klik ke turnamen yang masih terbuka.
- Tim yang mendaftar 1-klik masuk berstatus `PENDING` dan kuota `maxSlots` tidak berkurang sebelum di-_Approve_ Admin.
- Tombol _Auto-Generate_ berhasil menyusun Turnamen baru dan 3 _Matches_ secara langsung dalam sekali proses.

## Out of Scope

- Tidak ada akumulasi poin lintas hari (_Global Leaderboard_ tidak dibangun). Papan peringkat murni harian.
- Anggota tim biasa (bukan kapten) tidak diwajibkan maupun diberikan fitur pendaftaran akun.
