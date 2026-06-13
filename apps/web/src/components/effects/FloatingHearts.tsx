"use client";

import { useEffect } from "react";

const HEARTS = ["💖", "💕", "💗", "🌸", "🤍", "✨"];

/** Ambient hearts drifting up behind the content. */
export default function FloatingHearts() {
  useEffect(() => {
    const id = setInterval(() => {
      if (document.hidden) return;
      const el = document.createElement("div");
      el.textContent = HEARTS[Math.floor(Math.random() * HEARTS.length)];
      const size = Math.random() * 16 + 14;
      const dur = Math.random() * 6 + 7;
      el.style.cssText = `position:fixed;bottom:-40px;left:${Math.random() * 100}vw;z-index:0;pointer-events:none;font-size:${size}px;animation:heart-rise ${dur}s linear forwards;`;
      el.style.setProperty("--drift", `${Math.random() * 120 - 60}px`);
      el.style.setProperty("--op", (Math.random() * 0.35 + 0.35).toFixed(2));
      document.body.appendChild(el);
      el.addEventListener("animationend", () => el.remove());
    }, 1500);
    return () => clearInterval(id);
  }, []);
  return null;
}
