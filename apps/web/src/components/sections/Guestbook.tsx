"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";

type Entry = { id?: number; name: string; message: string; created_at?: string };

export default function Guestbook() {
  const { t } = useApp();
  const [entries, setEntries] = useState<Entry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [offline, setOffline] = useState(false);

  const load = () => {
    fetch("/api/guestbook")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => Array.isArray(d) && setEntries(d))
      .catch(() => setOffline(true));
  };
  useEffect(load, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const msg = message.trim();
    if (!msg) return;
    const entry: Entry = { name: name.trim() || "Najwa", message: msg, created_at: new Date().toISOString() };
    setEntries((prev) => [entry, ...prev]);
    setMessage("");
    try {
      const r = await fetch("/api/guestbook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(entry),
      });
      if (!r.ok) throw new Error();
      setOffline(false);
      load();
    } catch {
      setOffline(true);
    }
  };

  return (
    <Section id="guestbook" title={t.guestbook_title} subtitle={t.guestbook_sub}>
      <form onSubmit={submit} className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.guestbook_name}
          className="glass rounded-xl px-4 py-3 text-cream outline-none placeholder:text-muted focus:border-rose"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.guestbook_msg}
          rows={3}
          className="glass resize-none rounded-xl px-4 py-3 text-cream outline-none placeholder:text-muted focus:border-rose"
        />
        <button
          type="submit"
          className="self-end rounded-full bg-gradient-to-br from-rose-deep to-gold px-6 py-2 font-bold text-white shadow-[0_0_18px_var(--rose-deep)] transition hover:scale-105"
        >
          {t.guestbook_send}
        </button>
      </form>

      {offline && <p className="mt-4 text-center text-xs text-muted">{t.guestbook_offline}</p>}

      <div className="mx-auto mt-8 flex max-w-xl flex-col gap-3">
        {entries.length === 0 && <p className="text-center text-sm italic text-muted">{t.guestbook_empty}</p>}
        <AnimatePresence initial={false}>
          {entries.map((en, i) => (
            <motion.div
              key={en.id ?? `${en.created_at}-${i}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-2xl px-5 py-3 text-left"
            >
              <p className="font-script text-lg text-rose">{en.name}</p>
              <p className="text-sm text-cream">{en.message}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </Section>
  );
}
