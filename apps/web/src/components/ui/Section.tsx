import type { ReactNode } from "react";
import Reveal from "@/components/effects/Reveal";

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className="relative mx-auto w-full max-w-4xl scroll-mt-24 px-5 py-16 md:py-24">
      <Reveal>
        <div className={`glass rounded-[28px] p-7 md:p-12 ${className}`}>
          {title && (
            <h2 className="font-display text-gradient text-center text-4xl font-bold md:text-6xl">{title}</h2>
          )}
          {subtitle && <p className="mt-2 text-center text-sm italic text-muted">{subtitle}</p>}
          {children}
        </div>
      </Reveal>
    </section>
  );
}
