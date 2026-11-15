'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react';

/**
 * Glow lembut (purple + cyan) yang meluncur halus mengikuti kursor.
 * Hanya aktif di pointer halus; tidak dirender saat reduced motion
 * atau touch — jadi mobile/SSR tidak pernah kena.
 */
export function MouseGlow() {
  const reduce = useReducedMotion();
  const [enabled, setEnabled] = useState(false);

  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);
  const sx = useSpring(x, { stiffness: 55, damping: 16 });
  const sy = useSpring(y, { stiffness: 55, damping: 16 });
  const glowX = useTransform(sx, (v) => v - 260);
  const glowY = useTransform(sy, (v) => v - 260);

  useEffect(() => {
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    setEnabled(true);
    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[520px] w-[520px] rounded-full mix-blend-screen"
      style={{
        x: glowX,
        y: glowY,
        background:
          'radial-gradient(circle at center, rgba(139,92,246,0.13), rgba(34,211,238,0.05) 42%, transparent 68%)',
      }}
    />
  );
}
