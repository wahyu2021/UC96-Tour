# Specification: Sistem Scoring & Leaderboard Dinamis

## 1. Overview

Membangun fitur utama perhitungan poin dan _Leaderboard_ (Klasemen) untuk turnamen UC96. Sistem ini akan menggunakan regulasi resmi PUBG E-sports (akumulasi Poin Kill + Poin Placement) yang di-_input_ oleh Admin per pertandingan (Match).

## 2. Functional Requirements

**A. Manajemen Poin (Admin Panel)**

- Admin dapat memilih Pertandingan (Match) yang sudah selesai.
- Admin dapat menginputkan hasil untuk setiap tim yang berpartisipasi di Match tersebut:
  - Jumlah Kill.
  - Peringkat Placement (Rank 1 - 16+).
- Sistem otomatis menghitung total poin berdasarkan regulasi resmi (misal: 1 Kill = 1 Poin; Placement 1 = 10 pts, 2 = 6 pts, dsb).

**B. Leaderboard Publik**

- Menampilkan klasemen tim secara _real-time_ berdasarkan akumulasi poin dari semua pertandingan dalam sebuah turnamen.
- Kolom klasemen meliputi: Peringkat (Rank), Logo & Nama Tim, Total Match, Total Kill, Placement Poin, dan Total Keseluruhan Poin.
- Karena fase grup tidak selalu ada, Leaderboard default akan dihitung secara global per Turnamen, dengan opsi filter (jika diperlukan nantinya).

## 3. Out of Scope

- Bagan eliminasi 1v1 (Single/Double Elimination) tidak digunakan karena tidak relevan dengan format dasar turnamen ini.
- Otomatisasi integrasi API _in-game_ PUBG (Poin di-_input_ manual oleh panitia).
