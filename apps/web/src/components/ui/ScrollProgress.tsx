"use client";

import { motion, useScroll, useSpring } from "motion/react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <motion.div
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[100000] h-[3px] origin-left"
    >
      <div className="h-full w-full bg-gradient-to-r from-rose via-gold to-rose-deep shadow-[0_0_12px_var(--rose)]" />
    </motion.div>
  );
}
