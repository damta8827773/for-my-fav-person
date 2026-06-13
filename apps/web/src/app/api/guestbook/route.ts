import { NextRequest, NextResponse } from "next/server";
import { SERVICES, tryFetch } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await tryFetch(`${SERVICES.guestbook}/guestbook`);
  if (!res || !res.ok) return NextResponse.json({ error: "guestbook-api offline" }, { status: 503 });
  return NextResponse.json(await res.json());
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const res = await tryFetch(`${SERVICES.guestbook}/guestbook`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });
  if (!res || !res.ok) return NextResponse.json({ error: "guestbook-api offline" }, { status: 503 });
  return NextResponse.json(await res.json(), { status: res.status });
}
