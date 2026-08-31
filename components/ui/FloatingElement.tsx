'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  /** amplitudo float, px */
  amplitude?: number;
  /** durasi satu siklus, detik */
  duration?: number;
  delay?: number;
}

/** Element melayang halus (GPU transform loop) */
export function FloatingElement({
  children,
  className,
  amplitude = 8,
  duration = 6,
  delay = 0,
}: FloatingElementProps) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn('will-change-transform', className)}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  );
}
