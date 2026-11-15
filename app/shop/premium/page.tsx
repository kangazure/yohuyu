import type { Metadata } from 'next';
import { getProductsByCategory } from '@/data/products';
import { siteConfig } from '@/data/config';
import { ProductGrid } from '@/components/shop/ProductGrid';

export const metadata: Metadata = {
  title: 'Aplikasi Premium',
  description:
    `Aplikasi premium murah — ${siteConfig.brand} : Netflix, Spotify, YouTube, Canva, CapCut, dan lainnya.`,
  alternates: { canonical: '/shop/premium' },
};

export default function ShopPremiumPage() {
  const products = getProductsByCategory('premium');
  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-neon/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] tracking-[0.35em] text-neon">KATEGORI</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Aplikasi <span className="text-accent">Premium</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Akun premium dari aplikasi favoritmu dengan harga terbaik. Order via WhatsApp — setelah
          pembayaran terverifikasi, data dikirim secepatnya.
        </p>
        <p className="mt-2 font-mono text-[10px] tracking-widest text-faint">
          {products.length} PRODUK TERSEDIA
        </p>

        <div className="mt-12">
          <ProductGrid products={products} initialCategory="premium" />
        </div>
      </div>
    </section>
  );
}
