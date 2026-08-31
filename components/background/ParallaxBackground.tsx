'use client';

import { useEffect, useMemo } from 'react';
import type { ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react';
import Image from 'next/image';
import { technologies } from '@/data/technologies';

/** Partikel statis (array tetap — tanpa random saat render, aman hydration) */
const PARTICLES = [
  { left: '6%', top: '18%', size: 3, color: 'rgba(139,92,246,0.55)', dur: 9, delay: 0 },
  { left: '14%', top: '64%', size: 2, color: 'rgba(34,211,238,0.5)', dur: 11, delay: 1.2 },
  { left: '22%', top: '34%', size: 3, color: 'rgba(139,92,246,0.45)', dur: 8, delay: 2.4 },
  { left: '31%', top: '78%', size: 2, color: 'rgba(34,211,238,0.4)', dur: 10, delay: 0.6 },
  { left: '42%', top: '12%', size: 2, color: 'rgba(167,139,250,0.5)', dur: 9, delay: 1.8 },
  { left: '55%', top: '58%', size: 3, color: 'rgba(139,92,246,0.4)', dur: 12, delay: 3 },
  { left: '63%', top: '26%', size: 2, color: 'rgba(34,211,238,0.45)', dur: 8, delay: 0.9 },
  { left: '72%', top: '72%', size: 3, color: 'rgba(167,139,250,0.45)', dur: 10, delay: 1.5 },
  { left: '82%', top: '40%', size: 2, color: 'rgba(139,92,246,0.5)', dur: 9, delay: 2.7 },
  { left: '90%', top: '16%', size: 2, color: 'rgba(34,211,238,0.4)', dur: 11, delay: 0.3 },
  { left: '48%', top: '88%', size: 2, color: 'rgba(139,92,246,0.35)', dur: 10, delay: 2.1 },
  { left: '8%', top: '88%', size: 2, color: 'rgba(34,211,238,0.35)', dur: 12, delay: 1.1 },
];

interface ParallaxLayerProps {
  depth: number;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  className?: string;
  children?: ReactNode;
}

function ParallaxLayer({ depth, springX, springY, className, children }: ParallaxLayerProps) {
  const reduce = useReducedMotion();
  const x = useTransform(springX, (v) => v * 56 * depth);
  const y = useTransform(springY, (v) => v * 56 * depth);

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} style={{ x, y, transform: 'translateZ(0)' }}>
      {children}
    </motion.div>
  );
}

interface ParallaxBackgroundProps {
  /** render layer ikon teknologi (depth tinggi) */
  showTechIcons?: boolean;
}

/**
 * Background multi-layer: glow → grid → partikel → garis digital → ikon teknologi.
 * Setiap layer bergerak dengan depth berbeda mengikuti pointer (GPU transform).
 */
export function ParallaxBackground({ showTechIcons = true }: ParallaxBackgroundProps) {
  const reduce = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 18 });

  useEffect(() => {
    if (reduce) return;
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, mouseX, mouseY]);

  const techIcons = useMemo(
    () => [technologies[0], technologies[1], technologies[5], technologies[6]],
    []
  );

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* glow dasar — depth 0 */}
      <div className="bg-hero-glow absolute inset-0" />

      {/* grid cyber — depth kecil */}
      <ParallaxLayer depth={0.12} springX={springX} springY={springY} className="absolute inset-0">
        <div className="fx-grid absolute inset-0 opacity-70" />
      </ParallaxLayer>

      {/* partikel — depth sedang */}
      <ParallaxLayer depth={0.3} springX={springX} springY={springY} className="absolute inset-0">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="fx-particle absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              animationDuration: `${p.dur}s`,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </ParallaxLayer>

      {/* garis digital + node — depth agak dalam */}
      <ParallaxLayer depth={0.45} springX={springX} springY={springY} className="absolute inset-0">
        <svg className="absolute inset-0 h-full w-full opacity-30" preserveAspectRatio="none">
          <path
            className="fx-line"
            d="M0 240 C 220 140, 380 360, 720 220 S 1200 160, 1440 260"
            fill="none"
            stroke="rgba(139,92,246,0.5)"
            strokeWidth="1"
          />
          <path
            className="fx-line"
            d="M0 480 C 180 600, 420 420, 760 520 S 1240 420, 1440 520"
            fill="none"
            stroke="rgba(34,211,238,0.4)"
            strokeWidth="1"
            style={{ animationDelay: '1.6s' }}
          />
          <path
            className="fx-line"
            d="M0 120 C 260 200, 520 60, 860 140 S 1280 40, 1440 120"
            fill="none"
            stroke="rgba(167,139,250,0.35)"
            strokeWidth="1"
            style={{ animationDelay: '3s' }}
          />
        </svg>
        {[
          { left: '18%', top: '22%' },
          { left: '48%', top: '60%' },
          { left: '78%', top: '32%' },
          { left: '62%', top: '74%' },
          { left: '33%', top: '48%' },
        ].map((n, i) => (
          <span
            key={i}
            className="fx-node absolute h-1 w-1 rounded-full bg-neon/80"
            style={{ left: n.left, top: n.top, animationDelay: `${i * 0.8}s` }}
          />
        ))}
      </ParallaxLayer>

      {/* ikon teknologi melayang — depth paling dalam */}
      {showTechIcons && (
        <ParallaxLayer depth={0.65} springX={springX} springY={springY} className="absolute inset-0">
          <div className="absolute left-[8%] top-[22%] opacity-15">
            <Image src={techIcons[0].icon} alt="" width={56} height={56} unoptimized />
          </div>
          <div className="absolute right-[10%] top-[18%] opacity-15">
            <Image src={techIcons[1].icon} alt="" width={48} height={48} unoptimized />
          </div>
          <div className="absolute left-[16%] bottom-[20%] opacity-15">
            <Image src={techIcons[2].icon} alt="" width={42} height={42} unoptimized />
          </div>
          <div className="absolute right-[18%] bottom-[26%] opacity-15">
            <Image src={techIcons[3].icon} alt="" width={52} height={52} unoptimized />
          </div>
        </ParallaxLayer>
      )}
    </div>
  );
}
