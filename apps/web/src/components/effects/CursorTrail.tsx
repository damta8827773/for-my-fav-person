"use client";

import { useEffect } from "react";

const GLYPHS = ["✨", "💫", "💕", "⭐"];

/** Sparkle trail that follows a fine pointer (skipped on touch). */
export default function CursorTrail() {
  useEffect(() => {
    if (!window.matchMedia?.("(pointer: fine)").matches) return;
    let last = 0;
    const onMove = (e: PointerEvent) => {
      const now = Date.now();
      if (now - last < 70) return;
      last = now;
      const el = document.createElement("div");
      el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      el.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;z-index:100001;pointer-events:none;font-size:14px;transform:translate(-50%,-50%);animation:sparkle-fade 0.9s ease-out forwards;`;
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  return null;
}
