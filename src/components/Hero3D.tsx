"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

// A low-poly "neural node" sphere: a faceted icosahedron core with small
// glowing nodes orbiting it, connected by thin lines. Built to feel like a
// friendly, cartoon-ish 3D object rather than a literal diagram — it's the
// one signature visual moment on the page, everything else stays quiet.
function NeuralOrb() {
  const group = useRef<THREE.Group>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const nodes = useMemo(() => {
    const pts: [number, number, number][] = [];
    const count = 8;
    for (let i = 0; i < count; i++) {
      const phi = Math.acos(-1 + (2 * i) / count);
      const theta = Math.sqrt(count * Math.PI) * phi;
      const r = 1.8;
      pts.push([
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ]);
    }
    return pts;
  }, []);

  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.18;
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      pointer.y * 0.3,
      0.05
    );
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.x * 0.15,
      0.05
    );
  });

  return (
    <group
      ref={group}
      onPointerMove={(e) => {
        setPointer({ x: e.point.x / 3, y: e.point.y / 3 });
      }}
    >
      {/* Faceted core */}
      <mesh castShadow>
        <icosahedronGeometry args={[1.15, 0]} />
        <meshStandardMaterial
          color="#E8963A"
          flatShading
          roughness={0.35}
          metalness={0.1}
        />
      </mesh>

      {/* Wireframe shell */}
      <mesh>
        <icosahedronGeometry args={[1.32, 0]} />
        <meshBasicMaterial color="#F2B25C" wireframe transparent opacity={0.35} />
      </mesh>

      {/* Orbiting nodes + connecting lines */}
      {nodes.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}>
            <sphereGeometry args={[0.09, 16, 16]} />
            <meshStandardMaterial
              color="#8F6E8C"
              emissive="#8F6E8C"
              emissiveIntensity={0.6}
            />
          </mesh>
          <line>
            <bufferGeometry
              attach="geometry"
              onUpdate={(geo) =>
                geo.setFromPoints([
                  new THREE.Vector3(0, 0, 0),
                  new THREE.Vector3(...pos),
                ])
              }
            />
            <lineBasicMaterial attach="material" color="#F2B25C" transparent opacity={0.25} />
          </line>
        </group>
      ))}
    </group>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#F2B25C" />
        <pointLight position={[-5, -3, -5]} intensity={0.5} color="#8F6E8C" />
        <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
          <NeuralOrb />
        </Float>
      </Canvas>
    </div>
  );
}
