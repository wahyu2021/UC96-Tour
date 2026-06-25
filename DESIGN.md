---
name: UC96 Tournament Design System
description: Identitas visual untuk platform turnamen e-sports Unit Combat 96
---

# Design System: UC96 PUBG Tournament

Dokumen ini adalah panduan desain utama untuk memastikan konsistensi antarmuka pengguna, selaras dengan estetika e-sports dan game PUBG. File ini mengikuti standar `design.md` dari repositori google-labs-code.

## 1. Konsep Visual

- **Tema Utama:** Clean Minimalist, elegan, dan profesional.
- **Mode Warna:** Monokrom (Hitam, Putih, Abu-abu) dengan dukungan _Dark Mode_ sebagai default utama.
- **Efek UI:** Bersih dan rapi, memanfaatkan ruang lega (_white space_) dan _Glassmorphism_ yang halus (_subtle_).

## 2. Palet Warna (Color Palette)

### Dark Mode (Default)

- **Background Utama:** `#121212` (Hitam pekat / Monokrom)
- **Background Panel/Card:** `#1E1E1E` (Abu-abu gelap transparan)
- **Aksen Utama (Primary):** `#D32F2F` (Merah / Crimson Red) - Digunakan untuk teks penting, tombol, dan garis sorotan agar menonjol di latar monokrom.
- **Aksen Sekunder:** `#E0E0E0` (Putih keabu-abuan) - Untuk teks paragraf biasa.
- **Status Positif (Win/Chicken Dinner):** `#4CAF50` (Hijau)
- **Status Negatif (Gugur):** `#F44336` (Merah)

### Light Mode

- **Background Utama:** `#F5F7FA` (Abu-abu sangat terang)
- **Background Panel/Card:** `#FFFFFF` (Putih bersih dengan sedikit _box-shadow_)
- **Aksen Utama (Primary):** `#D32F2F` (Merah Gelap) atau menyesuaikan kontras dengan Oranye.
- **Teks Utama:** `#212121` (Hitam arang)

## 3. Tipografi (Typography)

- **Font Utama:** `Inter` atau `Roboto` (Sans-serif)
  - Bersih, mudah dibaca, dan sangat modern. Digunakan secara luas untuk tabel data klasemen dan deskripsi teks.
- **Font Heading (Opsional):** `Outfit` atau `Oswald`
  - Memberikan kesan kokoh dan maskulin khas e-sports pada bagian Judul Halaman (H1, H2) dan nama tim.

## 4. Komponen UI (Spesifikasi Framework)

- **Corner Radius:** Menggunakan `rounded-md` atau `rounded-lg` pada Tailwind CSS untuk memberikan sudut yang tidak terlalu tajam.
- **Buttons (Tombol):**
  - _Primary Button:_ Latar belakang warna aksen utama, teks tebal, efek hover dengan pergeseran cahaya (_glow_).
  - _Ghost Button:_ Latar belakang transparan dengan garis (_border_) warna aksen.
- **Tabel Klasemen (Leaderboard):**
  - Desain _zebra-striping_ (warna baris selang-seling tipis) agar mata tidak lelah membaca data peserta yang panjang.
  - Hover efek pada setiap baris peserta.
