import Link from 'next/link';
import { TerminalSquare } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center px-6 pt-24">
      <div className="text-center">
        <p className="font-mono text-[10px] tracking-[0.35em] text-neon">ERROR 404</p>
        <h1 className="mt-4 text-6xl font-bold tracking-tight text-fg md:text-7xl">
          <span className="text-accent">4</span>
          <span className="text-neon">0</span>
          <span className="text-accent">4</span>
        </h1>
        <p className="mx-auto mt-6 max-w-sm text-sm leading-relaxed text-muted">
          Halaman yang kamu cari tidak ditemukan — mungkin sudah dipindah atau alamatnya salah.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-semibold tracking-[0.12em] text-white transition-all hover:bg-accent-hover"
          >
            <TerminalSquare size={15} />
            KE BERANDA
          </Link>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 rounded-xl border border-line px-6 py-3 text-xs font-semibold tracking-[0.12em] text-muted transition-colors hover:border-accent/50 hover:text-fg"
          >
            KE SHOP
          </Link>
        </div>
      </div>
    </section>
  );
}
