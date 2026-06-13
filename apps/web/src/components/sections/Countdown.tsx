"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";
import { burstConfetti } from "@/lib/confetti";

const TARGET = new Date("2026-11-02T00:00:00");

type Parts = { months: number; days: number; hours: number; minutes: number; seconds: number };

function diff(target: Date, now: Date): Parts {
  let months = (target.getFullYear() - now.getFullYear()) * 12 + (target.getMonth() - now.getMonth());
  let days = target.getDate() - now.getDate();
  if (days < 0) {
    months -= 1;
    days += new Date(target.getFullYear(), target.getMonth(), 0).getDate();
  }
  const ms = target.getTime() - now.getTime();
  const hours = Math.floor((ms / 36e5) % 24);
  const minutes = Math.floor((ms / 6e4) % 60);
  const seconds = Math.floor((ms / 1e3) % 60);
  return { months: Math.max(0, months), days: Math.max(0, days), hours, minutes, seconds };
}

function Box({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div
      className="glass group relative w-20 rounded-2xl px-2 py-4 text-center transition-transform duration-300 hover:scale-110 md:w-28"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="relative h-12 overflow-hidden md:h-16">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={v}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="font-display absolute inset-0 flex items-center justify-center bg-gradient-to-b from-rose to-gold bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <p className="mt-1 text-[0.65rem] font-bold uppercase tracking-wider text-muted md:text-xs">{label}</p>
    </div>
  );
}

export default function Countdown() {
  const { t, lang } = useApp();
  const [parts, setParts] = useState<Parts | null>(null);
  const [done, setDone] = useState(false);
  const [serverMsg, setServerMsg] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      if (now >= TARGET) {
        setDone(true);
        return;
      }
      setParts(diff(TARGET, now));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (done) {
      burstConfetti(window.innerWidth * 0.5, window.innerHeight * 0.4, 40);
    }
  }, [done]);

  // server-computed stat from the Go service (graceful if offline)
  useEffect(() => {
    fetch(`/api/stats?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => d?.message && setServerMsg(d.message))
      .catch(() => {});
  }, [lang]);

  return (
    <Section id="countdown" title={t.countdown_title} subtitle={t.countdown_sub}>
      {done ? (
        <p className="font-script mt-8 text-center text-4xl text-rose">{t.happy_day}</p>
      ) : (
        parts && (
          <div className="mt-10 flex flex-wrap justify-center gap-3 md:gap-5" style={{ perspective: 1000 }}>
            <Box value={parts.months} label={t.months} />
            <Box value={parts.days} label={t.days} />
            <Box value={parts.hours} label={t.hours} />
            <Box value={parts.minutes} label={t.minutes} />
            <Box value={parts.seconds} label={t.seconds} />
          </div>
        )
      )}
      {serverMsg && <p className="mt-8 text-center text-sm text-gold">✦ {serverMsg}</p>}
    </Section>
  );
}
