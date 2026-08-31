'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { ShoppingBag } from 'lucide-react';
import { siteConfig } from '@/data/config';
import { cn } from '@/lib/utils';
import { MobileMenu } from './MobileMenu';

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span className="relative block h-4 w-5" aria-hidden="true">
      <span
        className={cn(
          'absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition-all duration-300',
          open && 'top-1/2 -translate-y-1/2 rotate-45'
        )}
      />
      <span
        className={cn(
          'absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rounded-full bg-current transition-opacity duration-300',
          open && 'opacity-0'
        )}
      />
      <span
        className={cn(
          'absolute bottom-0 left-0 h-[2px] w-full rounded-full bg-current transition-all duration-300',
          open && 'bottom-1/2 translate-y-1/2 -rotate-45'
        )}
      />
    </span>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-all duration-500',
          scrolled
            ? 'border-b border-line bg-void/75 shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        )}
      >
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
          <Link
            href="/"
            className="text-sm font-bold tracking-[0.3em] text-fg transition-opacity hover:opacity-80 md:text-base"
          >
            RIKO<span className="text-accent">ARDIANTO</span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {siteConfig.navigation.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    'relative rounded-md px-4 py-2 text-xs font-medium tracking-[0.15em] transition-colors',
                    active ? 'text-fg' : 'text-muted hover:text-fg'
                  )}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-4 -bottom-px h-px bg-gradient-to-r from-accent to-neon"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <a
              href={siteConfig.shopUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg bg-accent px-4 py-2 text-[11px] font-semibold tracking-[0.15em] text-white shadow-[0_0_24px_rgba(139,92,246,0.4)] transition-all hover:bg-accent-hover hover:shadow-[0_0_32px_rgba(139,92,246,0.55)] md:inline-flex"
            >
              <ShoppingBag size={13} />
              SHOP NOW
            </a>
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              className="rounded-md p-2 text-fg transition-colors hover:text-accent md:hidden"
            >
              <HamburgerIcon open={open} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>{open && <MobileMenu onClose={() => setOpen(false)} />}</AnimatePresence>
    </>
  );
}
