'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from 'motion/react';

/** Progress bar baca artikel — fixed di atas konten */
export function ReadingProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, restDelta: 0.001 });

  if (reduce) return null;

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-16 z-30 h-0.5 origin-left bg-gradient-to-r from-accent via-neon to-accent"
    />
  );
}
