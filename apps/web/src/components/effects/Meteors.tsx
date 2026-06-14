"use client";

import { useMemo } from "react";

/** Subtle shooting stars - like little wishes crossing the night. */
export default function Meteors({ count = 14 }: { count?: number }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 40}%`,
        delay: `${Math.random() * 6}s`,
        duration: `${Math.random() * 4 + 4}s`,
        key: i,
      })),
    [count],
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-[5] overflow-hidden">
      {meteors.map((m) => (
        <span
          key={m.key}
          className="absolute h-0.5 w-0.5 rounded-full bg-rose shadow-[0_0_0_1px_rgba(232,154,176,0.1)]"
          style={{
            left: m.left,
            top: m.top,
            animation: `meteor ${m.duration} linear ${m.delay} infinite`,
          }}
        >
          <span className="absolute top-1/2 h-px w-16 -translate-y-1/2 bg-gradient-to-r from-rose to-transparent" />
        </span>
      ))}
    </div>
  );
}
