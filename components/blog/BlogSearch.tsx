'use client';

import { useTransition } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

/** Pencarian artikel — sinkron ke URL (?q=…) supaya bisa di-share */
export function BlogSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const current = new URLSearchParams(searchParams.toString());
  const value = current.get('q') ?? '';

  function update(next: string) {
    const params = new URLSearchParams(current.toString());
    if (next.trim()) params.set('q', next.trim());
    else params.delete('q');
    params.delete('cat');
    startTransition(() => {
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    });
  }

  return (
    <div className="relative w-full lg:w-72">
      <Search size={15} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint" />
      <input
        type="search"
        defaultValue={value}
        onChange={(e) => update(e.target.value)}
        placeholder="Cari artikel…"
        aria-label="Cari artikel"
        className="h-11 w-full rounded-xl border border-line bg-surface/60 pl-10 pr-4 text-xs text-fg placeholder:text-faint outline-none transition-colors focus:border-accent/70"
      />
      {isPending && (
        <span className="absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 animate-spin rounded-full border border-neon border-t-transparent" />
      )}
    </div>
  );
}
