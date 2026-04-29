import { NextResponse } from "next/server";
import { GOOGLE_APPS_SCRIPT_URL } from "@/lib/enquiry-api";

export async function POST(request: Request) {
  let body: string;
  try {
    const json = await request.json();
    body = JSON.stringify(json);
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const upstream = await fetch(GOOGLE_APPS_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const text = await upstream.text();
  return new NextResponse(text, {
    status: upstream.ok ? 200 : 502,
    headers: { "Content-Type": upstream.headers.get("content-type") ?? "text/plain; charset=utf-8" },
  });
}
