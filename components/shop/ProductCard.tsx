'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Clock, ShoppingBag, Tag } from 'lucide-react';
import type { Product } from '@/data/types';
import { purchaseLink } from '@/data/products';
import { formatPrice } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="card-glass group relative flex flex-col overflow-hidden rounded-2xl border border-line p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_44px_-18px_rgba(139,92,246,0.4)]">
      {product.badge && (
        <span
          className={
            'absolute right-4 top-4 z-10 rounded-md px-2 py-1 font-mono text-[9px] font-bold tracking-widest ' +
            (product.badge === 'BEST SELLER' || product.badge === 'PRIVATE'
              ? 'bg-neon text-void'
              : 'bg-accent text-white')
          }
        >
          {product.badge}
        </span>
      )}

      <div className="flex items-start justify-between gap-3">
        <Link href={`/shop/${product.slug}`} className="shrink-0 transition-transform duration-300 group-hover:scale-105">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-line bg-surface-2/60 p-2">
            <Image
              src={product.logo}
              alt={product.name}
              width={44}
              height={44}
              className="h-auto w-full object-contain"
              unoptimized
            />
          </div>
        </Link>
        <span className="font-mono text-[9px] tracking-widest text-faint">
          {product.category === 'premium' ? 'PREMIUM' : 'SHOPEE'}
        </span>
      </div>

      <Link href={`/shop/${product.slug}`} className="mt-4">
        <h3 className="text-sm font-bold leading-snug text-fg transition-colors group-hover:text-accent">
          {product.name}
        </h3>
      </Link>

      <div className="mt-2.5 space-y-1.5">
        <p className="flex items-center gap-1.5 text-[11px] text-faint">
          <Tag size={11} className="text-accent/70" />
          {product.package}
        </p>
        <p className="flex items-center gap-1.5 text-[11px] text-faint">
          <Clock size={11} className="text-neon/70" />
          {product.duration}
        </p>
      </div>

      <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted">
        {product.description}
      </p>

      <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
        <span className="text-lg font-bold tracking-tight text-neon [text-shadow:0_0_16px_rgba(34,211,238,0.4)]">
          {formatPrice(product.price)}
        </span>
      </div>

      <a
        href={purchaseLink(product)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent/90 px-4 py-2.5 text-[11px] font-semibold tracking-[0.12em] text-white transition-all hover:bg-accent hover:shadow-[0_0_24px_rgba(139,92,246,0.5)] active:scale-[0.98]"
      >
        <ShoppingBag size={13} />
        BELI SEKARANG
      </a>
    </div>
  );
}
