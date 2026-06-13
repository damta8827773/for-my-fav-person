"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";

export default function Loader() {
  const { t } = useApp();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => setShow(false), 2600);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[var(--bg)]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ x: "-30vw", y: 40, rotate: -8, opacity: 0 }}
            animate={{ x: "30vw", y: -40, rotate: 14, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
            className="text-rose drop-shadow-[0_0_18px_var(--rose)]"
          >
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-script mt-4 text-2xl text-muted"
          >
            {t.loading}…
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
