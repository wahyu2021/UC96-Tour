# Laporan Analisis Mendalam Codebase UC96 TOUR

Berikut adalah laporan terperinci mengenai temuan dari riset codebase, mencakup jalur file (file paths) dan area spesifik yang membutuhkan perbaikan.

---

## 1. Database Schema (`prisma/schema.prisma`)

Terdapat beberapa celah dalam perancangan skema database yang berdampak pada performa dan integritas data:

- **1.1 Tidak Ada Indeks pada Foreign Key**
  Field seperti `Team.tournamentId` (baris 58), `Player.teamId` (baris 73), `Match.tournamentId` (baris 86), dan `MatchResult.teamId/matchId` (baris 101-102) tidak memiliki anotasi `@@index`. Hal ini dapat menyebabkan _full table scan_ dan memperlambat _query_ seiring bertambahnya data.
- **1.2 `User.role` Menggunakan Tipe Data String (Baris 116)**
  Tipe data `String` memungkinkan nilai sembarang dimasukkan. Seharusnya menggunakan `enum UserRole { ADMIN, SUPERADMIN }` untuk _type safety_.
- **1.3 Tidak Ada Perilaku _Cascade Delete_ pada Turnamen**
  Relasi `Team.tournament` (baris 62) dan `Match.tournament` (baris 90) tidak mendefinisikan `onDelete`. Jika sebuah turnamen dihapus, data tim dan pertandingan yang terkait akan menjadi yatim (_orphaned_).
- **1.4 Validasi `Tournament.maxSlots` Tidak Ada (Baris 24)**
  Tidak ada konstrain tingkat database untuk memastikan nilai `maxSlots` positif.
- **1.5 Tidak Ada `@@map` untuk Penamaan Tabel**
  Skema menggunakan _PascalCase_ (bawaan Prisma), padahal konvensi penamaan tabel MySQL umumnya menggunakan _snake_case_ atau huruf kecil majemuk (misal: `@@map("tournaments")`).

---

## 2. API Routes & Keamanan (Backend)

Ini adalah area paling kritis. Banyak endpoint admin yang terekspos ke publik tanpa perlindungan.

### 🔴 Isu Keamanan Kritis (Tanpa Autentikasi)

Berikut adalah daftar file API Admin yang **TIDAK MEMILIKI** pengecekan autentikasi (sesi login) di dalam kodenya. Siapa pun dapat mengakses dan memodifikasi data melalui endpoint ini:

- `src/app/api/admin/dashboard/route.ts` (Membaca data sensitif admin)
- `src/app/api/admin/matches/route.ts` (Membuat/membaca pertandingan)
- `src/app/api/admin/matches/[id]/results/route.ts` (Memasukkan skor - _juga tidak menggunakan database transaction_)
- `src/app/api/admin/teams/route.ts` & `[id]/route.ts` (Mengelola tim)
- `src/app/api/admin/tournaments/route.ts` & `[id]/route.ts` (Mengelola turnamen)
- `src/app/api/admin/settings/route.ts` (Mengubah pengaturan aplikasi)
- `src/app/api/admin/upload/route.ts` (Menerima unggahan file tanpa batasan ukuran, tipe _MIME_, dan rentan terhadap _path traversal_ karena disimpan di `public/uploads/`).

### 🟡 Isu API Publik & Konfigurasi

- **Tidak Ada `middleware.ts`**: Terdapat file bernama `src/proxy.ts` yang berisi logika middleware proteksi NextAuth, namun karena salah penamaan, proteksi ini sama sekali **tidak aktif**.
- **Tidak Ada Rate Limiting**: Endpoint seperti `/api/register` rentan terhadap eksploitasi (_spam_) karena tidak memiliki batasan _request_ atau proteksi CAPTCHA.
- **Kebocoran Pengaturan**: Endpoint `/api/settings/route.ts` mengembalikan seluruh pengaturan aplikasi tanpa memfilter pengaturan yang mungkin sensitif.
- **Konfigurasi NextAuth (`src/lib/auth.ts`)**: Sesi memiliki _maxAge_ 24 jam tetapi tidak memiliki mekanisme _refresh token_ atau invalidasi sesi. Fungsi `authorize` juga kurang menyimpan data identifikasi (_email_).

---

## 3. Frontend & Analisis UI/UX

Arsitektur frontend secara umum sudah sejalan dengan `DESIGN.md`, namun memiliki banyak kekurangan di aspek interaktivitas, aksesibilitas, dan SEO.

### Tata Letak & Styling

- **Home Page (`src/app/page.tsx`)**: Menggunakan warna latar belakang _hardcoded_ (`bg-[#0a0a0a]`) alih-alih variabel tema, sehingga akan merusak tampilan saat _Light Mode_ aktif.
- **Global CSS (`src/app/globals.css`)**: Sangat minimalis (hanya 29 baris). Tidak mendefinisikan _scrollbar_, gaya pemfokusan (_focus ring_), atau warna teks yang di-blok (_selection_).
- **Desain Inkonsisten**: Tombol _Primary_ tidak memiliki efek _glow_ dan tidak ada efek _glassmorphism_ seperti yang dijanjikan di `DESIGN.md`.

