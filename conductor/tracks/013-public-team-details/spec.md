# Specification: Halaman Detail Tim Publik (013-public-team-details)

## 1. Overview

Halaman khusus untuk menampilkan profil lengkap dari sebuah tim esports yang berpartisipasi dalam turnamen. Halaman ini bertindak sebagai "Public Portfolio" untuk setiap tim yang berisi identitas, daftar pemain utama, serta rekam jejak performa (riwayat pertandingan).

## 2. Functional Requirements

- **Routing & Navigasi**:
  - Terdapat di URL `(/teams/[id])`.
  - Halaman dapat diakses publik tanpa otentikasi.
  - Nama/Logo tim pada halaman Leaderboard dan halaman `/teams` akan diubah menjadi _clickable link_ yang mengarah ke halaman detail tim ini.

- **Data yang Ditampilkan**:
  - **Identitas Tim**: Nama tim, logo tim (jika ada, atau _placeholder_ elegan), dan informasi asal sekolah/instansi.
  - **Roster Pemain**: Menampilkan _grid_ modern atau daftar anggota tim yang memuat In-Game Name (IGN), Nama Asli, dan Peran (_Role_).
  - **Riwayat Pertandingan**: Tabel _best-practice_ berdesain premium yang menguraikan performa tim di tiap _match_ (Nama Match, Posisi/Placement, Kills yang didapat, Poin Total pada _match_ tersebut).

- **Desain & UI**:
  - Memanfaatkan estetika "Premium, Dark Mode, Monochrome & Red" sesuai _Product Guidelines_.
  - Menggunakan komponen _Badge_ untuk peringkat akhir pada tiap pertandingan, _hover states_ untuk tabel, dan _layout responsif_ di perangkat seluler.

## 3. Out of Scope

- Statistik performa agregat lanjutan (misal: Rata-rata Kills/Match atau Grafik garis visualisasi poin) belum termasuk dalam lingkup ini.
- Fungsionalitas pengeditan (Halaman ini bersifat _Read-Only_ bagi publik).
