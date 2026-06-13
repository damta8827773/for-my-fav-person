"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";

export default function Words() {
  const { t, lang } = useApp();
  const [quotes, setQuotes] = useState<string[]>([...t.quotes]);

  // quotes can be served by the Go love-api; fall back to local strings
  useEffect(() => {
    setQuotes([...t.quotes]);
    fetch(`/api/quotes?lang=${lang}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => Array.isArray(d?.quotes) && d.quotes.length && setQuotes(d.quotes))
      .catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const row = [...quotes, ...quotes];

  return (
    <Section id="words" title={t.words_title}>
      <div className="group relative mt-10 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="flex w-max gap-5"
          style={{ animation: "marquee 32s linear infinite" }}
        >
          {row.map((q, i) => (
            <div
              key={i}
              className="glass flex min-h-28 w-72 items-center justify-center rounded-2xl px-6 py-5 text-center"
            >
              <p className="font-script text-xl text-rose md:text-2xl">“{q}”</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