### Komponen UI (`src/components/ui/`)

- `Button.tsx`: Tidak memiliki tampilan visual yang membedakan saat _disabled_ atau _loading_ (_spinner_ tidak menggantikan status disabled secara visual).
- `Input.tsx`: Tidak mendukung animasi _floating label_ atau _prefix/suffix_ ikon.
- `Modal.tsx`: **Tidak memiliki animasi transisi** saat dibuka/ditutup, dan tidak mengimplementasikan _focus trap_ (pengguna keyboard bisa menavigasi ke luar modal).
- `Navbar.tsx`: Ukuran file sangat besar (hampir 10KB). Tautan Admin selalu terlihat (tidak disembunyikan berdasarkan status _login_).

### Aksesibilitas (a11y) & SEO

- **Aksesibilitas**: Tidak ada atribut `aria-modal` pada `Modal`, tidak ada peran ARIA pada `Select` kustom, dan tidak ada dukungan navigasi keyboard pada `Pagination`. Terdapat isu rasio kontras warna merah `#D32F2F` di atas latar hitam `#121212`.
- **SEO**: Hanya _Root Layout_ yang memiliki _metadata_. Tidak ada _Open Graph_, _Twitter Cards_, `robots.txt`, `sitemap.xml`, atau penanda data terstruktur (_JSON-LD_).

---

## 4. Testing, CI/CD, & Developer Experience (DevOps)

Lingkungan pengembang masih memerlukan standardisasi agar kolaborasi tim berjalan lancar.

- **Berkas Pengujian (Tests) Berserakan**: Terdapat dua folder berbeda (`__tests__/` dan `tests/`). Cakupan pengujian sangat terbatas (hanya beberapa rute API) dan tidak ada pengujian terintegrasi (_E2E tests_).
- **Vitest & ESLint**: Konfigurasi `vitest.config.ts` kehilangan _path aliases_ (`@/`), sehingga tes yang mengimpor komponen bisa gagal. ESLint tidak memiliki aturan kustom atau aturan pengurutan _import_.
- **Keamanan Repositori**: File `.gitignore` mengabaikan `.env`, namun nyatanya terdapat file `.env` berukuran 2804 bytes di dalam repositori yang **sangat berisiko membocorkan rahasia kredensial**.
- **CI/CD**: Tidak ada _pipeline_ GitHub Actions, Dockerfile, atau konfigurasi peladen untuk penyebaran otomatis.
- **Pembersihan**: Direktori `lib/`, `types/`, dan `utils/` di tingkat utama (root) kosong dan harus dihapus. File `src/proxy.ts` yang menjadi penyebab masalah middleware harus segera diganti namanya.

---

## 📋 Rencana Perbaikan (Action Plan) Terkini

Berdasarkan rincian yang lebih dalam ini, saya telah memperbarui urutan langkah eksekusi. **Tolong berikan persetujuan untuk menjalankan Fase 1.**

**Fase 1: Penambalan Keamanan API & Middleware (Kritis)**

1. Mengubah nama `src/proxy.ts` menjadi `src/middleware.ts` untuk mengaktifkan proteksi routing `/admin/*`.
2. Menambahkan pengecekan _session_ (NextAuth) di semua rute API dalam direktori `src/app/api/admin/`.
3. Mengamankan `/api/upload/route.ts` dengan _auth check_ dan membatasi ekstensi (hanya menerima `.jpg, .png, .webp`) serta ukuran maksimal file.

**Fase 2: Optimasi Skema Database Prisma**

1. Menambahkan anotasi `@@index` pada semua _foreign key_ di `schema.prisma`.
2. Mengubah tipe `User.role` menjadi `Enum`.
3. Menerapkan skema relasi `onDelete: Cascade` agar data terhapus secara berjenjang.

**Fase 3: Pembenahan Frontend & UI/UX**

1. Memperbaiki `Navbar.tsx` agar menyembunyikan menu "Admin" jika sesi belum _login_.
2. Memperbaiki _hardcoded background_ di `src/app/page.tsx` agar mendukung _Light Mode_.
3. Menambahkan animasi masuk/keluar (_framer-motion_ atau _tailwind transition_) pada `Modal.tsx`.
4. Menambahkan atribut Metadata OG _Open Graph_ per halaman untuk kebutuhan SEO.

**Fase 4: Penataan Struktur (_Refactoring_) & Standarisasi**

1. Menyatukan direktori _testing_ menjadi satu (menghapus `__tests__` atau memindahkannya ke `tests`).
2. Melakukan perbaikan `vitest.config.ts` dan merapikan sisa-sisa _folder_ kosong (`utils/`, `types/` di root).
3. (Opsional) Menambahkan skrip dasar GitHub Actions CI/CD.
