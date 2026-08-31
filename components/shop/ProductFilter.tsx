'use client';

import { cn } from '@/lib/utils';

interface CategoryChip {
  key: string;
  label: string;
}

interface ProductFilterProps {
  categories: CategoryChip[];
  active: string;
  onSelect: (key: string) => void;
}

/** Chips filter kategori produk */
export function ProductFilter({ categories, active, onSelect }: ProductFilterProps) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
      {categories.map((c) => {
        const isActive = active === c.key;
        return (
          <button
            key={c.key}
            type="button"
            onClick={() => onSelect(c.key)}
            className={cn(
              'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] transition-all duration-300',
              isActive
                ? 'border-accent bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]'
                : 'border-line bg-surface/60 text-muted hover:border-accent/50 hover:text-fg'
            )}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}
