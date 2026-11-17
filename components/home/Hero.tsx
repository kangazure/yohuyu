'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, BookOpen, ShieldCheck, Zap } from 'lucide-react';
import { HERO_WORDS, SECURE_CONNECT_BUILD } from '@/data/config';
import { ParallaxBackground } from '@/components/background/ParallaxBackground';
import { TypingText } from '@/components/ui/TypingText';
import { TiltCard } from '@/components/ui/TiltCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { FloatingElement } from '@/components/ui/FloatingElement';
import { MouseParallax } from '@/components/ui/MouseParallax';

const NetworkScene = dynamic(() => import('@/components/three/NetworkScene').then((m) => m.NetworkScene), {
  ssr: false,
  loading: () => null,
});

const PROFILE_IMAGE = '/images/profile/riko-ardianto.svg'; // TODO: ganti ke riko-ardianto.webp saat foto asli tersedia

const TYPING_COLORS = [
  '#22d3ee',
  '#8b5cf6',
  '#a78bfa',
  '#34d399',
  '#f472b6',
  '#60a5fa',
];

export function Hero() {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // scroll parallax: konten hero mundur pelan saat user scroll ke bawah
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0.35]);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.matchMedia('(max-width: 767px)').matches);
  }, []);

  return (
    <section ref={sectionRef} className="relative flex min-h-[100dvh] items-center overflow-hidden pt-24 pb-16">
      <ParallaxBackground />

      {/* Scene 3D hanya desktop (LIGHT experience di mobile) */}
      {mounted && !isMobile && (
        <div className="absolute inset-y-0 right-0 z-[1] hidden w-3/5 opacity-80 md:block">
          <NetworkScene />
        </div>
      )}

      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto grid w-full max-w-7xl gap-14 px-6 md:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center"
      >
        {/* ===== Kiri: teks ===== */}
        <MouseParallax depth={5} strengthX={0.7} strengthY={0.7}>
          <div>
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neon opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.3em] text-muted">
                ONLINE SHOP • NETWORKING • CYBER SECURITY
              </span>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="hero-name-neon text-[clamp(2.6rem,7vw,4.6rem)] font-bold leading-[1.05] tracking-tight"
            >
              RIKO
              <br />
              ARDIANTO
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-lg text-muted md:text-xl"
            >
              ONLINE SHOP ·{' '}
              <TypingText
                texts={HERO_WORDS}
                textColors={TYPING_COLORS}
                className="font-semibold text-accent [text-shadow:0_0_18px_rgba(139,92,246,0.65)]"
              />
            </motion.p>

            <motion.p
              initial={reduce ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-3 font-mono text-[11px] tracking-[0.35em] text-faint"
            >
              {SECURE_CONNECT_BUILD}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <MagneticButton>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2.5 rounded-xl bg-accent px-7 py-3.5 text-sm font-semibold tracking-[0.1em] text-white shadow-[0_0_36px_rgba(139,92,246,0.45)] transition-all hover:bg-accent-hover hover:shadow-[0_0_48px_rgba(139,92,246,0.6)] active:scale-[0.98]"
                >
                  <Zap size={16} />
                  BELANJA SEKARANG
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2.5 rounded-xl border border-line-strong bg-surface/50 px-7 py-3.5 text-sm font-medium tracking-[0.1em] text-fg backdrop-blur transition-all hover:border-neon/60 hover:text-neon active:scale-[0.98]"
                >
                  <BookOpen size={16} />
                  BACA BLOG
                  <ArrowRight size={14} />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </MouseParallax>

        {/* ===== Kanan: foto profil + chips melayang ===== */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px]"
        >
          <div className="absolute inset-0 -z-10 translate-x-4 translate-y-4 rounded-[42%_58%_55%_45%/45%_40%_60%_55%] bg-gradient-to-br from-accent/40 via-transparent to-neon/30 blur-2xl" />

          {/* foto: float lembut + parallax kursor (translate & tilt) + 3D tilt hover */}
          <FloatingElement amplitude={11} duration={7.5}>
            <MouseParallax depth={20} strengthX={1.25} strengthY={1.25} tilt>
              <TiltCard maxTilt={12} scale={1.03}>
                <div className="relative overflow-hidden rounded-[40%_60%_55%_45%/45%_40%_60%_55%] border border-line-strong bg-surface-2/80 shadow-[0_24px_80px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
                  <Image
                    src={PROFILE_IMAGE}
                    alt="Riko Ardianto — Network Engineer & Cybersecurity Enthusiast"
                    width={400}
                    height={460}
                    priority
                    className="h-auto w-full object-cover"
                    unoptimized
                  />
                  <div className="fx-scanline pointer-events-none absolute inset-0" />
                </div>
              </TiltCard>
            </MouseParallax>
          </FloatingElement>

          {/* chips melayang — parallax beda kedalaman */}
          <MouseParallax depth={26} strengthX={1.4} strengthY={1.4}>
            <FloatingElement className="absolute -left-6 top-8" amplitude={10} duration={5.5}>
              <div className="chip-float">
                <ShieldCheck size={13} className="text-neon" />
                <span>SECURE</span>
              </div>
            </FloatingElement>
          </MouseParallax>
          <MouseParallax depth={34} strengthX={1.6} strengthY={1.6}>
            <FloatingElement className="absolute -right-4 top-1/3" amplitude={12} duration={6.5} delay={0.6}>
              <div className="chip-float">
                <Zap size={13} className="text-accent" />
                <span>MikroTik</span>
              </div>
            </FloatingElement>
          </MouseParallax>
          <MouseParallax depth={18} strengthX={1.1} strengthY={1.1}>
            <FloatingElement className="absolute -bottom-4 left-10" amplitude={9} duration={7} delay={1.1}>
              <div className="chip-float">
                <span className="h-2 w-2 rounded-full bg-neon/80" />
                <span>NETWORK ENGINEER</span>
              </div>
            </FloatingElement>
          </MouseParallax>
        </motion.div>
      </motion.div>

      {/* gradien bawah */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-void to-transparent" />
    </section>
  );
}
