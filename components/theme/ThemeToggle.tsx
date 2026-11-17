'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

/** Tombol ganti tema gelap / terang — ikon matahari & bulan */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === 'dark';

  const toggle = () => setTheme(isDark ? 'light' : 'dark');

  // Hindari mismatch SSR vs client
  if (!mounted) {
    return (
      <button
        aria-label="Ganti tema"
        className={cn(
          'inline-flex items-center justify-center rounded-lg border border-line bg-surface/50 p-2 text-muted transition-all hover:border-accent/40 hover:text-accent',
          'backdrop-blur'
        )}
        onClick={toggle}
      >
        {/* sun placeholder saat SSR */}
        <SunIcon size={15} />
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Beralih ke mode terang' : 'Beralih ke mode gelap'}
      title={isDark ? 'Mode Terang' : 'Mode Gelap'}
      className={cn(
        'inline-flex items-center justify-center rounded-lg border p-2 transition-all duration-300 backdrop-blur',
        isDark
          ? 'border-line bg-surface/50 text-muted hover:border-accent/40 hover:text-accent'
          : 'border-line bg-surface/70 text-muted hover:border-neon/40 hover:text-neon'
      )}
    >
      {isDark ? <SunIcon size={15} /> : <MoonIcon size={15} />}
    </button>
  );
}

function SunIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}
