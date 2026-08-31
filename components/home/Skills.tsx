import { Activity, Box, Code2, Shield, Terminal, Wifi, type LucideIcon } from 'lucide-react';
import { skills } from '@/data/technologies';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/ui/TiltCard';

const ICON_MAP: Record<string, LucideIcon> = {
  wifi: Wifi,
  shield: Shield,
  terminal: Terminal,
  code: Code2,
  box: Box,
  activity: Activity,
};

export function Skills() {
  return (
    <section id="keahlian" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">
            02 // KEAHLIAN
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
            Area yang Saya Dalami
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Enam pilar utama — dari kabel sampai cloud, dari terminal sampai dashboard.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = ICON_MAP[skill.icon] ?? Wifi;
            return (
              <ScrollReveal key={skill.key} delay={0.06 * i}>
                <TiltCard maxTilt={7} scale={1.02} className="h-full">
                  <div className="card-glass group relative h-full overflow-hidden rounded-2xl border border-line p-6 transition-colors duration-300 hover:border-accent/50">
                    <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-accent/10 blur-2xl transition-opacity duration-300 group-hover:opacity-100 md:opacity-0" />
                    <div className="flex items-center justify-between">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent">
                        <Icon size={20} />
                      </span>
                      <span className="font-mono text-[10px] tracking-widest text-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="mt-5 text-base font-bold tracking-widest text-fg transition-colors group-hover:text-accent">
                      {skill.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted">{skill.description}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-md border border-line bg-navy/60 px-2 py-1 text-[10px] font-mono text-faint"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
