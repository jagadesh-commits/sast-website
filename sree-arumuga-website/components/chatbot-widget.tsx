"use client";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { PHONES_DISPLAY, WHATSAPP_NUMBER_DIGITS } from "@/lib/company-contact";
import { useChatbotOpen } from "@/components/chatbot-open-context";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "sas-chatbot-session-v3";

/** Main site WhatsApp (Talk to Team fallback). */
const WHATSAPP_NUMBER = WHATSAPP_NUMBER_DIGITS;
/** Used ONLY when redirecting after a successful chatbot enquiry submission. */
const WHATSAPP_CHATBOT_SUBMIT_NUMBER = "919889883039";

const SUGGESTIONS = [
  "I need a quote",
  "Tell me about your products",
  "What thickness of GP sheets do you have?",
  "Contact details",
];

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

/** Mirrors the data needed to build the lead payload for the Google Sheet + WhatsApp. */
type EnquiryState = {
  product: string;
  sheetType: string;
  brand: string;
  thickness: string;
  width: string;
  length: string;
  spec: string;
  quantityValue: string;
  quantityUnit: string;
  name: string;
  phone: string;
  otherDescription: string;
};

type EnquiryArgs = Partial<EnquiryState>;

type ChatResponse = {
  text?: string;
  functionCall?: { name: string; args: EnquiryArgs };
  error?: string;
};

type PersistedState = {
  open: boolean;
  messages: ChatMessage[];
  inactivityPrompted: boolean;
};

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function normalizeIndianMobile(raw: string): string {
  let d = raw.replace(/\D/g, "");
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  else if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return d;
}

function isValidIndianMobile(raw: string): boolean {
  return /^[6-9]\d{9}$/.test(normalizeIndianMobile(raw));
}

function argsToEnquiry(args: EnquiryArgs): EnquiryState {
  const hasDescription = Boolean(args.otherDescription && args.otherDescription.trim());
  return {
    product: args.product?.trim() || (hasDescription ? "Others" : ""),
    sheetType: args.sheetType?.trim() || "",
    brand: args.brand?.trim() || "",
    thickness: args.thickness?.trim() || "",
    width: args.width?.trim() || "",
    length: args.length?.trim() || "",
    spec: args.spec?.trim() || "",
    quantityValue: args.quantityValue?.trim() || "",
    quantityUnit: args.quantityUnit?.trim() || "Tons",
    name: args.name?.trim() || "",
    phone: normalizeIndianMobile(args.phone || ""),
    otherDescription: args.otherDescription?.trim() || "",
  };
}

function buildWhatsAppMessage(enquiry: EnquiryState): string {
  if (enquiry.product === "Others" || (!enquiry.sheetType && enquiry.otherDescription)) {
    return `New Steel Enquiry from Website:
Product: Others
Description: ${enquiry.otherDescription || "—"}
Name: ${enquiry.name}
Phone: ${enquiry.phone}`;
  }
  return `New Steel Enquiry from Website:
Product: ${enquiry.product} ${enquiry.sheetType}
Brand: ${enquiry.brand || "—"}
Thickness: ${enquiry.thickness ? `${enquiry.thickness}mm` : "—"}
Width x Length: ${enquiry.width && enquiry.length ? `${enquiry.width}x${enquiry.length}mm` : "—"}
Grade/GSM/AZ: ${enquiry.spec || "—"}
Quantity: ${enquiry.quantityValue ? `${enquiry.quantityValue} ${enquiry.quantityUnit}` : "—"}
Name: ${enquiry.name}
Phone: ${enquiry.phone}`;
}

