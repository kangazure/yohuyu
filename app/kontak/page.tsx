import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Camera,
  GitBranch,
  MessageCircle,
  Music2,
  Mail,
  ShieldCheck,
  BadgeCheck,
  Network,
  Lock,
} from 'lucide-react';
import { siteConfig } from '@/data/config';
import { MagneticButton } from '@/components/ui/MagneticButton';

export const metadata: Metadata = {
  title: 'Kontak',
  description:
    `Hubungi ${siteConfig.brand} — order produk digital, konsultasi networking, dan diskusi cybersecurity.`,
  alternates: { canonical: '/kontak' },
};

const channels = [
  {
    key: 'whatsapp',
    label: 'WhatsApp',
    hint: 'Order & harga tercepat',
    href: siteConfig.socials.whatsapp,
    icon: MessageCircle,
    iconColor: 'text-emerald-400',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    hint: '@skuyyy_y7',
    href: siteConfig.socials.instagram,
    icon: Camera,
    iconColor: 'text-pink-400',
  },
  {
    key: 'github',
    label: 'GitHub',
    hint: 'kangazure',
    href: siteConfig.socials.github,
    icon: GitBranch,
    iconColor: 'text-fg',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    hint: '@warung_sosmed',
    href: siteConfig.socials.tiktok,
    icon: Music2,
    iconColor: 'text-neon',
  },
];

export default function KontakPage() {
  return (
    <section className="relative pt-32 pb-24">
      <div className="pointer-events-none absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6">
        <p className="font-mono text-[10px] tracking-[0.35em] text-neon">HUBUNGI SAYA</p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-fg md:text-4xl">
          Mari <span className="text-accent">Terhubung</span>
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
          Ada pertanyaan soal produk, butuh bantuan jaringan, atau mau diskusi keamanan siber?
          Pilih saluran yang paling nyaman.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[380px_minmax(0,1fr)]">
          {/* kartu profil */}
          <div className="card-glass relative overflow-hidden rounded-2xl border border-line p-8 text-center">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-neon/10 blur-3xl" />

            <div className="mx-auto flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-2 border-accent/60 bg-surface-2 shadow-[0_0_36px_rgba(139,92,246,0.35)]">
              <Image
                src="/images/profile/riko-ardianto.svg"
                alt={siteConfig.brand}
                width={96}
                height={96}
                className="h-full w-full object-cover"
                unoptimized
              />
            </div>

            <h2 className="mt-5 text-xl font-bold tracking-tight text-fg">{siteConfig.brand}</h2>
            <p className="mt-1 font-mono text-[10px] tracking-[0.3em] text-accent">
              ONLINE SHOP • NETWORKING • CYBER SECURITY
            </p>

            <div className="mt-6 flex flex-col gap-2.5 text-left">
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <BadgeCheck size={15} className="shrink-0 text-neon" />
                Online shop produk digital — proses cepat & terpercaya
              </p>
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <Network size={15} className="shrink-0 text-accent" />
                Fokus bidang networking & infrastruktur ISP
              </p>
              <p className="flex items-center gap-2.5 text-xs text-muted">
                <Lock size={15} className="shrink-0 text-neon" />
                Perhatian pada keamanan siber & praktik aman
              </p>
            </div>

            {/* email placeholder sampai email resmi tersedia */}
            <div className="mt-6 rounded-xl border border-dashed border-line bg-navy/60 p-4">
              <p className="flex items-center justify-center gap-2 text-xs text-muted">
                <Mail size={13} className="text-faint" />
                {siteConfig.email === 'YOUR_EMAIL' ? (
                  <span className="font-mono text-[10px] text-faint">
                    EMAIL BELUM TERSEDIA — HUBUNGI VIA WHATSAPP
                  </span>
                ) : (
                  siteConfig.email
                )}
              </p>
            </div>
          </div>

          {/* saluran kontak */}
          <div className="flex flex-col gap-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {channels.map((c) => (
                <a
                  key={c.key}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass group flex items-center gap-4 rounded-2xl border border-line p-5 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-2/70 transition-colors group-hover:border-accent/50">
                    <c.icon size={20} className={c.iconColor} />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-fg transition-colors group-hover:text-accent">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block text-[11px] text-muted">{c.hint}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className="card-glass rounded-2xl border border-line p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-neon">
                <ShieldCheck size={14} />
                TRANSAKSI AMAN
              </p>
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Selalu transaksi melalui saluran resmi dan jangan pernah membagikan OTP, PIN, atau
                kode verifikasi kepada siapa pun — termasuk yang mengaku dari tim kami.
              </p>
              <div className="mt-5">
                <MagneticButton>
                  <a
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-xs font-semibold tracking-[0.12em] text-white shadow-[0_0_28px_rgba(139,92,246,0.4)] transition-all hover:bg-accent-hover active:scale-[0.98] sm:w-auto"
                  >
                    <MessageCircle size={15} />
                    ORDER VIA WHATSAPP
                  </a>
                </MagneticButton>
              </div>
            </div>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 self-start text-xs font-semibold tracking-[0.15em] text-muted transition-colors hover:text-accent"
            >
              BACA ARTIKEL DULU
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
