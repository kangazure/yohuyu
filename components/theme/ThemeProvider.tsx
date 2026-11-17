'use client';

import { useEffect, useState } from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ReactNode } from 'react';

/**
 * Tema global dengan dark/light mode.
 * - Baca localStorage segera sebelum render pertama agar tidak ada flash tema salah.
 * - Default ke "dark" bila belum pernah disimpan.
 */
const INITIAL_THEME = (() => {
  try {
    const stored = window.localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') return stored;
  } catch {}
  return 'dark';
})();

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // SSR / pertama kali render: jangan biarkan next-themes mengubah DOM
    // langsung pasang class dari INITIAL_THEME agar tidak ada FOUC
    document.documentElement.setAttribute('data-theme', INITIAL_THEME);
    return <>{children}</>;
  }

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
