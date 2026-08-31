import type { Metadata } from 'next';
import { products } from '@/data/products';
import { siteConfig } from '@/data/config';
import { ProductGrid } from '@/components/shop/ProductGrid';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    `Online shop ${siteConfig.brand} — aplikasi premium (Netflix, Spotify, Canva, CapCut, dan lainnya) plus jasa digital. Harga mulai ratusan rupiah.`,
  alternates: { canonical: '/shop' },
};

export default function ShopPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] tracking-[0.35em] text-neon">ONLINE SHOP</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Semua Kebutuhan <span className="text-accent">Digital</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Aplikasi premium, jasa boosting, dan produk digital lainnya — proses cepat, harga
          bersahabat. Gunakan pencarian atau filter untuk menemukan produkmu.
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-widest text-faint">
          {products.length} PRODUK TERSEDIA
        </p>

        <div className="mt-12">
          <ProductGrid products={products} />
        </div>
      </div>
    </section>
  );
}
