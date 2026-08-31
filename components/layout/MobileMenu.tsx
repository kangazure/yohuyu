'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { cn } from '@/lib/utils';

interface MobileMenuProps {
  onClose: () => void;
}

/** Drawer navigasi mobile — overlay fullscreen dengan stagger links */
export function MobileMenu({ onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col bg-void/95 px-8 pb-10 pt-28 backdrop-blur-2xl md:hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      <nav className="flex flex-col gap-1">
        {siteConfig.navigation.map((l, i) => {
          const active = isActive(l.href);
          return (
            <motion.div
              key={l.href}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.08 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <Link
                href={l.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between border-b border-line py-4 text-2xl font-semibold tracking-widest transition-colors',
                  active ? 'text-accent' : 'text-fg hover:text-accent'
                )}
              >
                {l.label}
                {active && <ArrowRight size={20} className="text-neon" />}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      <motion.div
        className="mt-auto flex flex-col gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <Link
          href="/shop"
          onClick={onClose}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3.5 text-sm font-semibold tracking-[0.15em] text-white shadow-[0_0_32px_rgba(139,92,246,0.4)]"
        >
          <ShoppingBag size={16} />
          SHOP NOW
        </Link>
        <p className="text-center font-mono text-[10px] tracking-widest text-faint">
          SECURE • CONNECT • BUILD
        </p>
      </motion.div>
    </motion.div>
  );
}
