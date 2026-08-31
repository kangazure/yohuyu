'use client';

import { useRef, useState, type ReactNode } from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'motion/react';
import { cn } from '@/lib/utils';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** kemiringan maksimal, derajat */
  maxTilt?: number;
  /** skala saat hover */
  scale?: number;
}

/** Card 3D tilt mengikuti pointer — mati otomatis saat reduced-motion/touch */
export function TiltCard({ children, className, maxTilt = 9, scale = 1.02 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const [hovered, setHovered] = useState(false);
  const springRotateX = useSpring(rotateX, { stiffness: 180, damping: 18 });
  const springRotateY = useSpring(rotateY, { stiffness: 180, damping: 18 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * maxTilt * 2);
    rotateX.set(-py * maxTilt * 2);
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  }

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative [transform-style:preserve-3d] will-change-transform',
        className
      )}
      style={{ rotateX: springRotateX, rotateY: springRotateY, scale: hovered ? scale : 1 }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={reset}
    >
      {children}
    </motion.div>
  );
}
