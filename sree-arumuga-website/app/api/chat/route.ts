import { NextResponse } from "next/server";
import {
  GEMINI_MODEL,
  SUBMIT_ENQUIRY_TOOL,
  SYSTEM_PROMPT,
} from "@/lib/chatbot-knowledge";

type ClientMessage = { role: "user" | "bot"; text: string };

type GeminiPart = { text?: string; functionCall?: { name: string; args: Record<string, unknown> } };

export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "AI is not configured." },
      { status: 500 },
    );
  }

  let messages: ClientMessage[];
  try {
    const json = (await request.json()) as { messages?: ClientMessage[] };
    messages = Array.isArray(json.messages) ? json.messages : [];
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const mapped = messages
    .filter((m) => m.text && m.text.trim())
    .map((m) => ({
      role: m.role === "bot" ? "model" : "user",
      parts: [{ text: m.text }],
    }));

  // Gemini requires the conversation to start with a user turn.
  const firstUserIndex = mapped.findIndex((m) => m.role === "user");
  const contents = firstUserIndex === -1 ? [] : mapped.slice(firstUserIndex);

  if (contents.length === 0) {
    return NextResponse.json({ error: "No message to process." }, { status: 400 });
  }

  const body = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    tools: [SUBMIT_ENQUIRY_TOOL],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1024,
    },
  };

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`;

  let upstream: Response;
  try {
    upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    return NextResponse.json({ error: "Could not reach AI service." }, { status: 502 });
  }

  if (!upstream.ok) {
    return NextResponse.json({ error: "AI service error." }, { status: 502 });
  }

  let data: unknown;
  try {
    data = await upstream.json();
  } catch {
    return NextResponse.json({ error: "Bad AI response." }, { status: 502 });
  }

  const parts: GeminiPart[] =
    (data as { candidates?: { content?: { parts?: GeminiPart[] } }[] })?.candidates?.[0]?.content
      ?.parts ?? [];

  const functionCall = parts.find((p) => p.functionCall)?.functionCall;
  const text = parts
    .map((p) => p.text)
    .filter(Boolean)
    .join("\n")
    .trim();

  if (functionCall) {
    return NextResponse.json({
      text: text || undefined,
      functionCall: { name: functionCall.name, args: functionCall.args ?? {} },
    });
  }

  return NextResponse.json({ text: text || "Sorry, I didn't catch that. Could you rephrase?" });
}
