import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

/** Normalised mouse position shared by the parallax rig (window-level so the
 *  canvas can stay pointer-events-none and never block the hero CTAs). */
function useMouseRef() {
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);
  return mouse;
}

function Orb() {
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.9}>
      <mesh>
        <icosahedronGeometry args={[1.4, 48]} />
        <MeshDistortMaterial
          color="#101016"
          metalness={0.95}
          roughness={0.18}
          distort={0.42}
          speed={1.6}
          emissive="#4c30b8"
          emissiveIntensity={0.42}
        />
      </mesh>
    </Float>
  );
}

function Particles({ count = 900 }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i += 1) {
      // Random point on a shell between r=2.8 and r=6
      const r = 2.8 + Math.random() * 3.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={positions.length / 3} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#a78bfa"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/** Mouse-parallax rig: eases the whole scene toward the pointer. */
function Rig({ children }) {
  const group = useRef();
  const mouse = useMouseRef();
  const { size } = useThree();

  useFrame(() => {
    if (!group.current) return;
    const g = group.current;
    g.rotation.y = THREE.MathUtils.lerp(g.rotation.y, mouse.current.x * 0.28, 0.04);
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, mouse.current.y * 0.18, 0.04);
    // Push the orb toward the right on wide screens so it sits behind
    // the hero copy rather than under it.
    const targetX = size.width >= 1024 ? 2 : 0;
    g.position.x = THREE.MathUtils.lerp(g.position.x, targetX, 0.06);
  });

  return <group ref={group}>{children}</group>;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <ambientLight intensity={0.35} />
      <pointLight position={[5, 4, 6]} intensity={80} color="#7c5cff" />
      <pointLight position={[-6, -3, -4]} intensity={30} color="#38bdf8" />
      <directionalLight position={[2, 4, 5]} intensity={1.4} color="#ffffff" />
      <Rig>
        <Orb />
        <Particles />
      </Rig>
    </Canvas>
  );
}
