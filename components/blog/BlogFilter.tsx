'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { CategoryCount } from '@/lib/blog';

interface BlogFilterProps {
  categories: CategoryCount[];
}

/** Filter kategori artikel — sinkron ke URL (?cat=…) */
export function BlogFilter({ categories }: BlogFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = new URLSearchParams(searchParams.toString());
  const active = current.get('cat');

  function select(cat: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (cat) params.set('cat', cat);
    else params.delete('cat');
    params.delete('q');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  const allCount = categories.reduce((sum, c) => sum + c.count, 0);

  return (
    <div className={cn('flex flex-wrap gap-2', isPending && 'pointer-events-none opacity-60')} role="group" aria-label="Filter kategori artikel">
      <button
        type="button"
        onClick={() => select(null)}
        className={cn(
          'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] transition-all duration-300',
          active === null
            ? 'border-accent bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]'
            : 'border-line bg-surface/60 text-muted hover:border-accent/50 hover:text-fg'
        )}
      >
        SEMUA ({allCount})
      </button>
      {categories.map((c) => {
        const isActive = active === c.category;
        return (
          <button
            key={c.category}
            type="button"
            onClick={() => select(isActive ? null : c.category)}
            className={cn(
              'rounded-full border px-4 py-2 text-[11px] font-semibold tracking-[0.12em] transition-all duration-300',
              isActive
                ? 'border-accent bg-accent text-white shadow-[0_0_20px_rgba(139,92,246,0.45)]'
                : 'border-line bg-surface/60 text-muted hover:border-accent/50 hover:text-fg'
            )}
          >
            {c.category} ({c.count})
          </button>
        );
      })}
    </div>
  );
}
