import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from 'lucide-react';
import {
  getAllPosts,
  getPostBySlug,
  getRelatedPosts,
  getAdjacentPosts,
} from '@/lib/blog';
import { siteConfig } from '@/data/config';
import { CodeEnhancer } from '@/components/blog/CodeEnhancer';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { BlogCard } from '@/components/blog/BlogCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: 'Artikel Tidak Ditemukan' };
  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: `${post.title} — ${siteConfig.brand}`,
      description: post.description,
      url: `/blog/${post.slug}`,
      images: [{ url: post.cover, width: 1200, height: 630, alt: post.title }],
      publishedTime: post.date,
      modifiedTime: post.updatedAt,
      tags: post.tags,
    },
    alternates: { canonical: `/blog/${post.slug}` },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(slug, post.category, 3);
  const { prev, next } = getAdjacentPosts(slug);
  const date = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section className="relative pt-32 pb-24">
      <ReadingProgress />

      <article className="mx-auto max-w-6xl px-6">
        {/* header artikel */}
        <header className="max-w-3xl">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
          >
            <ArrowLeft size={14} />
            SEMUA ARTIKEL
          </Link>

          <span className="mt-6 inline-block rounded-md border border-neon/30 bg-neon/5 px-2.5 py-1 font-mono text-[10px] font-bold tracking-widest text-neon">
            {post.category}
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-fg md:text-4xl">
            {post.title}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{post.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-5 border-b border-line pb-6 text-[11px] text-faint">
            <span className="inline-flex items-center gap-1.5">
              <User size={12} className="text-accent/70" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays size={12} className="text-accent/70" />
              {date}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} className="text-neon/70" />
              {post.readingTime} baca
            </span>
          </div>
        </header>

        {/* cover */}
        <div className="relative mt-8 aspect-[21/9] overflow-hidden rounded-2xl border border-line bg-surface-2">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1152px) 100vw, 1152px"
            className="object-cover"
            unoptimized
          />
        </div>

        {/* body + daftar isi */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <CodeEnhancer html={post.html} />

            {post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-line pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-line bg-surface/60 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-muted"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <TableOfContents headings={post.headings} />
            </div>
          </aside>
        </div>

        {/* artikel terkait */}
        {related.length > 0 && (
          <div className="mt-16 border-t border-line pt-12">
            <p className="font-mono text-[10px] tracking-[0.35em] text-neon">LANJUTKAN BACA</p>
            <h2 className="mt-2 text-xl font-bold tracking-tight text-fg">
              Artikel Terkait
            </h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <BlogCard key={r.slug} post={r} />
              ))}
            </div>
          </div>
        )}

        {/* prev / next */}
        {(prev || next) && (
          <nav className="mt-14 grid gap-4 border-t border-line pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="card-glass group flex flex-col gap-2 rounded-2xl border border-line p-5 transition-all hover:border-accent/50"
              >
                <span className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-faint">
                  <ArrowLeft size={12} className="transition-transform group-hover:-translate-x-1" />
                  SEBELUMNYA
                </span>
                <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {prev.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="card-glass group flex flex-col gap-2 rounded-2xl border border-line p-5 text-right transition-all hover:border-accent/50"
              >
                <span className="flex items-center justify-end gap-2 font-mono text-[10px] tracking-widest text-faint">
                  SELANJUTNYA
                  <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                </span>
                <span className="text-sm font-semibold text-fg transition-colors group-hover:text-accent">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </article>
    </section>
  );
}
