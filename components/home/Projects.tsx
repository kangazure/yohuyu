import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, GitBranch } from 'lucide-react';
import { projects } from '@/data/technologies';
import { ScrollReveal } from '@/components/ui/ScrollReveal';
import { TiltCard } from '@/components/ui/TiltCard';

export function Projects() {
  return (
    <section id="proyek" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <ScrollReveal className="max-w-2xl">
          <p className="mb-3 font-mono text-[11px] tracking-[0.35em] text-accent">
            03 // PROYEK
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-fg md:text-4xl">
            Proyek yang Dikerjakan
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Link repo sedang dirapikan — akan segera diperbarui.
          </p>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <ScrollReveal key={project.title} delay={0.08 * i}>
              <TiltCard maxTilt={6} scale={1.02} className="h-full">
                <article className="card-glass group flex h-full flex-col overflow-hidden rounded-2xl border border-line transition-colors duration-300 hover:border-accent/50">
                  <div className="relative aspect-[16/9] overflow-hidden border-b border-line">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-void/70 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-bold text-fg transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-line bg-navy/60 px-2 py-1 font-mono text-[10px] text-faint"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-5 flex items-center gap-3 border-t border-line pt-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-accent"
                      >
                        <GitBranch size={14} />
                        GitHub
                      </a>
                      <Link
                        href={project.demo}
                        className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-neon"
                      >
                        <ExternalLink size={14} />
                        Demo
                      </Link>
                    </div>
                  </div>
                </article>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