/** Minimal markdown rendering for bold (**text**) and bullet lines. */
function renderRichText(text: string) {
  return text.split("\n").map((line, lineIndex) => {
    const trimmed = line.trimStart();
    const isBullet = trimmed.startsWith("* ") || trimmed.startsWith("- ") || trimmed.startsWith("• ");
    const content = isBullet ? trimmed.slice(2) : line;
    const segments = content.split(/(\*\*[^*]+\*\*)/g).map((seg, segIndex) => {
      if (seg.startsWith("**") && seg.endsWith("**")) {
        return <strong key={segIndex}>{seg.slice(2, -2)}</strong>;
      }
      return <span key={segIndex}>{seg}</span>;
    });
    return (
      <div key={lineIndex} className={isBullet ? "flex gap-1.5" : undefined}>
        {isBullet ? <span aria-hidden>•</span> : null}
        <span>{segments}</span>
      </div>
    );
  });
}

export function ChatbotWidget() {
  const { setChatbotOpen } = useChatbotOpen();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setChatbotOpen(open);
  }, [open, setChatbotOpen]);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [inactivityPrompted, setInactivityPrompted] = useState(false);
  const [lastActivityTs, setLastActivityTs] = useState<number>(Date.now());
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setTooltipVisible(true), 3000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) setTooltipVisible(false);
  }, [open]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as PersistedState;
      if (!parsed || !Array.isArray(parsed.messages)) return;
      setOpen(Boolean(parsed.open));
      setMessages(parsed.messages);
      setInactivityPrompted(Boolean(parsed.inactivityPrompted));
    } catch {
      // Ignore corrupted session data
    }
  }, []);

  useEffect(() => {
    const payload: PersistedState = { open, messages, inactivityPrompted };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [open, messages, inactivityPrompted]);

  useEffect(() => {
    if (!open) return;
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, open, botTyping]);

  useEffect(() => {
    if (!open) return;
    if (submitting) return;
    const timer = window.setTimeout(() => {
      if (inactivityPrompted) return;
      setMessages((prev) => [
        ...prev,
        { id: makeId("bot"), sender: "bot", text: "Still there? Ask me anything about our steel products or request a quote." },
      ]);
      setInactivityPrompted(true);
    }, 30000);
    return () => window.clearTimeout(timer);
  }, [open, lastActivityTs, inactivityPrompted, submitting]);

  const talkToTeamUrl = useMemo(
    () => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi! I need help with a steel enquiry.")}`,
    [],
  );

  const markActivity = () => {
    setLastActivityTs(Date.now());
    setInactivityPrompted(false);
  };

  const addBotMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: makeId("bot"), sender: "bot", text }]);
  };

  const restartConversation = () => {
    setMessages([
      {
        id: makeId("bot"),
        sender: "bot",
        text: "👋 Welcome to Sree Arumuga Steel Trading — trusted since 1984!\n\nI'm your Steel Assistant. Ask me about our products or tell me what you need a quote for.",
      },
    ]);
    setInput("");
    setBotTyping(false);
    setSubmitting(false);
    markActivity();
  };

  const submitToSheet = async (current: EnquiryState): Promise<boolean> => {
    const detailMessage = buildWhatsAppMessage(current);
    const isOthers = current.product === "Others" || (!current.sheetType && Boolean(current.otherDescription));
    const payload = {
      timestamp: new Date().toISOString(),
      name: current.name,
      phone: current.phone,
      productType: current.product || "Others",
      sheetOrCoil: isOthers ? "—" : current.sheetType || "—",
      brand: isOthers ? "—" : current.brand || "—",
      thickness: isOthers ? "—" : current.thickness || "—",
      width: isOthers ? "—" : current.width || "—",
      length: isOthers ? "—" : current.length || "—",
      gradeGsmAz: isOthers ? current.otherDescription : current.spec || "—",
      quantity: isOthers ? "—" : current.quantityValue ? `${current.quantityValue} ${current.quantityUnit}` : "—",
      source: "Chatbot (AI)",
      email: "",
      message: detailMessage,
      productInterest: isOthers ? "Others (custom)" : `${current.product} ${current.sheetType}`.trim(),
    };

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return false;
      const raw = await res.text();
      if (!raw.trim()) return true;
      try {
        const data = JSON.parse(raw) as { success?: boolean; result?: string };
        if (data.success === false || data.result === "error") return false;
      } catch {
        // Ignore non-JSON response body
      }
      return true;
    } catch {
      return false;
    }
  };

  const openWhatsAppWithEnquiry = (current: EnquiryState) => {
    const text = buildWhatsAppMessage(current);
    window.open(
      `https://wa.me/${WHATSAPP_CHATBOT_SUBMIT_NUMBER}?text=${encodeURIComponent(text)}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const handleEnquirySubmission = async (args: EnquiryArgs) => {
    const enquiry = argsToEnquiry(args);
    if (!isValidIndianMobile(enquiry.phone)) {
      addBotMessage("That phone number doesn't look right. Please share a valid 10-digit Indian mobile number (starting with 6-9).");
      return;
    }
    setSubmitting(true);
    const ok = await submitToSheet(enquiry);
    setSubmitting(false);
    if (ok) {
      openWhatsAppWithEnquiry(enquiry);
      trackEvent("chatbot_enquiry_complete", { product: enquiry.product || "unknown" });
      addBotMessage(
        `✅ Thank you${enquiry.name ? ` ${enquiry.name}` : ""}!\nYour enquiry has been submitted. Our team will contact you within 2 hours.\n\nFor urgent enquiries: 📞 ${PHONES_DISPLAY}`,
      );
      return;
    }
    addBotMessage("I couldn't submit your enquiry just now. Please tap \"Talk to Team\" below, or try again in a moment.");
  };

  const sendMessage = async (rawText: string) => {
    const text = rawText.trim();
    if (!text || botTyping || submitting) return;
    markActivity();
    const userMessage: ChatMessage = { id: makeId("user"), sender: "user", text };
    const history = [...messages, userMessage];
    setMessages(history);
    setInput("");
    setBotTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map((m) => ({ role: m.sender, text: m.text })),
        }),
      });

      if (!res.ok) {
        setBotTyping(false);
        addBotMessage(
          `Sorry, I'm having trouble right now. You can reach our team directly on WhatsApp using the button below, or call ${PHONES_DISPLAY}.`,
        );
        return;
      }

      const data = (await res.json()) as ChatResponse;
      setBotTyping(false);

      if (data.text) addBotMessage(data.text);
      if (data.functionCall?.name === "submit_enquiry") {
        await handleEnquirySubmission(data.functionCall.args);
      }
    } catch {
      setBotTyping(false);
      addBotMessage(
        `Sorry, something went wrong. Please use the "Talk to Team" button below, or call ${PHONES_DISPLAY}.`,
      );
    }
  };

  const onSubmitInput = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void sendMessage(input);
  };

  useEffect(() => {
    if (!open) return;
    if (messages.length > 0) return;
    restartConversation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, messages.length]);

  const showFabHint = tooltipVisible && !open;
  const showSuggestions = messages.length <= 1 && !botTyping && !submitting;

  return (
    <>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            style={{
              position: "fixed",
              bottom: 100,
              right: 24,
              width: 380,
              maxWidth: "min(380px, calc(100vw - 48px))",
              height: "600px",
              maxHeight: "calc(100vh - 120px)",
              borderRadius: 16,
              overflow: "hidden",
              zIndex: 9998,
              display: "flex",
              flexDirection: "column",
              background: "#ffffff",
              border: "1px solid rgb(228 228 231)",
              boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "#1a3a8f",
                padding: "12px 16px",
                borderRadius: "16px 16px 0 0",
                flexShrink: 0,
              }}
            >
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <img
                  src="/Chat_bot_icon_image.png"
                  alt=""
                  style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div>
                  <p style={{ color: "white", fontWeight: "600", fontSize: "14px", margin: 0 }}>
                    Steel Assistant
                  </p>
                  <p style={{ color: "#90EE90", fontSize: "11px", margin: 0 }}>● Online</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close chat"
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#1a3a8f",
                  fontWeight: "bold",
                  fontSize: 16,
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            <div ref={chatBodyRef} className="min-h-0 flex-1 overflow-y-auto bg-white">
              <div className="p-3">
                <AnimatePresence initial={false}>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      transition={{ duration: 0.2 }}
                      className={`mb-2 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[88%] whitespace-pre-line rounded-2xl px-3 py-2 text-sm ${
                          message.sender === "user"
                            ? "rounded-br-sm bg-[#1a3a8f] text-white"
                            : "rounded-bl-sm border border-zinc-200 bg-white text-zinc-800"
                        }`}
                      >
                        {message.sender === "bot" ? renderRichText(message.text) : message.text}
                      </div>
                    </motion.div>
                  ))}
                  {botTyping || submitting ? (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="mb-2 flex justify-start"
                    >
                      <div className="rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500">
                        {submitting ? "Submitting your enquiry..." : "Typing..."}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            </div>

            <div className="shrink-0 space-y-2 border-t border-zinc-200 bg-zinc-50 p-3">
              {showSuggestions ? (
                <div className="flex flex-wrap gap-1.5">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void sendMessage(s)}
                      className="rounded-full border border-[#1a3a8f]/25 bg-white px-3 py-1 text-xs font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : null}

              <form onSubmit={onSubmitInput} className="flex gap-2">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => {
                    setInput(e.target.value);
                    markActivity();
                  }}
                  placeholder="Type your message…"
                  aria-label="Type your message"
                  className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={botTyping || submitting || !input.trim()}
                  className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white disabled:opacity-50"
                >
                  Send
                </button>
              </form>

              <div className="flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={restartConversation}
                  className="text-[11px] font-medium text-[#1a3a8f]/80 underline hover:text-[#1a3a8f]"
                >
                  Restart conversation
                </button>
                <a
                  href={talkToTeamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-[#25D366] bg-white px-3 py-1 text-xs font-semibold text-[#1a8f4f] hover:bg-[#25D366]/10"
                >
                  Talk to Team
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {!open ? (
        <div className="chatbot-fab-anchor">
          <AnimatePresence>
            {showFabHint ? (
              <div className="steelbot-tooltip-shell">
                <motion.div
                  initial={{ opacity: 0, x: 6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 6 }}
                  className="steelbot-tooltip whitespace-nowrap"
                  role="status"
                >
                  <span className="align-middle">👋 Need a steel quote? Chat with us!</span>{" "}
                  <button
                    type="button"
                    onClick={() => setTooltipVisible(false)}
                    aria-label="Dismiss tooltip"
                    className="align-middle text-[15px] font-semibold leading-none text-[#1a3a8f]/90 hover:text-[#1a3a8f]"
                  >
                    ×
                  </button>
                </motion.div>
              </div>
            ) : null}
          </AnimatePresence>
          <button
            type="button"
            title="Chat with our AI Steel Assistant (HR, CR, GP, coils and more)."
            onClick={() => {
              markActivity();
              setOpen(true);
            }}
            aria-label="Open steel assistant"
            className="chatbot-trigger fab-stack-item relative grid shrink-0 cursor-pointer place-items-center overflow-visible rounded-full bg-transparent p-0 shadow-none"
          >
            <span
              className="pointer-events-none absolute inset-0 rounded-full bg-amber-400 opacity-60 animate-ping"
              aria-hidden
            />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full">
              <DotLottieReact
                src="/Chatbot.json"
                loop
                autoplay
                useFrameInterpolation
                renderConfig={{
                  devicePixelRatio: typeof window !== "undefined" ? Math.max(3, window.devicePixelRatio || 1) : 3,
                  autoResize: true,
                  quality: 100,
                }}
                className="h-full w-full"
              />
            </div>
          </button>
        </div>
      ) : null}
    </>
  );
}
