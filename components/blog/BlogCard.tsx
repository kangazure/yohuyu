import Link from 'next/link';
import Image from 'next/image';
import { CalendarDays, Clock } from 'lucide-react';
import type { BlogMeta } from '@/data/types';

interface BlogCardProps {
  post: BlogMeta;
  /** prioritas image (kartu featured di homepage) */
  priority?: boolean;
}

export function BlogCard({ post, priority = false }: BlogCardProps) {
  const date = new Date(post.date).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-glass group flex flex-col overflow-hidden rounded-2xl border border-line transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_44px_-18px_rgba(139,92,246,0.4)]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-surface-2">
        <Image
          src={post.cover}
          alt={post.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <span className="absolute left-3 top-3 rounded-md bg-void/85 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest text-neon backdrop-blur">
          {post.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-base font-bold leading-snug text-fg transition-colors group-hover:text-accent">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted">{post.description}</p>

        <div className="mt-4 flex items-center gap-4 border-t border-line pt-4 text-[11px] text-faint">
          <span className="inline-flex items-center gap-1.5">
            <CalendarDays size={12} className="text-accent/70" />
            {date}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={12} className="text-neon/70" />
            {post.readingTime}
          </span>
        </div>
      </div>
    </Link>
  );
}
