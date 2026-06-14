"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useApp } from "@/components/providers";

type Item = {
  lang: string;
  role: { id: string; en: string };
  tag: string;
  emoji: string;
};

const STACK: Item[] = [
  { lang: "TypeScript", emoji: "⌨️", tag: "apps/web", role: { id: "Frontend Next.js 16 + API routes (BFF).", en: "Next.js 16 frontend + API routes (BFF)." } },
  { lang: "GLSL", emoji: "🌌", tag: "ShaderBackground.tsx", role: { id: "Shader WebGL untuk background aurora romantis.", en: "WebGL shader for the romantic aurora background." } },
  { lang: "Go", emoji: "⚡", tag: "services/love-api", role: { id: "Hitung mundur hari spesial + kutipan cinta.", en: "Special-day countdown stats + love quotes." } },
  { lang: "Python", emoji: "🐍", tag: "services/content-api", role: { id: "Pesan / surat hari ini.", en: "Note / letter of the day." } },
  { lang: "PHP", emoji: "🐘", tag: "services/guestbook-api", role: { id: "API buku tamu (pesan dari Najwa).", en: "Guestbook API (messages from Najwa)." } },
  { lang: "SQL", emoji: "🗃️", tag: "db/schema.sql - SQLite", role: { id: "Penyimpanan pesan buku tamu.", en: "Persistent storage for guestbook." } },
  { lang: "Java", emoji: "☕", tag: "services/gallery-api", role: { id: "Metadata galeri / kenangan.", en: "Gallery / memories metadata." } },
  { lang: "Perl", emoji: "🐪", tag: "scripts/build-manifest.pl", role: { id: "Generator manifest aset saat build.", en: "Build-time asset manifest generator." } },
];

export default function StackPage() {
  const { lang } = useApp();
  const id = lang === "id";

  return (
    <main className="relative z-10 mx-auto max-w-4xl px-5 py-20">
      <Link href="/" className="text-sm font-semibold text-rose transition hover:text-gold">
        ← {id ? "Kembali" : "Back"}
      </Link>

      <h1 className="font-display text-gradient mt-6 text-5xl font-bold md:text-7xl">
        {id ? "Dibangun Dengan Cinta" : "Built With Love"}
      </h1>
      <p className="mt-3 max-w-2xl text-muted">
        {id
          ? "Web hadiah ini sengaja dibangun full-stack memakai 8 bahasa pemrograman - tiap bahasa punya peran nyata. Kalau ada service yang mati, situs tetap jalan dengan fallback."
          : "This gift is intentionally built full-stack across 8 programming languages - each with a real role. If a service is down, the site still works via fallbacks."}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {STACK.map((s, i) => (
          <motion.div
            key={s.lang}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.5 }}
            className="glass rounded-2xl p-5"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{s.emoji}</span>
              <h2 className="font-display text-2xl text-rose">{s.lang}</h2>
            </div>
            <p className="mt-2 text-sm text-cream">{id ? s.role.id : s.role.en}</p>
            <code className="mt-3 inline-block rounded-md bg-black/30 px-2 py-1 text-xs text-gold">{s.tag}</code>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 text-center font-script text-2xl text-rose">
        {id ? "Untuk Najwa Aidah 💖" : "For Najwa Aidah 💖"}
      </p>
    </main>
  );
}
