# Technology Stack: UC96 PUBG Tournament Website

## 1. Programming Languages

- **TypeScript:** Digunakan secara menyeluruh baik di _Frontend_ maupun _Backend_ (Full-Stack). Pengetikan statis dari TypeScript sangat penting untuk meminimalisir _bug_ dan memastikan konsistensi struktur data turnamen.

## 2. Frontend Framework

- **Next.js (App Router):** Framework _full-stack_ berbasis React. Dipilih karena menawarkan performa tinggi dengan fitur _Server-Side Rendering_ (SSR). Next.js akan di-_build_ dalam mode `standalone` agar ramah memori saat dijalankan di VPS Anda.
- **Tailwind CSS & next-themes:** Untuk _styling_ UI dan pengelolaan _Dark/Light Mode_ secara efisien.
- **React Query (TanStack Query):** Untuk _state management_ data _fetching_ sisi klien yang optimal dan _caching_.

## 3. Backend

- **Next.js API Routes:** Menangani logika _backend_ terintegrasi tanpa perlu server Node.js/Express terpisah.

## 4. Database & ORM

- **MySQL:** Sistem basis data relasional (_relational database_) untuk menyimpan data entitas (tim, pemain, poin).
- **Prisma ORM:** Digunakan untuk mempermudah operasi _database_ dengan pendekatan yang aman tipe (_type-safe_).

## 5. Keamanan & Autentikasi

- **NextAuth.js:** Menangani _session_ dan logika otentikasi panitia dengan aman.
- **Bcryptjs:** Melakukan _hashing_ pada kata sandi admin agar data di _database_ tetap terlindungi.
