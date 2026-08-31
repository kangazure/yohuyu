import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, ShoppingBag, Tag } from 'lucide-react';
import type { Product } from '@/data/types';
import { purchaseLink } from '@/data/products';
import { formatPrice } from '@/lib/utils';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { TiltCard } from '@/components/ui/TiltCard';

interface ProductDetailProps {
  product: Product;
}

export function ProductDetail({ product }: ProductDetailProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
      >
        <ArrowLeft size={14} />
        KEMBALI KE TOKO
      </Link>

      <div className="card-glass relative overflow-hidden rounded-2xl border border-line p-6 md:p-10">
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        {product.badge && (
          <span
            className={
              'absolute right-6 top-6 rounded-md px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest ' +
              (product.badge === 'BEST SELLER' || product.badge === 'PRIVATE'
                ? 'bg-neon text-void'
                : 'bg-accent text-white')
            }
          >
            {product.badge}
          </span>
        )}

        <div className="grid items-start gap-8 md:grid-cols-[auto_1fr]">
          <TiltCard maxTilt={10} scale={1.04}>
            <div className="mx-auto flex h-40 w-40 items-center justify-center rounded-2xl border border-line bg-surface-2/70 p-6 shadow-[0_0_40px_rgba(139,92,246,0.15)] md:mx-0">
              <Image
                src={product.logo}
                alt={product.name}
                width={120}
                height={120}
                className="h-auto w-full object-contain"
                unoptimized
              />
            </div>
          </TiltCard>

          <div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-accent">
              {product.category === 'premium' ? 'APLIKASI PREMIUM' : 'PRODUK SHOPEE'}
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-fg md:text-3xl">
              {product.name}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-navy/60 px-3 py-1.5 text-xs text-muted">
                <Tag size={12} className="text-accent/70" />
                {product.package}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-navy/60 px-3 py-1.5 text-xs text-muted">
                <Clock size={12} className="text-neon/70" />
                {product.duration}
              </span>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-line pt-6">
              <span className="text-3xl font-bold tracking-tight text-neon [text-shadow:0_0_24px_rgba(34,211,238,0.45)]">
                {formatPrice(product.price)}
              </span>
              <MagneticButton>
                <a
                  href={purchaseLink(product)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold tracking-[0.1em] text-white shadow-[0_0_32px_rgba(139,92,246,0.45)] transition-all hover:bg-accent-hover active:scale-[0.98]"
                >
                  <ShoppingBag size={16} />
                  BELI SEKARANG
                </a>
              </MagneticButton>
            </div>

            <p className="mt-4 text-[11px] text-faint">
              {product.category === 'shopee'
                ? 'Pembelian melalui toko Shopee resmi.'
                : 'Order via WhatsApp — proses cepat, dikirim setelah pembayaran terverifikasi.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
