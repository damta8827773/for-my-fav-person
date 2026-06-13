"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";

const SECTIONS = ["hero", "letter", "countdown", "memory", "words", "song", "game"] as const;

export default function SideNav() {
  const { t } = useApp();
  const [active, setActive] = useState<string>("hero");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { threshold: 0.4 },
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <nav className="fixed right-5 top-1/2 z-[10001] hidden -translate-y-1/2 flex-col gap-4 md:flex">
      {SECTIONS.map((id) => (
        <a
          key={id}
          href={`#${id}`}
          onClick={(e) => {
            e.preventDefault();
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
          }}
          className="group relative flex items-center justify-center"
          aria-label={t.nav[id as keyof typeof t.nav]}
        >
          <span
            className={`block rounded-full border transition-all duration-300 ${
              active === id
                ? "h-3.5 w-3.5 border-rose bg-rose shadow-[0_0_12px_var(--rose)]"
                : "h-3 w-3 border-white/40 bg-white/20 group-hover:scale-125 group-hover:border-rose"
            }`}
          />
          <span className="glass pointer-events-none absolute right-7 whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold text-cream opacity-0 translate-x-2 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
            {t.nav[id as keyof typeof t.nav]}
          </span>
        </a>
      ))}
    </nav>
  );
}
