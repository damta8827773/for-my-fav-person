const GLYPHS = ["💖", "💕", "💗", "🌹", "✨", "🤍", "💛"];

/** Burst a shower of hearts from a screen point. Pure DOM, no deps. */
export function burstConfetti(x: number, y: number, count = 26) {
  if (typeof document === "undefined") return;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.textContent = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
    el.style.cssText = `position:fixed;left:${x}px;top:${y}px;z-index:100002;pointer-events:none;font-size:${
      Math.random() * 12 + 16
    }px;will-change:transform,opacity;animation:confetti-burst 1.3s cubic-bezier(0.18,0.8,0.4,1) forwards;`;
    const angle = Math.random() * Math.PI * 2;
    const dist = Math.random() * 180 + 80;
    el.style.setProperty("--cx", `${Math.cos(angle) * dist}px`);
    el.style.setProperty("--cy", `${Math.sin(angle) * dist - 60}px`);
    el.style.setProperty("--cr", `${Math.random() * 720 - 360}deg`);
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}
