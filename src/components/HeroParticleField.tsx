"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import dynamic from "next/dynamic";
import * as THREE from "three";

// Postprocessing is desktop-only visual polish — lazy-load it so mobile
// users never download the effects bundle at all.
const HeroEffects = dynamic(() => import("./HeroEffects"), { ssr: false });

const FIELD_DEPTH = 70; // how far back into -z the field extends
const FIELD_RADIUS = 10; // how wide the field spreads on x/y
const START_Z = 8;

// Warm ember palette pulled from the site's accent color, plus a few cool
// white/gray sparks mixed in so the field doesn't read as a flat single hue.
const PALETTE = [
  new THREE.Color("#f93434"), // accent
  new THREE.Color("#ff7a45"), // warm ember
  new THREE.Color("#f2f2f2"), // foreground white
  new THREE.Color("#8a8a8a"), // dim gray spark
];

function ParticleField({
  progressRef,
  count,
  enableParallax,
}: {
  progressRef: React.RefObject<number>;
  count: number;
  enableParallax: boolean;
}) {
  const pointsRef = useRef<THREE.Points>(null);
  const cameraZRef = useRef(START_Z);
  const parallax = useRef({ x: 0, y: 0 });
  const targetParallax = useRef({ x: 0, y: 0 });

  const { positions, colors, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const siz = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.sqrt(Math.random()) * FIELD_RADIUS;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = Math.sin(angle) * radius;
      pos[i * 3 + 2] = -Math.random() * FIELD_DEPTH;

      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;

      siz[i] = Math.random() < 0.08 ? 0.16 + Math.random() * 0.12 : 0.03 + Math.random() * 0.035;
    }

    return { positions: pos, colors: col, sizes: siz };
  }, [count]);

  useEffect(() => {
    if (!enableParallax) return;
    const handleMove = (e: MouseEvent) => {
      targetParallax.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enableParallax]);

  useFrame((state) => {
    const progress = progressRef.current ?? 0;
    const targetZ = START_Z - progress * (FIELD_DEPTH - START_Z);
    cameraZRef.current += (targetZ - cameraZRef.current) * 0.08;
    state.camera.position.z = cameraZRef.current;

    if (enableParallax) {
      parallax.current.x += (targetParallax.current.x - parallax.current.x) * 0.05;
      parallax.current.y += (targetParallax.current.y - parallax.current.y) * 0.05;
      state.camera.position.x = parallax.current.x * 0.6;
      state.camera.position.y = -parallax.current.y * 0.4;
      state.camera.lookAt(0, 0, cameraZRef.current - 10);
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.z = state.clock.elapsedTime * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
          count={count}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function HeroParticleField({
  progressRef,
}: {
  progressRef: React.RefObject<number>;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]);

  useEffect(() => {
    const check = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setDpr(mobile ? [1, 1] : [1, 1.5]);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, START_Z], fov: isMobile ? 70 : 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        dpr={dpr}
      >
        <fog attach="fog" args={["#131212", 10, 55]} />
        <ParticleField
          progressRef={progressRef}
          count={isMobile ? 350 : 900}
          enableParallax={!isMobile}
        />
        {!isMobile && <HeroEffects />}
      </Canvas>
    </div>
  );
}
