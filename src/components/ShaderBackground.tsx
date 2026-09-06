"use client";

import React, { useEffect, useRef } from "react";

const VERTEX_SHADER_SRC = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

// Domain-warped simplex noise -> slow-moving smoke/plasma, tinted between
// the site's background (#131212) and accent orange/red (#f93434), with a
// light film-grain dither layered on top so it never reads as a flat gradient.
const FRAGMENT_SHADER_SRC = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;

  // Ashima Arts simplex noise (2D)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                        -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
              + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  float grain(vec2 uv, float t) {
    return fract(sin(dot(uv, vec2(12.9898, 78.233)) + t) * 43758.5453);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 aspectUv = uv;
    aspectUv.x *= u_resolution.x / u_resolution.y;

    float t = u_time * 0.045;

    // Domain-warp: feed noise back into itself for a smoky, non-repetitive flow
    vec2 warp = vec2(
      snoise(aspectUv * 1.4 + vec2(0.0, t)),
      snoise(aspectUv * 1.4 + vec2(5.2, -t))
    );
    float n = snoise(aspectUv * 1.1 + warp * 0.6 + t * 0.5);
    n = n * 0.5 + 0.5;

    vec3 bg = vec3(0.0745, 0.0706, 0.0706);   // #131212
    vec3 accent = vec3(0.976, 0.204, 0.204);  // #f93434

    // Keep the accent rare and dim so it reads as an ember in the smoke,
    // not a full-blown colored background.
    float glow = smoothstep(0.72, 0.98, n);
    vec3 color = mix(bg, bg * 1.6, n * 0.5);
    color = mix(color, accent, glow * 0.18);

    float g = (grain(gl_FragCoord.xy, u_time) - 0.5) * 0.035;
    color += g;

    gl_FragColor = vec4(color, 1.0);
  }
`;

export default function ShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let isCancelled = false;
    let rafId: number | null = null;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("ShaderBackground compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertShader = createShader(gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
    const fragShader = createShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
    const program = gl.createProgram();
    if (!vertShader || !fragShader || !program) return;

    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("ShaderBackground link error:", gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // One big triangle covering the viewport — cheaper than a quad, no seams.
    const posBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, posBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const aPosition = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolution = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = (time: number) => {
      if (isCancelled) return;
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, time * 0.001);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      // Respect reduced-motion: render a single static frame and stop.
      if (!prefersReducedMotion) {
        rafId = requestAnimationFrame(draw);
      }
    };
    rafId = requestAnimationFrame(draw);

    return () => {
      isCancelled = true;
      window.removeEventListener("resize", resize);
      if (rafId) cancelAnimationFrame(rafId);
      gl.deleteBuffer(posBuffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
    />
  );
}