import type { BlogMeta } from '@/data/types';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: BlogMeta[];
}

export function BlogGrid({ posts }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="mt-12 rounded-2xl border border-dashed border-line py-20 text-center">
        <p className="text-sm text-muted">Tidak ada artikel yang cocok — coba kata kunci lain.</p>
      </div>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
