import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TechnologyIcons } from '@/components/ui/TechnologyIcons';
import { technologies } from '@/data/technologies';
import { HERO_ROLES } from '@/data/config';

export function About() {
  return (
    <section id="tentang" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_1fr]">
          <ScrollReveal>
            <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">
              01 // TENTANG
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
              Network Engineer &amp; Cybersecurity Enthusiast
            </h2>
            <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-muted">
              <p>
                Saya <strong className="text-fg">Riko Ardianto</strong> — fokus bekerja di dunia
                jaringan dan keamanan siber: memahami cara sebuah jaringan dibangun, diamankan,
                dan dijaga tetap sehat. Mulai dari subnetting, VLAN, routing, sampai jaringan
                FTTH berbasis GPON yang menghubungkan satu per satu pelanggan internet.
              </p>
              <p>
                Di sisi pengembangan, saya membangun solusi digital — website, dashboard
                monitoring, sampai produk digital yang bisa langsung dipakai. Linux dan terminal
                adalah rumah sehari-hari: otomasi, service management, firewall, dan debugging.
              </p>
              <p>
                Website ini juga rumah dari <strong className="text-neon">online shop produk digital</strong>{' '}
                dan blog tutorial — semua kebutuhan digital, satu tempat.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.15}>
            <div className="card-glass rounded-2xl border border-line p-6 md:p-8">
              <h3 className="font-mono text-[11px] font-semibold tracking-[0.25em] text-faint">
                IDENTITAS
              </h3>
              <div className="mt-5 flex flex-wrap gap-2">
                {HERO_ROLES.map((role) => (
                  <span
                    key={role}
                    className="rounded-lg border border-line bg-navy/60 px-3 py-1.5 text-xs text-muted transition-colors hover:border-accent/50 hover:text-fg"
                  >
                    {role}
                  </span>
                ))}
              </div>
              <div className="mt-8 border-t border-line pt-6">
                <h3 className="mb-4 font-mono text-[11px] font-semibold tracking-[0.25em] text-faint">
                  TEKNOLOGI
                </h3>
                <TechnologyIcons items={technologies} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
