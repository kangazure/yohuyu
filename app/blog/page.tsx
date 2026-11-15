import type { Metadata } from 'next';
import { Suspense } from 'react';
import { getAllPosts, getCategoriesWithCount } from '@/lib/blog';
import { siteConfig } from '@/data/config';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { BlogSearch } from '@/components/blog/BlogSearch';
import { BlogFilter } from '@/components/blog/BlogFilter';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    `Artikel ${siteConfig.brand} — tutorial networking, MikroTik, GPON/OLT, cyber security, Kali Linux, Docker, web development, dan cara membeli produk digital dengan aman.`,
  alternates: { canonical: '/blog' },
};

interface Props {
  searchParams: Promise<{ q?: string; cat?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const { q, cat } = await searchParams;
  const all = getAllPosts();
  const categories = getCategoriesWithCount(all);

  const query = q?.trim().toLowerCase() ?? '';
  const filtered = all.filter((post) => {
    if (cat && post.category !== cat) return false;
    if (!query) return true;
    return (
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.tags.some((t) => t.toLowerCase().includes(query))
    );
  });

  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 left-1/3 h-96 w-96 rounded-full bg-neon/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-mono text-[10px] tracking-[0.35em] text-neon">BLOG TEKNOLOGI</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg md:text-4xl">
              Artikel & <span className="text-accent">Tutorial</span>
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
              Catatan tentang jaringan, keamanan siber, Linux, dan pengembangan web — ditulis
              langsung dari pengalaman lapangan.
            </p>
          </div>
          <Suspense fallback={<div className="h-11 w-72 rounded-xl border border-line bg-surface/60" />}>
            <BlogSearch />
          </Suspense>
        </div>

        <div className="mt-10">
          <Suspense fallback={<div className="h-10 w-full rounded-full border border-line bg-surface/60" />}>
            <BlogFilter categories={categories} />
          </Suspense>
        </div>

        <p className="mt-8 font-mono text-[11px] tracking-widest text-faint">
          {filtered.length} ARTIKEL DITEMUKAN
        </p>

        <div className="mt-6">
          <BlogGrid posts={filtered} />
        </div>
      </div>
    </section>
  );
}
