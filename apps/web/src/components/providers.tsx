"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { dict, type Lang } from "@/lib/i18n";

type Theme = "dark" | "light";

type Ctx = {
  lang: Lang;
  theme: Theme;
  t: (typeof dict)[Lang];
  toggleLang: () => void;
  toggleTheme: () => void;
};

const AppContext = createContext<Ctx | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("id");
  const [theme, setTheme] = useState<Theme>("dark");

  // restore preferences
  useEffect(() => {
    const savedLang = localStorage.getItem("lang") as Lang | null;
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedLang) setLang(savedLang);
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // reflect theme on <html>
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("lang", lang);
  }, [lang]);

  const toggleLang = useCallback(() => setLang((l) => (l === "id" ? "en" : "id")), []);
  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);

  return (
    <AppContext.Provider value={{ lang, theme, t: dict[lang], toggleLang, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within Providers");
  return ctx;
}
