import { NextResponse } from "next/server";
import { SERVICES, tryFetch } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET() {
  const res = await tryFetch(`${SERVICES.gallery}/gallery`);
  if (!res || !res.ok) return NextResponse.json({ error: "gallery-api offline" }, { status: 503 });
  return NextResponse.json(await res.json());
}
