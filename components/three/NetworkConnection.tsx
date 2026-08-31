'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export interface NetworkConnectionProps {
  from: [number, number];
  to: [number, number];
  color?: string;
  /** kecepatan aliran paket (terbalik dari durasi) */
  flowSpeed?: number;
  /** fase paket (0-1) supaya tidak serentak */
  phase?: number;
}

/** Koneksi antar node: garis kurva + paket data yang mengalir */
export function NetworkConnection({
  from,
  to,
  color = 'rgba(139,92,246,0.55)',
  flowSpeed = 0.22,
  phase = 0,
}: NetworkConnectionProps) {
  const packetRef = useRef<THREE.Mesh>(null);

  const curve = useMemo(() => {
    const yOffset = 0.35;
    return new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(from[0], from[1], 0),
      new THREE.Vector3((from[0] + to[0]) / 2, (from[1] + to[1]) / 2 + yOffset, 0),
      new THREE.Vector3(to[0], to[1], 0)
    );
  }, [from, to]);

  const lineGeometry = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(28));
    geo.computeBoundingSphere();
    return geo;
  }, [curve]);

  const line = useMemo(
    () =>
      new THREE.Line(
        lineGeometry,
        new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.65 })
      ),
    [lineGeometry, color]
  );

  useFrame(({ clock }) => {
    if (!packetRef.current) return;
    const t = (clock.getElapsedTime() * flowSpeed + phase) % 1;
    packetRef.current.position.copy(curve.getPoint(t));
  });

  return (
    <group>
      <primitive object={line} />
      <mesh ref={packetRef}>
        <sphereGeometry args={[0.024, 10, 10]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
}
