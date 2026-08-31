import Link from 'next/link';
import { GitBranch, Camera, MessageCircle, Music2 } from 'lucide-react';
import { siteConfig } from '@/data/config';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line bg-navy/60">
      <div className="mx-auto max-w-7xl px-6 py-14 md:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          <div>
            <Link href="/" className="text-base font-bold tracking-[0.3em] text-fg">
              RIKO<span className="text-accent">ARDIANTO</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Online shop produk digital, blog teknologi networking &amp; cybersecurity, dan
              personal portfolio.
            </p>
            <p className="mt-5 font-mono text-[10px] tracking-widest text-faint">
              SECURE • CONNECT • BUILD
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.25em] text-faint">
              NAVIGASI
            </h4>
            <ul className="space-y-2.5">
              {siteConfig.navigation.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-muted transition-colors hover:text-accent">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.25em] text-faint">
              SHOP
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/shop" className="text-sm text-muted transition-colors hover:text-accent">
                  Semua Produk
                </Link>
              </li>
              <li>
                <Link href="/shop/premium" className="text-sm text-muted transition-colors hover:text-accent">
                  Aplikasi Premium
                </Link>
              </li>
              <li>
                <Link href="/shop/shopee" className="text-sm text-muted transition-colors hover:text-accent">
                  Shopee
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.25em] text-faint">
              KONTAK
            </h4>
            <div className="flex gap-3">
              <a
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="rounded-lg border border-line p-2.5 text-muted transition-all hover:border-accent/60 hover:text-accent"
              >
                <Camera size={16} />
              </a>
              <a
                href={siteConfig.socials.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="rounded-lg border border-line p-2.5 text-muted transition-all hover:border-accent/60 hover:text-accent"
              >
                <MessageCircle size={16} />
              </a>
              <a
                href={siteConfig.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="rounded-lg border border-line p-2.5 text-muted transition-all hover:border-accent/60 hover:text-accent"
              >
                <GitBranch size={16} />
              </a>
              <a
                href={siteConfig.socials.tiktok}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="rounded-lg border border-line p-2.5 text-muted transition-all hover:border-accent/60 hover:text-accent"
              >
                <Music2 size={16} />
              </a>
            </div>
            <p className="mt-4 text-xs text-faint">
              Email: <span className="font-mono">{siteConfig.email}</span>
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-line pt-6 md:flex-row">
          <p className="text-xs text-faint">
            © {year} {siteConfig.name}. Dibangun dengan Next.js &amp; Motion.
          </p>
          <p className="font-mono text-[10px] tracking-widest text-faint">
            ALL KEBUTUHAN DIGITAL
          </p>
        </div>
      </div>
    </footer>
  );
}
