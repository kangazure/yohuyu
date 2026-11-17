'use client';

import { useEffect } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Tema global dengan dark/light mode.
 *
 * Masalah lama: menggunakan state + useEffect untuk menentukan tema saat SSR
 * menyebabkan HTML yang dirender server berbeda dengan client → React error #441.
 *
 * Solusi: pasang data-theme="dark" / "light" ke <html> secara sinkron sebelum
 * DOM pertama kali dirender, lalu biarkan NextThemesProvider mengatur setelahnya.
 */
const INITIAL_THEME = (() => {
  try {
    const stored = window?.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'dark';
})();

// Pasang langsung ke <html> sebelum React mulai merender — mencegah FOUC & mismatch
if (typeof document !== 'undefined') {
  document.documentElement.setAttribute('data-theme', INITIAL_THEME);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Pastikan tema terakhir dari localStorage tetap aktif (jika ada)
    const stored = window.localStorage.getItem('theme');
    if (stored && stored !== INITIAL_THEME) {
      document.documentElement.setAttribute('data-theme', stored);
    }
  }, []);

  return (
    <NextThemesProvider
      attribute="data-theme"
      defaultTheme={INITIAL_THEME}
      enableSystem={false}
      storageKey="theme"
    >
      {children}
    </NextThemesProvider>
  );
}
