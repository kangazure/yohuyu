import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import type { BlogMeta } from '@/data/types';
import { BLOG_CATEGORIES } from '@/lib/categories';

export interface HeadingsItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface BlogPost extends BlogMeta {
  /** HTML artikel hasil render markdown (SSG) */
  html: string;
  headings: HeadingsItem[];
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');
const WORDS_PER_MINUTE = 200;

function str(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function strList(value: unknown): string[] {
  return Array.isArray(value) ? value.map((v) => str(v)).filter(Boolean) : [];
}

function computeReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  return `${minutes} min`;
}

function extractHeadings(html: string): HeadingsItem[] {
  const items: HeadingsItem[] = [];
  const regex = /<h([23])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
  let match: RegExpExecArray | null;
  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]) as 2 | 3;
    const text = match[3].replace(/<[^>]+>/g, '').trim();
    if (text) items.push({ id: match[2], text, level });
  }
  return items;
}

function toMeta(slug: string, raw: string, fallbackTitle: string): BlogMeta {
  const { data, content } = matter(raw);
  const date = str(data.date) || str(data.updatedAt) || '2026-01-01';
  const title = str(data.title) || fallbackTitle;
  return {
    slug,
    title,
    description: str(data.description) || '',
    category: str(data.category) || 'TUTORIAL',
    tags: strList(data.tags),
    date,
    updatedAt: str(data.updatedAt) || date,
    author: str(data.author) || 'Riko Ardianto',
    cover: str(data.cover) || '/images/blog/default.svg',
    readingTime: str(data.readingTime) || computeReadingTime(content),
  };
}

function readRawPosts(): { slug: string; raw: string; title: string }[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => /\.mdx?$/.test(f))
    .map((file) => ({
      slug: file.replace(/\.mdx?$/, ''),
      raw: fs.readFileSync(path.join(BLOG_DIR, file), 'utf8'),
      title: file,
    }));
}

/** Semua artikel, diurutkan dari terbaru */
export function getAllPosts(): BlogMeta[] {
  return readRawPosts()
    .map((p) => toMeta(p.slug, p.raw, p.title))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const target = readRawPosts().find((p) => p.slug === slug);
  if (!target) return null;
  const { data, content } = matter(target.raw);
  const processed = remark()
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeSlug)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .processSync(content);
  const html = String(processed);
  return {
    ...toMeta(slug, target.raw, target.title),
    html,
    headings: extractHeadings(html),
  };
}

export interface CategoryCount {
  category: string;
  count: number;
}

/** Kategori yang dipakai artikel + jumlahnya (urutan mengikuti BLOG_CATEGORIES) */
export function getCategoriesWithCount(posts: BlogMeta[]): CategoryCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return BLOG_CATEGORIES.filter((c) => counts.has(c)).map((c) => ({
    category: c,
    count: counts.get(c) ?? 0,
  }));
}

/** Artikel lain dengan kategori sama (exclude post ini) */
export function getRelatedPosts(slug: string, category: string, limit = 3): BlogMeta[] {
  return getAllPosts()
    .filter((p) => p.slug !== slug && p.category === category)
    .slice(0, limit);
}

/** Artikel sebelum & sesudah berdasarkan urutan tanggal (dari terbaru) */
export function getAdjacentPosts(slug: string): { prev: BlogMeta | null; next: BlogMeta | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}
