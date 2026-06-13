"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/providers";
import { burstConfetti } from "@/lib/confetti";

export default function LoveFab() {
  const { t } = useApp();
  const [note, setNote] = useState<string | null>(null);
  const lastIdx = useRef(-1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    burstConfetti(r.left + r.width / 2, r.top + r.height / 2);

    const notes = t.love_notes;
    let i = Math.floor(Math.random() * notes.length);
    if (notes.length > 1 && i === lastIdx.current) i = (i + 1) % notes.length;
    lastIdx.current = i;
    setNote(notes[i]);

    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setNote(null), 4200);
  };

  return (
    <>
      <button
        onClick={onClick}
        aria-label="Surprise"
        className="animate-pulse-soft fixed bottom-6 right-6 z-[10002] flex h-14 items-center gap-0 overflow-hidden rounded-full bg-gradient-to-br from-rose-deep to-gold shadow-[0_8px_28px_-6px_var(--rose-deep)] transition-transform duration-300 hover:scale-105 active:scale-95"
      >
        <span className="flex h-14 w-14 items-center justify-center text-2xl">💝</span>
        <span className="max-w-0 whitespace-nowrap text-sm font-bold text-white opacity-0 transition-all duration-300 group-hover:max-w-[160px]" />
      </button>

      <AnimatePresence>
        {note && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            className="glass fixed bottom-24 right-6 z-[10003] max-w-[280px] rounded-2xl border-rose/60 px-5 py-4 text-sm font-medium italic text-cream"
          >
            <span className="font-script mb-1 block text-base not-italic text-rose">{t.note_of_day}</span>
            {note}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
