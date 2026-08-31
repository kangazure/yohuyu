import { products } from '@/data/products';
import { getAllPosts } from '@/lib/blog';
import { Hero } from '@/components/home/Hero';
import { About } from '@/components/home/About';
import { Skills } from '@/components/home/Skills';
import { Projects } from '@/components/home/Projects';
import { Contact } from '@/components/home/Contact';
import { ProductCard } from '@/components/shop/ProductCard';
import { BlogCard } from '@/components/blog/BlogCard';

export default function HomePage() {
  const featuredProducts = products.filter((p) => p.badge).slice(0, 4);
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <About />

      <Skills />

      <Projects />

      {/* produk unggulan */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] text-neon">PILIHAN TERLARIS</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg md:text-3xl">
                Produk <span className="text-accent">Unggulan</span>
              </h2>
            </div>
            <a
              href="/shop"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-muted transition-colors hover:text-accent"
            >
              LIHAT SEMUA
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* artikel terbaru */}
      <section className="relative py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-[10px] tracking-[0.35em] text-neon">TULISAN TERBARU</p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-fg md:text-3xl">
                Dari <span className="text-accent">Blog</span>
              </h2>
            </div>
            <a
              href="/blog"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.15em] text-muted transition-colors hover:text-accent"
            >
              SEMUA ARTIKEL
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {latestPosts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  );
}
