'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useReducedMotion } from 'motion/react';
import { NetworkNode } from './NetworkNode';
import { NetworkConnection } from './NetworkConnection';
import { cn } from '@/lib/utils';

/** Topologi demo jaringan FTTH */
const NODES = [
  { id: 'internet', label: 'INTERNET', pos: [-3.4, 1.7] as [number, number], color: '#22d3ee', radius: 0.09 },
  { id: 'ccr', label: 'CCR', pos: [-1.7, 1.35] as [number, number], color: '#8b5cf6', radius: 0.07 },
  { id: 'crs', label: 'CRS', pos: [-0.3, 0.75] as [number, number], color: '#8b5cf6', radius: 0.065 },
  { id: 'olt', label: 'OLT', pos: [1.3, 0.15] as [number, number], color: '#a78bfa', radius: 0.07 },
  { id: 'onu1', label: 'ONU', pos: [0.1, -1.35] as [number, number], color: '#7c3aed', radius: 0.055 },
  { id: 'onu2', label: 'ONU', pos: [1.5, -1.55] as [number, number], color: '#7c3aed', radius: 0.055 },
  { id: 'onu3', label: 'ONU', pos: [2.9, -1.3] as [number, number], color: '#7c3aed', radius: 0.055 },
  { id: 'cust1', label: 'CUST', pos: [3.3, 0.35] as [number, number], color: '#34d399', radius: 0.05 },
  { id: 'cust2', label: 'CUST', pos: [-0.6, -0.55] as [number, number], color: '#34d399', radius: 0.05 },
];

const LINKS: { from: string; to: string; color?: string; speed?: number; phase?: number }[] = [
  { from: 'internet', to: 'ccr', color: 'rgba(34,211,238,0.6)', speed: 0.35 },
  { from: 'ccr', to: 'crs' },
  { from: 'crs', to: 'olt' },
  { from: 'olt', to: 'onu1', phase: 0.2 },
  { from: 'olt', to: 'onu2', phase: 0.5 },
  { from: 'olt', to: 'onu3', phase: 0.8 },
  { from: 'onu1', to: 'cust2', color: 'rgba(52,211,153,0.5)', speed: 0.18, phase: 0.4 },
  { from: 'onu2', to: 'cust1', color: 'rgba(52,211,153,0.5)', speed: 0.18, phase: 0.1 },
];

function webglSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="net-static" />
    </div>
  );
}

/**
 * Scene 3D jaringan FTTH: Internet → MikroTik CCR → CRS → OLT → ONU → Customer.
 * Data demo; hanya di-home; fallback statis bila WebGL tidak tersedia.
 */
export function NetworkScene() {
  const reduce = useReducedMotion();
  const [webgl] = useState(() => (typeof window === 'undefined' ? false : webglSupported()));

  if (!webgl) return <StaticFallback />;

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 4.8], fov: 46 }}
      gl={{ antialias: true, alpha: true }}
      className={cn('!absolute inset-0')}
    >
      <ambientLight intensity={0.55} />
      <pointLight position={[0, 0, 4]} intensity={0.9} />
      <Suspense fallback={null}>
        {LINKS.map((l, i) => {
          const from = NODES.find((n) => n.id === l.from);
          const to = NODES.find((n) => n.id === l.to);
          if (!from || !to) return null;
          return (
            <NetworkConnection
              key={i}
              from={from.pos}
              to={to.pos}
              color={l.color}
              flowSpeed={l.speed}
              phase={l.phase}
            />
          );
        })}
        {NODES.map((n) => (
          <NetworkNode
            key={n.id}
            position={[n.pos[0], n.pos[1], 0]}
            color={n.color}
            radius={n.radius}
            label={n.label}
            pulse={!reduce}
          />
        ))}
      </Suspense>
    </Canvas>
  );
}
