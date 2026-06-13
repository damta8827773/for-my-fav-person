"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useApp } from "@/components/providers";

function Typewriter({ text }: { text: string }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    setN(0);
    const id = setInterval(() => {
      setN((v) => {
        if (v >= text.length) {
          clearInterval(id);
          return v;
        }
        return v + 1;
      });
    }, 75);
    return () => clearInterval(id);
  }, [text]);
  return (
    <span className="border-r-2 border-rose pr-1" style={{ animation: "blink-caret 0.9s step-end infinite" }}>
      {text.slice(0, n)}
    </span>
  );
}

export default function Hero() {
  const { t } = useApp();
  return (
    <section id="hero" className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.6, duration: 0.8 }}
        className="font-script mb-3 text-2xl text-rose md:text-3xl"
      >
        {t.hero_kicker}
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.8, duration: 0.9 }}
        className="font-display text-gradient text-5xl font-bold leading-tight tracking-tight sm:text-7xl md:text-8xl"
      >
        <Typewriter text={t.hero_title} />
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.6, duration: 1 }}
        className="mt-6 max-w-xl text-base italic text-muted md:text-lg"
      >
        {t.hero_desc}
      </motion.p>

      <motion.a
        href="#letter"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted"
        onClick={(e) => {
          e.preventDefault();
          document.getElementById("letter")?.scrollIntoView({ behavior: "smooth" });
        }}
      >
        {t.hero_scroll}
        <motion.span animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }} className="text-rose">
          ↓
        </motion.span>
      </motion.a>
    </section>
  );
}
