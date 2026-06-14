# For My Fav Person 💖

A polyglot, full-stack love letter for **Najwa Aidah** - built across **8 programming
languages**, each with a real job to do. Romantic by design, over-engineered on purpose.

> If a backend service is offline, the site still works: every feature has a graceful
> built-in fallback, so the live frontend never breaks.

## The 8 languages

| Language | Where | Role |
| --- | --- | --- |
| **TypeScript** | `apps/web` | Next.js 16 frontend + API routes (BFF) |
| **GLSL** | `apps/web/.../ShaderBackground.tsx` | WebGL aurora shader background |
| **Go** | `services/love-api` | Countdown stats + love quotes |
| **Python** | `services/content-api` | Note / letter of the day |
| **PHP** | `services/guestbook-api` | Guestbook API |
| **SQL** | `db/schema.sql` (SQLite) | Guestbook storage |
| **Java** | `services/gallery-api` | Gallery / memories metadata |
| **Perl** | `scripts/build-manifest.pl` | Build-time asset manifest |

## Architecture

```
Browser ──► Next.js (TypeScript)
              │   GLSL shader runs in the browser
              ▼
        /api/* BFF routes
              ├──► Go      love-api      :8081  /stats /quotes
              ├──► Python  content-api   :8082  /note
              ├──► PHP     guestbook-api :8083  /guestbook ──► SQLite (SQL)
              └──► Java    gallery-api   :8084  /gallery
```

## Highlights

- 14 motion/visual effects: GLSL aurora, floating hearts, sparkle cursor trail,
  meteors, scroll-reveal, typewriter, animated gradient text, 3D tilt + spotlight
  cards, confetti hearts, flip counters, infinite marquee, open-letter reveal,
  scroll progress, glowing controls.
- Bilingual (Indonesian / English) with persisted theme + language.
- Fully responsive, respects `prefers-reduced-motion`.

## Run locally

Prerequisites: Node 20+, pnpm, and (optionally) Go, Python, PHP, Java for the services.

```bash
pnpm install

# 1) start the backend services (Windows helper opens one window per service)
pnpm services:win
#    …or run them individually:
#    pnpm svc:go        # Go    :8081
#    pnpm svc:py        # Python:8082
#    pnpm svc:php       # PHP   :8083
#    pnpm svc:java:build && pnpm svc:java   # Java :8084

# 2) start the web app
pnpm dev                 # http://localhost:3000
```

Copy `apps/web/.env.example` → `apps/web/.env.local` to point at the services.
Generate the asset manifest any time with `pnpm manifest` (Perl).

## Deploy

The frontend (`apps/web`) deploys to any Next.js host (e.g. Vercel) on its own - the
fallbacks keep every section working even without the backend services running.

---

© Damta Noviyan Muhamad Faiz - made with eight languages and one heart.
