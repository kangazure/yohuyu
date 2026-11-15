import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import { getProductsByCategory } from '@/data/products';
import { siteConfig } from '@/data/config';
import { ProductGrid } from '@/components/shop/ProductGrid';

export const metadata: Metadata = {
  title: 'Toko Shopee',
  description:
    `Belanja melalui toko Shopee ${siteConfig.brand} — jasa digital dengan transaksi terjamin Shopee.`,
  alternates: { canonical: '/shop/shopee' },
};

export default function ShopShopeePage() {
  const products = getProductsByCategory('shopee');
  const isPlaceholder = siteConfig.shopeeUrl === 'YOUR_SHOPEE_URL';

  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-orange-500/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] tracking-[0.35em] text-orange-400">KATEGORI</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Toko <span className="text-orange-400">Shopee</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Belanja melalui toko Shopee. Transaksi dijamin oleh proteksi Shopee — aman untuk pembeli.
        </p>

        <div className="card-glass mt-8 inline-flex flex-wrap items-center gap-4 rounded-2xl border border-line p-6">
          <div>
            <p className="text-sm font-bold text-fg">Toko Resmi {siteConfig.brand}</p>
            <p className="mt-1 text-xs text-muted">
              {isPlaceholder
                ? 'Link toko belum diisi — hubungi admin untuk detail Shopee.'
                : 'Klik tombol di bawah untuk langsung menuju toko.'}
            </p>
          </div>
          <a
            href={siteConfig.shopeeUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-disabled={isPlaceholder}
            className={
              'inline-flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-semibold tracking-[0.12em] transition-all active:scale-[0.98] ' +
              (isPlaceholder
                ? 'pointer-events-none border border-line bg-surface/60 text-faint'
                : 'bg-orange-500 text-white shadow-[0_0_28px_rgba(249,115,22,0.4)] hover:bg-orange-600')
            }
          >
            <ExternalLink size={14} />
            BELI DI SHOPEE
          </a>
        </div>

        <div className="mt-12">
          <ProductGrid products={products} initialCategory="shopee" />
        </div>
      </div>
    </section>
  );
}
