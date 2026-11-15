'use client';

import type { ReactNode } from 'react';
import { motion, useReducedMotion, useTransform } from 'motion/react';
import { useMouseSpring } from './MouseProvider';
import { cn } from '@/lib/utils';

interface MouseParallaxProps {
  children?: ReactNode;
  className?: string;
  /** kedalaman gerak mengikuti kursor, px (deviasi ±depth) */
  depth?: number;
  /** pengali gerak per sumbu (beda nilai = kesan depth lebih kuat) */
  strengthX?: number;
  strengthY?: number;
  /** tambahkan kemiringan halus mengikuti kursor (rotateX/rotateY) */
  tilt?: boolean;
}

/**
 * Layer yang bergerak mengikuti kursor dengan depth tertentu.
 * GPU-friendly (transform + spring global dari MouseProvider).
 */
export function MouseParallax({
  children,
  className,
  depth = 14,
  strengthX = 1,
  strengthY = 1,
  tilt = false,
}: MouseParallaxProps) {
  const reduce = useReducedMotion();
  const { x, y } = useMouseSpring();

  const tx = useTransform(x, (v) => v * depth * 2 * strengthX);
  const ty = useTransform(y, (v) => v * depth * 2 * strengthY);
  const rx = useTransform(y, (v) => (tilt ? v * -7 * strengthY : 0));
  const ry = useTransform(x, (v) => (tilt ? v * 7 * strengthX : 0));

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={cn('will-change-transform [transform-style:preserve-3d]', className)}
      style={{ x: tx, y: ty, rotateX: rx, rotateY: ry }}
    >
      {children}
    </motion.div>
  );
}
