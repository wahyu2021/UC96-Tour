import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatRupiah(value: string | number | null | undefined): string {
  if (!value) return '';
  const strVal = String(value).trim();
  
  // Jika nilai mengandung huruf selain angka (misal "10 Juta", "Rp 10.000"), kembalikan aslinya
  if (isNaN(Number(strVal))) {
    return strVal;
  }
  
  const num = Number(strVal);
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
