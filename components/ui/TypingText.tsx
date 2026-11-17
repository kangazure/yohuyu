'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { cn } from '@/lib/utils';

interface TypingTextProps {
  texts: string[];
  /** warna per kata — kosong berarti inherit */
  textColors?: string[];
  className?: string;
  typingSpeed?: number;
  deleteSpeed?: number;
  /** jeda saat kata lengkap, ms */
  holdTime?: number;
}

const DEFAULT_COLORS: string[] = [];

/** Teks ketik-hapus bergiliran dengan kursor neon berkedip */
export function TypingText({
  texts,
  textColors = DEFAULT_COLORS,
  className,
  typingSpeed = 85,
  deleteSpeed = 45,
  holdTime = 1800,
}: TypingTextProps) {
  const reduce = useReducedMotion();
  const mountedRef = useRef(true);
  const [textIndex, setTextIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (reduce) return;
    const current = texts[textIndex] ?? '';
    let timer: ReturnType<typeof setTimeout>;

    const schedule = (fn: () => void, ms: number) => {
      timer = setTimeout(() => {
        if (mountedRef.current) fn();
      }, ms);
    };

    if (deleting) {
      if (subIndex === 0) {
        schedule(() => {
          setDeleting(false);
          setTextIndex((i) => (i + 1) % texts.length);
        }, deleteSpeed);
      } else {
        schedule(() => setSubIndex((s) => s - 1), deleteSpeed);
      }
    } else if (subIndex === current.length) {
      schedule(() => setDeleting(true), holdTime);
    } else {
      schedule(() => setSubIndex((s) => s + 1), typingSpeed);
    }
    return () => clearTimeout(timer);
  }, [subIndex, deleting, textIndex, texts, typingSpeed, deleteSpeed, holdTime, reduce]);

  const word = texts[textIndex] ?? '';
  const color = textColors[textIndex] ?? '';

  return (
    <span className={cn('inline-flex items-baseline', className)} style={color ? { color } : undefined}>
      {reduce ? word : word.slice(0, subIndex)}
      <span aria-hidden="true" className="typing-cursor" />
    </span>
  );
}
