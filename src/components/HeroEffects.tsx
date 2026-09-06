"use client";

import React from "react";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";

// Kept as its own file + dynamic(..., { ssr: false }) import so the
// postprocessing bundle only ships to clients that actually render it
// (desktop) instead of being included in everyone's initial JS.
export default function HeroEffects() {
  return (
    <EffectComposer multisampling={0}>
      <Bloom intensity={0.65} luminanceThreshold={0.15} luminanceSmoothing={0.4} mipmapBlur />
      <Vignette eskil={false} offset={0.15} darkness={0.9} />
    </EffectComposer>
  );
}
