'use client';

import { useMemo, useState } from 'react';
import { SearchX } from 'lucide-react';
import type { Product, ProductCategory } from '@/data/types';
import { SHOP_CATEGORIES } from '@/lib/categories';
import { ProductCard } from './ProductCard';
import { ProductFilter } from './ProductFilter';
import { ProductSearch } from './ProductSearch';

export type SortKey = 'rekomendasi' | 'harga-termurah' | 'harga-termahal' | 'nama';

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'rekomendasi', label: 'Rekomendasi' },
  { key: 'harga-termurah', label: 'Harga Terendah' },
  { key: 'harga-termahal', label: 'Harga Tertinggi' },
  { key: 'nama', label: 'Nama A-Z' },
];

interface ProductGridProps {
  products: Product[];
  /** kategori awal (untuk halaman premium/shopee) */
  initialCategory?: ProductCategory | 'all';
}

/** Grid produk + orchestrator search/filter/sort (client — data kecil, semua reaktif) */
export function ProductGrid({ products, initialCategory = 'all' }: ProductGridProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ProductCategory | 'all'>(initialCategory);
  const [sort, setSort] = useState<SortKey>('rekomendasi');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== 'all' && p.category !== category) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.package.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    });
    switch (sort) {
      case 'harga-termurah':
        list = [...list].sort((a, b) => a.price - b.price);
        break;
      case 'harga-termahal':
        list = [...list].sort((a, b) => b.price - a.price);
        break;
      case 'nama':
        list = [...list].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return list;
  }, [products, query, category, sort]);

  return (
    <div>
      {/* toolbar */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <ProductFilter
          categories={SHOP_CATEGORIES}
          active={category}
          onSelect={(key) => setCategory(key as ProductCategory | 'all')}
        />
        <div className="flex items-center gap-3">
          <ProductSearch value={query} onChange={setQuery} />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Urutkan produk"
            className="select-ghost h-11 rounded-xl border border-line bg-surface/60 px-3 text-xs text-fg outline-none transition-colors hover:border-accent/50 focus:border-accent/70"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.key} value={o.key} className="bg-navy text-fg">
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-6 font-mono text-[11px] tracking-widest text-faint">
        {filtered.length} PRODUK DITEMUKAN
      </p>

      {filtered.length === 0 ? (
        <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-dashed border-line py-20 text-center">
          <SearchX size={32} className="text-faint" />
          <p className="text-sm text-muted">Produk tidak ditemukan — coba kata kunci lain.</p>
        </div>
      ) : (
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
