# Specification: 020-typescript-refactor

## Overview

Track ini berfokus pada refaktorisasi dan sentralisasi seluruh definisi _Types_ dan _Interfaces_ TypeScript yang saat ini tersebar di seluruh _codebase_ ke dalam folder `types/`. Hal ini bertujuan untuk meningkatkan _scalability_, keterbacaan kode, serta kemudahan dalam proses pemeliharaan.

## Functional Requirements

1. **Struktur Berbasis Domain:** Mengadopsi pemisahan file _types_ berdasarkan domain atau fungsinya (contoh: `types/models.ts` untuk _database_, `types/api.ts` untuk payload API, `types/components.ts` untuk properti antarmuka) guna menjaga skalabilitas.
2. **Sentralisasi Frontend Props:** Mengekstrak seluruh _interface props_ (seperti `AdminSidebarProps`, `ModalProps`, dll) dari dalam komponen untuk di-ekspor ulang melalui direktori terpusat.
3. **Standarisasi Payload API:** Merapikan deklarasi tipe _Request/Response Payload_ yang digunakan oleh berbagai jalur API Next.js agar terstruktur dengan jelas.
4. **Custom Prisma Types:** Menyelaraskan dan menyusun tipe-tipe parsial hasil kueri kompleks (seperti data yang di-_join_/di-_include_) menggunakan utilitas `Prisma.<Model>GetPayload`.
5. **Pemusnahan Tipe `any`:** Memperbaiki setiap penggunaan tipe _escape hatch_ `any` sebisa mungkin menjadi tipe statis yang eksplisit dan akurat.

## Non-Functional Requirements

- Perubahan sama sekali tidak boleh mengganggu logika bisnis atau _runtime_ aplikasi.
- Seluruh barisan _Automated Tests_ (`vitest`) dan _Type checking/Build_ harus berhasil dijalankan (100% _pass_) setelah refaktorisasi usai.

## Out of Scope

- Penambahan fitur antarmuka atau integrasi logika _backend_ baru.
- Migrasi atau perubahan skema _database_ utama pada `schema.prisma`.
