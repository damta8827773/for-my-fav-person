import { NextRequest, NextResponse } from "next/server";
import { SERVICES, tryFetch } from "@/lib/services";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const lang = req.nextUrl.searchParams.get("lang") ?? "id";
  const res = await tryFetch(`${SERVICES.love}/stats?lang=${lang}`);
  if (!res || !res.ok) return NextResponse.json({ error: "love-api offline" }, { status: 503 });
  return NextResponse.json(await res.json());
}
