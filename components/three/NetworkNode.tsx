'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

export interface NetworkNodeProps {
  position: [number, number, number];
  color: string;
  radius?: number;
  label?: string;
  pulseColor?: string;
  pulse?: boolean;
}

/** Node jaringan 3D: sphere emissive + ring pulse + label + hover */
export function NetworkNode({
  position,
  color,
  radius = 0.06,
  label,
  pulseColor = '#22d3ee',
  pulse = true,
}: NetworkNodeProps) {
  const sphereRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (sphereRef.current) {
      const target = hovered ? radius * 1.6 : radius;
      sphereRef.current.scale.lerp(new THREE.Vector3(target, target, target), 0.12);
    }
    if (ringRef.current) {
      const s = 1 + (t * 0.6 + position[0]) % 1 * 0.8;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = pulse ? Math.max(0, 1 - s) * 0.9 : 0.2;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={sphereRef}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[radius, 20, 20]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 1.6 : 0.7}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius * 2.2, 0.004, 8, 40]} />
        <meshBasicMaterial color={pulseColor} transparent opacity={0.4} />
      </mesh>
      {label && (
        <Html position={[0, radius * 4.2, 0]} center distanceFactor={14} zIndexRange={[10, 0]}>
          <div className="net-label">{label}</div>
        </Html>
      )}
    </group>
  );
}
