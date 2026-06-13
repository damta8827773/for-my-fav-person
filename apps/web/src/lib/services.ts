// Base URLs for the polyglot backend services. Each can be overridden by env.
export const SERVICES = {
  love: process.env.LOVE_API_URL ?? "http://localhost:8081", // Go
  content: process.env.CONTENT_API_URL ?? "http://localhost:8082", // Python
  guestbook: process.env.GUESTBOOK_API_URL ?? "http://localhost:8083", // PHP
  gallery: process.env.GALLERY_API_URL ?? "http://localhost:8084", // Java
};

/** Fetch JSON from a service with a short timeout; returns null on any failure. */
export async function tryFetch(url: string, init?: RequestInit): Promise<Response | null> {
  try {
    const ctrl = new AbortController();
    const id = setTimeout(() => ctrl.abort(), 1500);
    const res = await fetch(url, { ...init, cache: "no-store", signal: ctrl.signal });
    clearTimeout(id);
    return res;
  } catch {
    return null;
  }
}
