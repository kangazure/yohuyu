'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';
import {
  useMotionValue,
  useReducedMotion,
  useSpring,
  type MotionValue,
} from 'motion/react';

export interface MouseSpring {
  /** posisi kursor ternormalisasi (-0.5..0.5), sudah di-spring */
  x: MotionValue<number>;
  y: MotionValue<number>;
}

const MouseContext = createContext<MouseSpring | null>(null);

/**
 * Satu-satunya listener mousemove global (rAF-throttled).
 * Semua efek parallax/glow memakai spring dari sini — tidak ada
 * per-halaman listener. Mati otomatis di touch device / reduced motion.
 */
export function MouseProvider({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 55, damping: 18 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18 });

  useEffect(() => {
    // efek kursor hanya untuk pointer halus (desktop/trackpad)
    if (reduce) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        rawX.set(e.clientX / window.innerWidth - 0.5);
        rawY.set(e.clientY / window.innerHeight - 0.5);
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce, rawX, rawY]);

  const value = useMemo(() => ({ x, y }), [x, y]);
  return <MouseContext.Provider value={value}>{children}</MouseContext.Provider>;
}

/**
 * Ambil spring kursor global. Di luar provider (tidak seharusnya terjadi)
 * mengembalikan nilai statis 0 supaya komponen tetap aman dirender.
 */
export function useMouseSpring(): MouseSpring {
  const ctx = useContext(MouseContext);
  const fallbackX = useMotionValue(0);
  const fallbackY = useMotionValue(0);
  return ctx ?? { x: fallbackX, y: fallbackY };
}
