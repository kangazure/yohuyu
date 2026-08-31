'use client';

import { TriangleAlert } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-24">
      <div className="text-center">
        <p className="flex items-center justify-center gap-2 font-mono text-[10px] tracking-[0.35em] text-red-400">
          <TriangleAlert size={14} />
          TERJADI KESALAHAN
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg">Hmm, ada yang tidak beres.</h1>
        <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-muted">
          {error.message || 'Terjadi kesalahan tak terduga. Coba muat ulang halaman ini.'}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-semibold tracking-[0.12em] text-white transition-all hover:bg-accent-hover"
        >
          MUAT ULANG
        </button>
      </div>
    </section>
  );
}
