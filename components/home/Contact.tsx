import Link from 'next/link';
import Image from 'next/image';
import { GitBranch, Camera, Mail, MessageCircle, Music2, ShieldCheck } from 'lucide-react';
import { siteConfig, HERO_ROLES } from '@/data/config';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';

const CHANNELS = [
  {
    label: 'WhatsApp',
    desc: 'Order produk digital — respons cepat',
    href: siteConfig.socials.whatsapp,
    icon: MessageCircle,
    accent: 'text-neon',
  },
  {
    label: 'Instagram',
    desc: 'Update produk & konten harian',
    href: siteConfig.socials.instagram,
    icon: Camera,
    accent: 'text-accent',
  },
  {
    label: 'GitHub',
    desc: 'Kode project & eksperimen',
    href: siteConfig.socials.github,
    icon: GitBranch,
    accent: 'text-fg',
  },
  {
    label: 'TikTok',
    desc: 'Konten seputar teknologi',
    href: siteConfig.socials.tiktok,
    icon: Music2,
    accent: 'text-neon',
  },
];

export function Contact() {
  return (
    <section id="kontak" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <ScrollReveal>
            <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">
              04 // KONTAK
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
              Riko Ardianto
            </h2>
            <div className="mt-6 rounded-2xl border border-line bg-surface/40 p-6 md:p-8">
              <div className="flex items-center gap-4">
                <Image
                  src="/images/profile/riko-ardianto.svg"
                  alt="Riko Ardianto"
                  width={64}
                  height={64}
                  className="h-16 w-16 rounded-full border border-accent/40 object-cover"
                  unoptimized
                />
                <div>
                  <p className="font-mono text-[11px] tracking-widest text-faint">RIKOARDIANTO</p>
                  <p className="text-sm text-fg">Online Shop • Networking • Cybersecurity</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2">
                {HERO_ROLES.map((role) => (
                  <span
                    key={role}
                    className="rounded-md border border-line bg-navy/60 px-2.5 py-1 text-[11px] text-muted"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="mt-6 inline-flex items-center gap-2 rounded-lg border border-neon/30 bg-neon/5 px-3 py-2 text-xs text-neon">
                <ShieldCheck size={14} />
                Transaksi aman — jangan pernah share OTP / PIN
              </div>
            </div>
          </ScrollReveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {CHANNELS.map((c, i) => (
              <ScrollReveal key={c.label} delay={0.07 * i}>
                <a
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-glass group flex h-full flex-col rounded-2xl border border-line p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_16px_40px_-16px_rgba(139,92,246,0.35)]"
                >
                  <c.icon size={22} className={c.accent} />
                  <h3 className="mt-4 text-sm font-bold tracking-wider text-fg transition-colors group-hover:text-accent">
                    {c.label}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">{c.desc}</p>
                </a>
              </ScrollReveal>
            ))}
            <ScrollReveal delay={0.28} className="sm:col-span-2">
              <div className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-line bg-surface/40 p-6 sm:flex-row sm:items-center">
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-accent" />
                  <div>
                    <p className="text-xs text-faint">EMAIL (placeholder — segera aktif)</p>
                    <p className="font-mono text-sm text-muted">{siteConfig.email}</p>
                  </div>
                </div>
                <MagneticButton>
                  <Link
                    href={siteConfig.socials.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-xs font-semibold tracking-[0.15em] text-white shadow-[0_0_28px_rgba(139,92,246,0.4)] transition-colors hover:bg-accent-hover"
                  >
                    <MessageCircle size={14} />
                    ORDER SEKARANG
                  </Link>
                </MagneticButton>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
