"use client";

import { useApp } from "@/components/providers";

export default function Controls() {
  const { lang, theme, toggleLang, toggleTheme } = useApp();
  return (
    <div className="fixed right-5 top-5 z-[10002] flex gap-2">
      <button
        onClick={toggleLang}
        className="glass rounded-full px-4 py-2 text-sm font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-rose"
        aria-label="Switch language"
      >
        {lang === "id" ? "🇮🇩 ID" : "🇬🇧 EN"}
      </button>
      <button
        onClick={toggleTheme}
        className="glass rounded-full px-4 py-2 text-sm font-bold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:border-rose"
        aria-label="Switch theme"
      >
        {theme === "dark" ? "🌙" : "☀️"}
      </button>
    </div>
  );
}
