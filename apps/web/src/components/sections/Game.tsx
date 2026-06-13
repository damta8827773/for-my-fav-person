"use client";

import { useEffect, useRef, useState } from "react";
import { useApp } from "@/components/providers";
import Section from "@/components/ui/Section";

type State = "ready" | "playing" | "over";

export default function Game() {
  const { t } = useApp();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("ready");
  const [score, setScore] = useState(0);
  const startRef = useRef<() => void>(() => {});

  const game = useRef({
    running: false,
    score: 0,
    playerX: 0,
    items: [] as { x: number; y: number; type: string; speed: number }[],
    raf: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const wrap = wrapRef.current!;
    const ctx = canvas.getContext("2d")!;
    const g = game.current;

    const resize = () => {
      canvas.width = wrap.offsetWidth;
      canvas.height = wrap.offsetHeight;
      g.playerX = canvas.width / 2;
    };
    resize();
    window.addEventListener("resize", resize);

    const move = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      g.playerX = clientX - rect.left;
    };
    const onPointer = (e: PointerEvent) => move(e.clientX);
    canvas.addEventListener("pointermove", onPointer);

    const loop = () => {
      if (!g.running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // paddle
      ctx.fillStyle = "#e89ab0";
      ctx.shadowBlur = 18;
      ctx.shadowColor = "#e89ab0";
      ctx.fillRect(g.playerX - 28, canvas.height - 22, 56, 10);
      ctx.shadowBlur = 0;

      if (Math.random() < 0.03) {
        const types = ["💖", "💌", "💀"];
        g.items.push({
          x: Math.random() * canvas.width,
          y: 0,
          type: types[Math.floor(Math.random() * types.length)],
          speed: Math.random() * 2 + 2,
        });
      }

      ctx.font = "26px serif";
      for (let i = 0; i < g.items.length; i++) {
        const it = g.items[i];
        it.y += it.speed;
        ctx.fillText(it.type, it.x, it.y);
        const caught =
          it.y > canvas.height - 32 && it.y < canvas.height && it.x > g.playerX - 32 && it.x < g.playerX + 32;
        if (caught) {
          if (it.type === "💀") {
            end();
            return;
          }
          g.score += 10;
          setScore(g.score);
          g.items.splice(i--, 1);
        } else if (it.y > canvas.height) {
          g.items.splice(i--, 1);
        }
      }
      g.raf = requestAnimationFrame(loop);
    };

    const end = () => {
      g.running = false;
      cancelAnimationFrame(g.raf);
      setState("over");
    };

    // expose start via ref closure
    startRef.current = () => {
      resize();
      g.running = true;
      g.score = 0;
      g.items = [];
      setScore(0);
      setState("playing");
      loop();
    };

    return () => {
      g.running = false;
      cancelAnimationFrame(g.raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return (
    <Section id="game" title={t.game_title} subtitle={t.game_sub}>
      <div
        ref={wrapRef}
        className="relative mx-auto mt-8 h-[400px] w-full max-w-xl touch-none overflow-hidden rounded-2xl border border-rose/40 bg-black/40"
        style={{ cursor: "crosshair" }}
      >
        <div className="pointer-events-none absolute left-3 top-2 z-10 font-bold text-rose">
          {t.game_score}: {score}
        </div>
        <canvas ref={canvasRef} className="block h-full w-full" />

        {state !== "playing" && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-3 bg-black/75 text-center text-white">
            <h3 className="font-display text-3xl text-rose">
              {state === "over" ? t.game_over : t.game_ready}
            </h3>
            {state === "over" && (
              <p>
                {t.game_score}: <span className="text-gold">{score}</span>
              </p>
            )}
            <button
              onClick={() => startRef.current()}
              className="rounded-full bg-gradient-to-br from-rose-deep to-gold px-6 py-2 font-bold text-white shadow-[0_0_18px_var(--rose-deep)] transition hover:scale-105"
            >
              {state === "over" ? t.game_retry : t.game_start}
            </button>
          </div>
        )}
      </div>
    </Section>
  );
}
