import { cn } from '@/lib/utils';
import type { HeadingsItem } from '@/lib/blog';

/** Daftar isi artikel (render server) — scrollspy dijalankan client */
export function TableOfContents({ headings }: { headings: HeadingsItem[] }) {
  if (headings.length === 0) return null;
  return (
    <nav aria-label="Daftar isi" className="rounded-2xl border border-line bg-surface/50 p-5">
      <p className="mb-3 font-mono text-[10px] tracking-[0.3em] text-accent">DAFTAR ISI</p>
      <ol className="space-y-2">
        {headings.map((h) => (
          <li key={h.id} className={cn(h.level === 3 && 'pl-4')}>
            <a href={`#${h.id}`} className="text-xs leading-relaxed text-muted transition-colors hover:text-neon">
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
