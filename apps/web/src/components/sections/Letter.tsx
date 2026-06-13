"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";

export default function Letter() {
  const { t } = useApp();
  const [open, setOpen] = useState(false);

  return (
    <Section id="letter" title={t.letter_title}>
      <div className="mt-8 flex flex-col items-center">
        {!open && (
          <motion.button
            onClick={() => setOpen(true)}
            whileHover={{ scale: 1.05, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            className="group relative"
            aria-label={t.letter_open}
          >
            <span className="block text-7xl drop-shadow-[0_0_24px_var(--rose)] transition-transform group-hover:-translate-y-1 md:text-8xl">
              💌
            </span>
            <span className="mt-3 block rounded-full border border-rose/50 px-5 py-2 text-sm font-semibold text-rose">
              {t.letter_open}
            </span>
          </motion.button>
        )}

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 30, rotateX: -12 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-2xl"
            >
              <p className="text-center text-lg leading-relaxed text-cream md:text-xl">{t.letter_body}</p>
              <div className="mt-8 flex flex-col items-center gap-1">
                <span className="text-xs uppercase tracking-widest text-muted">{t.letter_sign_to}</span>
                <span className="font-script text-3xl text-rose">{t.letter_sign_to_name}</span>
                <span className="mt-3 text-xs uppercase tracking-widest text-muted">{t.letter_sign_from}</span>
                <span className="font-script text-2xl text-gold">{t.letter_sign_name}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Section>
  );
}
