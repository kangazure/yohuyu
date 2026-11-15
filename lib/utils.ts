import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format angka ke format rupiah tanpa desimal, mis. 8000 -> "Rp8.000" */
export function formatPrice(value: number): string {
  return 'Rp' + value.toLocaleString('id-ID');
}
