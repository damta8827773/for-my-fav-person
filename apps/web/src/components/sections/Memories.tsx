"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";
import { memories as localMemories, type Memory } from "@/lib/memories";

function MemoryCard({ item }: { item: Memory }) {
  const { lang, t } = useApp();
  const [idx, setIdx] = useState(0);
  const isAlbum = item.images.length > 1;

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const ref = useRef<HTMLDivElement>(null);
  const [spot, setSpot] = useState("50% 50%");

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    mx.set(px);
    my.set(py);
    setSpot(`${px * 100}% ${py * 100}%`);
  };
  const reset = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformStyle: "preserve-3d" }}
      className="group relative aspect-[3/4] overflow-hidden rounded-3xl border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
    >
      {item.images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={item.title[lang]}
          fill
          sizes="(max-width: 768px) 100vw, 320px"
          className={`object-cover transition-opacity duration-500 ${i === idx ? "opacity-100" : "opacity-0"} ${
            !isAlbum ? "group-hover:scale-110" : ""
          }`}
          style={{ transition: "opacity 0.5s ease, transform 0.6s ease" }}
        />
      ))}

      {/* spotlight glow following the cursor */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(220px circle at ${spot}, rgba(232,154,176,0.25), transparent 70%)` }}
      />

      {/* gradient + caption */}
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-5 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <h3 className="font-display text-2xl text-rose">{item.title[lang]}</h3>
        <p className="mt-1 text-sm text-white/90">{item.desc[lang]}</p>
      </div>

      {isAlbum && (
        <>
          <span className="absolute left-3 top-3 rounded-full bg-black/50 px-3 py-1 text-[0.7rem] font-semibold text-white backdrop-blur">
            {t.album_hint} · {idx + 1}/{item.images.length}
          </span>
          <button
            onClick={() => setIdx((i) => (i - 1 + item.images.length) % item.images.length)}
            className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100 hover:bg-rose hover:text-black"
            aria-label="Prev"
          >
            ‹
          </button>
          <button
            onClick={() => setIdx((i) => (i + 1) % item.images.length)}
            className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition group-hover:opacity-100 hover:bg-rose hover:text-black"
            aria-label="Next"
          >
            ›
          </button>
        </>
      )}
    </motion.div>
  );
}

export default function Memories() {
  const { t } = useApp();
  const [items, setItems] = useState<Memory[]>(localMemories);

  // gallery metadata served by the Java service (falls back to local)
  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => Array.isArray(d) && d.length && setItems(d))
      .catch(() => {});
  }, []);

  return (
    <Section id="memory" title={t.memory_title} subtitle={t.memory_sub} className="!p-6 md:!p-10">
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1200 }}>
        {items.map((m) => (
          <MemoryCard key={m.id} item={m} />
        ))}
      </div>
    </Section>
  );
}
