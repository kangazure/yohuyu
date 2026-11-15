'use client';

import { Search } from 'lucide-react';

interface ProductSearchProps {
  value: string;
  onChange: (value: string) => void;
}

/** Input pencarian produk */
export function ProductSearch({ value, onChange }: ProductSearchProps) {
  return (
    <div className="relative w-full lg:w-64">
      <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Cari produk…"
        aria-label="Cari produk"
        className="h-11 w-full rounded-xl border border-line bg-surface/60 pl-10 pr-4 text-xs text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/70"
      />
    </div>
  );
}
