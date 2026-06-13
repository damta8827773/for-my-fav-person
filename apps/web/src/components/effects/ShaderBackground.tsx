"use client";

import { useEffect, useRef } from "react";
import { useApp } from "@/components/providers";

/**
 * Romantic aurora background rendered with a hand-written GLSL fragment shader.
 * Flowing fbm noise blends rose -> wine -> champagne gold. One of the project's
 * 8 languages lives right here, in the shader source below.
 */

const VERT = `
attribute vec2 a_pos;
void main() { gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;
uniform vec3  u_c1;   // rose
uniform vec3  u_c2;   // wine / deep
uniform vec3  u_c3;   // gold
uniform float u_light;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p); vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.04;

  float f  = fbm(p * 1.5 + vec2(t, t * 0.6));
  float f2 = fbm(p * 2.3 - vec2(t * 0.7, t));

  vec3 col = mix(u_c2, u_c1, smoothstep(0.15, 0.85, f));
  col = mix(col, u_c3, smoothstep(0.55, 1.0, f2) * 0.55);

  // drifting glow blobs (bokeh of light)
  float blob = 0.0;
  blob += 0.10 / max(length(p - vec2(sin(t * 1.3) * 0.7, cos(t) * 0.45)), 0.05);
  blob += 0.08 / max(length(p + vec2(cos(t * 0.9) * 0.8, sin(t * 1.1) * 0.5)), 0.05);
  col += u_c1 * blob * 0.045;

  float vig = smoothstep(1.5, 0.15, length(p));
  col *= mix(0.55, 1.08, vig);

  // gentle grain shimmer
  col += (hash(uv + t) - 0.5) * 0.015;

  col = mix(col, vec3(1.0) - (vec3(1.0) - col) * 0.35, u_light * 0.0);
  gl_FragColor = vec4(col, 1.0);
}
`;

const PALETTE = {
  dark: { c1: [0.91, 0.6, 0.69], c2: [0.18, 0.07, 0.12], c3: [0.86, 0.71, 0.51] },
  light: { c1: [1.0, 0.86, 0.89], c2: [1.0, 0.95, 0.95], c3: [0.96, 0.86, 0.7] },
} as const;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh));
    return null;
  }
  return sh;
}

export default function ShaderBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const { theme } = useApp();
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uC1 = gl.getUniformLocation(prog, "u_c1");
    const uC2 = gl.getUniformLocation(prog, "u_c2");
    const uC3 = gl.getUniformLocation(prog, "u_c3");
    const uLight = gl.getUniformLocation(prog, "u_light");

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0;
    const start = performance.now();
    const render = () => {
      if (document.hidden) {
        raf = requestAnimationFrame(render);
        return;
      }
      const pal = PALETTE[themeRef.current];
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform3fv(uC1, pal.c1 as unknown as number[]);
      gl.uniform3fv(uC2, pal.c2 as unknown as number[]);
      gl.uniform3fv(uC3, pal.c3 as unknown as number[]);
      gl.uniform1f(uLight, themeRef.current === "light" ? 1 : 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden
      className="fixed inset-0 -z-10 h-full w-full opacity-90 transition-opacity duration-700"
    />
  );
}
