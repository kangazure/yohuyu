import Image from 'next/image';
import type { Technology } from '@/data/types';
import { cn } from '@/lib/utils';

interface TechnologyIconsProps {
  items: Technology[];
  className?: string;
}

/** Grid ikon teknologi (monogram svg) — data dari data/technologies.ts */
export function TechnologyIcons({ items, className }: TechnologyIconsProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map((t) => (
        <span
          key={t.name}
          title={t.name}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3 py-1.5 transition-colors hover:border-accent/50"
        >
          <Image
            src={t.icon}
            alt=""
            width={18}
            height={18}
            className="h-[18px] w-[18px] object-contain"
            unoptimized
          />
          <span className="text-xs text-muted">{t.name}</span>
        </span>
      ))}
    </div>
  );
}
