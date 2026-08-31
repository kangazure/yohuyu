import type { MetadataRoute } from 'next';
import { products } from '@/data/products';
import { getAllPosts } from '@/lib/blog';
import { siteConfig } from '@/data/config';

const STATIC_ROUTES = ['', '/shop', '/shop/premium', '/shop/shopee', '/blog', '/kontak'];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.domain.replace(/\/$/, '');
  const now = new Date();

  const statics = STATIC_ROUTES.map((route) => ({
    url: `${base}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const productsSitemap = products.map((p) => ({
    url: `${base}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const postsSitemap = getAllPosts().map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...statics, ...productsSitemap, ...postsSitemap];
}
