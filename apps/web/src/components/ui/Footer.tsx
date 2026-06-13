"use client";

import Link from "next/link";
import { useApp } from "@/components/providers";

export default function Footer() {
  const { t } = useApp();
  return (
    <footer className="relative z-10 mt-10 border-t border-white/10 px-6 py-10 text-center">
      <p className="text-sm text-muted">{t.footer}</p>
      <Link
        href="/stack"
        className="mt-2 inline-block text-xs font-semibold uppercase tracking-widest text-rose transition hover:text-gold"
      >
        {t.stack_link} →
      </Link>
      <p className="mt-4 text-xs text-muted/70">© {new Date().getFullYear()} Damta Noviyan Muhamad Faiz</p>
    </footer>
  );
}
