# Technology Stack: UC96 PUBG Tournament Website

## 1. Programming Languages

- **TypeScript:** Digunakan secara menyeluruh baik di _Frontend_ maupun _Backend_ (Full-Stack). Pengetikan statis dari TypeScript sangat penting untuk meminimalisir _bug_ dan memastikan konsistensi struktur data turnamen.

## 2. Frontend Framework

- **Next.js (App Router):** Framework _full-stack_ berbasis React. Dipilih karena menawarkan performa tinggi dengan fitur _Server-Side Rendering_ (SSR). Next.js akan di-_build_ dalam mode `standalone` agar ramah memori saat dijalankan di VPS Anda.
- **Tailwind CSS & next-themes:** Untuk _styling_ UI dan pengelolaan _Dark/Light Mode_ secara efisien.

## 3. Backend & ORM

- **Next.js API Routes:** Menangani logika _backend_ terintegrasi tanpa perlu server Node.js/Express terpisah.
- **Prisma ORM:** Digunakan untuk menghubungkan aplikasi dengan _database_ secara aman (_Type-Safe_) dan mempermudah pengelolaan skema data yang kompleks (Pemain, Tim, Pertandingan, Poin).

## 4. Database Engine

- **MySQL / PostgreSQL:** _Database_ relasional standar industri. Dipilih karena sangat kuat untuk menangani tabel skor/klasemen yang saling berelasi, serta akan di-host menggunakan instalasi _database_ yang sudah tersedia di VPS Anda.
