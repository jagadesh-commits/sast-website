"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "sas-chatbot-session-v2";

/** Visible pill + accessibility: structured quote flow, not WhatsApp chat. */
const FAB_PRIMARY_LABEL = "Steel enquiry";
/** Main site WhatsApp (Talk to Team, quick links inside chatbot info steps). */
const WHATSAPP_NUMBER = "919940119914";
/** Used ONLY when redirecting after successful chatbot enquiry submission. */
const WHATSAPP_CHATBOT_SUBMIT_NUMBER = "919889883039";

type ProductType =
  | "HR"
  | "HRPO"
  | "CR"
  | "GP"
  | "GL"
  | "EG"
  | "PPGL"
  | "MS Plates"
  | "Colour Coated"
  | "Others";
type SheetType = "Sheet" | "Coil";
type QuantityUnit = "Tons" | "Pieces";
type Step =
  | "welcomeMenu"
  | "infoProducts"
  | "infoContact"
  | "product"
  | "othersDescribe"
  | "sheetType"
  | "brand"
  | "thickness"
  | "dimensions"
  | "spec"
  | "quantity"
  | "name"
  | "phone"
  | "confirm"
  | "submitting"
  | "completed";

/** First 8 products (2 columns); Colour Coated / Others / Talk to Team are full-width rows below. */
const PRODUCT_GRID: { id: ProductType; label: string }[] = [
  { id: "HR", label: "HR (Hot Rolled)" },
  { id: "HRPO", label: "HRPO (Hot Rolled Pickled & Oiled)" },
  { id: "CR", label: "CR (Cold Rolled)" },
  { id: "GP", label: "GP (Galvanized Plain)" },
  { id: "GL", label: "GL (Galvalume)" },
  { id: "EG", label: "EG (Electro Galvanized)" },
  { id: "PPGL", label: "PPGL (Pre-Painted Galvalume)" },
  { id: "MS Plates", label: "MS Plates" },
];

type ChatMessage = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

type EnquiryState = {
  product: ProductType | "";
  sheetType: SheetType | "";
  brand: string;
  thickness: string;
  width: string;
  length: string;
  spec: string;
  quantityValue: string;
  quantityUnit: QuantityUnit;
  name: string;
  phone: string;
  /** Filled when product is "Others" */
  otherDescription: string;
};

type PersistedState = {
  open: boolean;
  step: Step;
  messages: ChatMessage[];
  enquiry: EnquiryState;
  inactivityPrompted: boolean;
};

const INITIAL_ENQUIRY: EnquiryState = {
  product: "",
  sheetType: "",
  brand: "",
  thickness: "",
  width: "",
  length: "",
  spec: "",
  quantityValue: "",
  quantityUnit: "Tons",
  name: "",
  phone: "",
  otherDescription: "",
};

function makeId(prefix: string): string {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

function getSpecLabel(product: ProductType | ""): "Grade" | "GSM" | "AZ value" {
  if (product === "GP") return "GSM";
  if (product === "Colour Coated") return "AZ value";
  return "Grade";
}

function getSpecPlaceholder(product: ProductType | ""): string {
  if (product === "GP") return "e.g. 120, 180, 275";
  if (product === "Colour Coated") return "e.g. AZ70, AZ150";
  return "e.g. IS 513, IS 2062";
}

function buildSummary(enquiry: EnquiryState): string {
  if (enquiry.product === "Others") {
    return `Please confirm your enquiry:
📦 Product: Others
📝 Your need: ${enquiry.otherDescription}
👤 Name: ${enquiry.name}
📞 Phone: ${enquiry.phone}`;
  }
  return `Please confirm your enquiry:
📦 Product: ${enquiry.product} ${enquiry.sheetType}
🏷️ Brand: ${enquiry.brand}
📏 Thickness: ${enquiry.thickness} mm
📐 Width x Length: ${enquiry.width} x ${enquiry.length} mm
⚖️ Grade/GSM/AZ: ${enquiry.spec}
🔢 Quantity: ${enquiry.quantityValue} ${enquiry.quantityUnit}
👤 Name: ${enquiry.name}
📞 Phone: ${enquiry.phone}`;
}

function buildWhatsAppMessage(enquiry: EnquiryState): string {
  if (enquiry.product === "Others") {
    return `New Steel Enquiry from Website:
Product: Others
Description: ${enquiry.otherDescription}
Name: ${enquiry.name}
Phone: ${enquiry.phone}`;
  }
  return `New Steel Enquiry from Website:
Product: ${enquiry.product} ${enquiry.sheetType}
Brand: ${enquiry.brand}
Thickness: ${enquiry.thickness}mm
Width x Length: ${enquiry.width}x${enquiry.length}mm
Grade/GSM/AZ: ${enquiry.spec}
Quantity: ${enquiry.quantityValue} ${enquiry.quantityUnit}
Name: ${enquiry.name}
Phone: ${enquiry.phone}`;
}

function createInitialMessages(): ChatMessage[] {
  return [];
}

export function ChatbotWidget() {
  const [open, setOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [step, setStep] = useState<Step>("welcomeMenu");
  const [messages, setMessages] = useState<ChatMessage[]>(createInitialMessages);
  const [enquiry, setEnquiry] = useState<EnquiryState>(INITIAL_ENQUIRY);
  const [brandInput, setBrandInput] = useState("");
  const [thicknessInput, setThicknessInput] = useState("");
  const [widthInput, setWidthInput] = useState("");
  const [lengthInput, setLengthInput] = useState("");
  const [specInput, setSpecInput] = useState("");
  const [quantityInput, setQuantityInput] = useState("");
  const [nameInput, setNameInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [othersDescriptionInput, setOthersDescriptionInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const [inactivityPrompted, setInactivityPrompted] = useState(false);
  const [lastActivityTs, setLastActivityTs] = useState<number>(Date.now());
  const chatBodyRef = useRef<HTMLDivElement | null>(null);
  const typingTimerRef = useRef<number | null>(null);
  const delayedWelcomeRef = useRef<number | null>(null);

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
      const persistedStep = (parsed as { step?: Step }).step ?? "welcomeMenu";
      setStep(persistedStep);
      setMessages(parsed.messages.length ? parsed.messages : createInitialMessages());
      setEnquiry({ ...INITIAL_ENQUIRY, ...parsed.enquiry });
      setInactivityPrompted(Boolean(parsed.inactivityPrompted));
    } catch {
      // Ignore corrupted session data
    }
  }, []);

  useEffect(() => {
    const payload: PersistedState = {
      open,
      step,
      messages,
      enquiry,
      inactivityPrompted,
    };
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  }, [open, step, messages, enquiry, inactivityPrompted]);

  useEffect(() => {
    if (!open) return;
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTo({
        top: chatBodyRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, open]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
      if (delayedWelcomeRef.current) window.clearTimeout(delayedWelcomeRef.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    if (step === "submitting" || step === "completed") return;
    const timer = window.setTimeout(() => {
      if (inactivityPrompted) return;
      setMessages((prev) => [
        ...prev,
        { id: makeId("bot"), sender: "bot", text: "Still there? Need any help?" },
      ]);
      setInactivityPrompted(true);
    }, 30000);
    return () => window.clearTimeout(timer);
  }, [open, step, lastActivityTs, inactivityPrompted]);

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

  const addBotMessageWithTyping = (text: string, delayMs = 700): Promise<void> =>
    new Promise((resolve) => {
      setBotTyping(true);
      typingTimerRef.current = window.setTimeout(() => {
        addBotMessage(text);
        setBotTyping(false);
        resolve();
      }, delayMs);
    });

  const addUserMessage = (text: string) => {
    setMessages((prev) => [...prev, { id: makeId("user"), sender: "user", text }]);
  };

  const restartConversation = () => {
    setStep("welcomeMenu");
    setEnquiry(INITIAL_ENQUIRY);
    setBrandInput("");
    setThicknessInput("");
    setWidthInput("");
    setLengthInput("");
    setSpecInput("");
    setQuantityInput("");
    setNameInput("");
    setPhoneInput("");
    setOthersDescriptionInput("");
    setMessages(createInitialMessages());
    setBotTyping(false);
    markActivity();
    void runWelcomeSequence();
  };

  const runWelcomeSequence = async () => {
    setStep("welcomeMenu");
    addBotMessageWithTyping("👋 Hello! Welcome to\nSree Arumuga Steel Trading!\nTrusted Since 1984 🏭", 350);
    delayedWelcomeRef.current = window.setTimeout(() => {
      void addBotMessageWithTyping("I'm your Steel Enquiry Assistant.\nHow can I help you today?", 450);
    }, 1000);
  };

  const submitToSheet = async (current: EnquiryState): Promise<boolean> => {
    const detailMessage = buildWhatsAppMessage(current);
    const isOthers = current.product === "Others";
    const payload = {
      timestamp: new Date().toISOString(),
      name: current.name,
      phone: current.phone,
      productType: current.product,
      sheetOrCoil: isOthers ? "—" : current.sheetType,
      brand: isOthers ? "—" : current.brand,
      thickness: isOthers ? "—" : current.thickness,
      width: isOthers ? "—" : current.width,
      length: isOthers ? "—" : current.length,
      gradeGsmAz: isOthers ? current.otherDescription : current.spec,
      quantity: isOthers ? "—" : `${current.quantityValue} ${current.quantityUnit}`,
      source: "Chatbot",
      // Backward compatibility for existing sheet handler
      email: "",
      message: detailMessage,
      productInterest: isOthers ? "Others (custom)" : `${current.product} ${current.sheetType}`,
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

  const onSelectProduct = (item: { id: ProductType; label: string }) => {
    markActivity();
    if (item.id === "Others") {
      setEnquiry((prev) => ({
        ...prev,
        product: "Others",
        spec: "",
        sheetType: "",
        brand: "",
        thickness: "",
        width: "",
        length: "",
        quantityValue: "",
        name: "",
        phone: "",
        otherDescription: "",
      }));
      addUserMessage(item.label);
      void addBotMessageWithTyping(
        "Please describe what steel product you are looking for and our team will get back to you with the right solution.",
        400,
      );
      setStep("othersDescribe");
      return;
    }
    setEnquiry((prev) => ({ ...prev, product: item.id, spec: "", otherDescription: "" }));
    addUserMessage(item.label);
    addBotMessage("Please select the type:");
    setStep("sheetType");
  };

  const onSubmitOthersDescription = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = othersDescriptionInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, otherDescription: value }));
    addUserMessage(value);
    addBotMessage("Your Name:");
    setOthersDescriptionInput("");
    setStep("name");
  };

  const onSelectWelcomeAction = (action: "enquiry" | "products" | "contact") => {
    markActivity();
    if (action === "enquiry") {
      addUserMessage("1️⃣ Steel Enquiry");
      void addBotMessageWithTyping("Please select your product:", 350);
      setStep("product");
      return;
    }

    if (action === "products") {
      addUserMessage("2️⃣ Product Information");
      void addBotMessageWithTyping(
        "We deal in the following products:\n• HRPO Sheets & Coils\n• HR Sheets & Coils\n• CR Sheets & Coils\n• GP Sheets & Coils\n• Colour Coated Sheets & Coils\n\nAll products are from trusted brands like JSW Steel.\n\nWould you like to place an enquiry?",
        400,
      );
      setStep("infoProducts");
      return;
    }

    addUserMessage("3️⃣ Contact Us");
    void addBotMessageWithTyping(
      "📞 Phone: +91 99401 19914\n📧 Email: sree.arumuga@gmail.com\n📍 D-196, Sathangadu Iron & Steel \nMarket, Manali, Chennai - 600068\n\n🕐 Working Hours:\nMon-Sat: 9AM - 6PM\n\nOr chat with us directly on WhatsApp!",
      400,
    );
    setStep("infoContact");
  };

  const onSelectSheetType = (value: SheetType) => {
    markActivity();
    setEnquiry((prev) => ({ ...prev, sheetType: value }));
    addUserMessage(value);
    addBotMessage("Please enter your preferred brand:");
    setStep("brand");
  };

  const onSubmitBrand = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = brandInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, brand: value }));
    addUserMessage(value);
    addBotMessage("Please enter thickness (in mm):");
    setBrandInput("");
    setStep("thickness");
  };

  const onSubmitThickness = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = thicknessInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, thickness: value }));
    addUserMessage(`${value} mm`);
    addBotMessage("Please enter Width x Length (in mm):");
    setThicknessInput("");
    setStep("dimensions");
  };

  const onSubmitDimensions = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const width = widthInput.trim();
    const length = lengthInput.trim();
    if (!width || !length) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, width, length }));
    addUserMessage(`${width} x ${length} mm`);
    const specLabel = getSpecLabel(enquiry.product);
    addBotMessage(`Please enter ${specLabel}:`);
    setWidthInput("");
    setLengthInput("");
    setStep("spec");
  };

  const onSubmitSpec = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = specInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, spec: value }));
    addUserMessage(value);
    addBotMessage("Please enter quantity required:");
    setSpecInput("");
    setStep("quantity");
  };

  const onSubmitQuantity = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = quantityInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, quantityValue: value }));
    addUserMessage(`${value} ${enquiry.quantityUnit}`);
    addBotMessage("Almost done! Please share your details:\nYour Name:");
    setQuantityInput("");
    setStep("name");
  };

  const onSubmitName = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = nameInput.trim();
    if (!value) return;
    markActivity();
    setEnquiry((prev) => ({ ...prev, name: value }));
    addUserMessage(value);
    addBotMessage("Your Phone Number:");
    setNameInput("");
    setStep("phone");
  };

  const onSubmitPhone = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = phoneInput.trim();
    if (!value) return;
    markActivity();
    const nextEnquiry = { ...enquiry, phone: value };
    setEnquiry(nextEnquiry);
    addUserMessage(value);
    addBotMessage(buildSummary(nextEnquiry));
    setPhoneInput("");
    setStep("confirm");
  };

  const onConfirm = async () => {
    markActivity();
    setStep("submitting");
    addUserMessage("✅ Confirm");
    const ok = await submitToSheet(enquiry);
    if (ok) {
      openWhatsAppWithEnquiry(enquiry);
      trackEvent("chatbot_enquiry_complete", { product: enquiry.product || "unknown" });
      addBotMessage(
        `✅ Thank you ${enquiry.name}!\nYour enquiry has been submitted.\nOur team will contact you within 2 hours.\n\nFor urgent enquiries:\n📞 +91 99401 19914`,
      );
      setStep("completed");
      return;
    }
    addBotMessage("We could not submit right now. Please tap Talk to Team or try Confirm again.");
    setStep("confirm");
  };

  const onEdit = () => {
    markActivity();
    addUserMessage("✏️ Edit");
    addBotMessage("No problem. Let's update your enquiry from the beginning. Please select your product:");
    setStep("product");
  };

  useEffect(() => {
    if (!open) return;
    if (messages.length > 0) return;
    void runWelcomeSequence();
  }, [open, messages.length]);

  const showFabHint = tooltipVisible && !open;

  return (
    <div className="fixed bottom-[90px] right-5 z-[94] flex flex-col items-end gap-2">
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
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
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

            <div
              ref={chatBodyRef}
              className="min-h-0 flex flex-col bg-white"
              style={{ overflowY: "auto", flex: 1 }}
            >
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
                        {message.text}
                      </div>
                    </motion.div>
                  ))}
                  {botTyping ? (
                    <motion.div
                      key="typing"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 6 }}
                      className="mb-2 flex justify-start"
                    >
                      <div className="rounded-2xl rounded-bl-sm border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-500">
                        Typing...
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              <div className="shrink-0 space-y-2 border-t border-zinc-200 bg-zinc-50 p-3">
              <button
                type="button"
                onClick={restartConversation}
                className="w-full text-center text-[11px] font-medium text-[#1a3a8f]/80 underline hover:text-[#1a3a8f]"
              >
                Restart conversation
              </button>
              {step === "welcomeMenu" ? (
                <div className="grid gap-2">
                  <button
                    type="button"
                    onClick={() => onSelectWelcomeAction("enquiry")}
                    className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-left text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                  >
                    1️⃣ Steel Enquiry
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectWelcomeAction("products")}
                    className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-left text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                  >
                    2️⃣ Product Information
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectWelcomeAction("contact")}
                    className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-left text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                  >
                    3️⃣ Contact Us
                  </button>
                </div>
              ) : null}

              {step === "infoProducts" ? (
                <button
                  type="button"
                  onClick={() => {
                    markActivity();
                    addUserMessage("Start Enquiry");
                    void addBotMessageWithTyping("Please select your product:", 300);
                    setStep("product");
                  }}
                  className="w-full rounded-lg bg-[#1a3a8f] px-3 py-2 text-sm font-semibold text-white"
                >
                  Start Enquiry
                </button>
              ) : null}

              {step === "infoContact" ? (
                <a
                  href={talkToTeamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-lg bg-[#25D366] px-3 py-2 text-center text-sm font-semibold text-white"
                >
                  Open WhatsApp
                </a>
              ) : null}

              {step === "product" ? (
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                  }}
                >
                  {PRODUCT_GRID.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => onSelectProduct(item)}
                      className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-left text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    >
                      {item.label}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => onSelectProduct({ id: "Colour Coated", label: "Colour Coated" })}
                    className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-center text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    style={{ gridColumn: "span 2" }}
                  >
                    Colour Coated
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectProduct({ id: "Others", label: "Others" })}
                    className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-center text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    style={{ gridColumn: "span 2" }}
                  >
                    Others
                  </button>
                  <a
                    href={talkToTeamUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="block rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-center text-sm font-semibold text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    style={{ gridColumn: "span 2" }}
                  >
                    Talk to Team
                  </a>
                </div>
              ) : null}

              {step === "othersDescribe" ? (
                <form onSubmit={onSubmitOthersDescription} className="space-y-2">
                  <textarea
                    required
                    rows={3}
                    value={othersDescriptionInput}
                    onChange={(e) => {
                      setOthersDescriptionInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="Describe the steel product you need…"
                    className="w-full resize-none rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="w-full rounded-lg bg-[#1a3a8f] px-3 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "sheetType" ? (
                <div className="grid grid-cols-2 gap-2">
                  {(["Sheet", "Coil"] as SheetType[]).map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => onSelectSheetType(item)}
                      className="rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              ) : null}

              {step === "brand" ? (
                <form onSubmit={onSubmitBrand} className="flex gap-2">
                  <input
                    required
                    value={brandInput}
                    onChange={(e) => {
                      setBrandInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="e.g. JSW, Tata, SAIL"
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "thickness" ? (
                <form onSubmit={onSubmitThickness} className="flex gap-2">
                  <input
                    required
                    type="number"
                    step="0.1"
                    value={thicknessInput}
                    onChange={(e) => {
                      setThicknessInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="e.g. 1.6"
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "dimensions" ? (
                <form onSubmit={onSubmitDimensions} className="grid grid-cols-2 gap-2">
                  <input
                    required
                    type="number"
                    value={widthInput}
                    onChange={(e) => {
                      setWidthInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="Width e.g. 1250"
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <input
                    required
                    type="number"
                    value={lengthInput}
                    onChange={(e) => {
                      setLengthInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="Length e.g. 2500"
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="col-span-2 rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "spec" ? (
                <form onSubmit={onSubmitSpec} className="flex gap-2">
                  <input
                    required
                    type={enquiry.product === "GP" ? "number" : "text"}
                    value={specInput}
                    onChange={(e) => {
                      setSpecInput(e.target.value);
                      markActivity();
                    }}
                    placeholder={getSpecPlaceholder(enquiry.product)}
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "quantity" ? (
                <form onSubmit={onSubmitQuantity} className="space-y-2">
                  <div className="grid grid-cols-2 gap-2">
                    {(["Tons", "Pieces"] as QuantityUnit[]).map((unit) => (
                      <button
                        key={unit}
                        type="button"
                        onClick={() => {
                          setEnquiry((prev) => ({ ...prev, quantityUnit: unit }));
                          markActivity();
                        }}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium ${
                          enquiry.quantityUnit === unit
                            ? "border-[#1a3a8f] bg-[#1a3a8f] text-white"
                            : "border-[#1a3a8f]/25 bg-white text-[#1a3a8f]"
                        }`}
                      >
                        {unit}
                      </button>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      required
                      type="number"
                      value={quantityInput}
                      onChange={(e) => {
                        setQuantityInput(e.target.value);
                        markActivity();
                      }}
                      placeholder={`Enter ${enquiry.quantityUnit.toLowerCase()}`}
                      className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                    />
                    <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                      Send
                    </button>
                  </div>
                </form>
              ) : null}

              {step === "name" ? (
                <form onSubmit={onSubmitName} className="flex gap-2">
                  <input
                    required
                    value={nameInput}
                    onChange={(e) => {
                      setNameInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="Your Name"
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "phone" ? (
                <form onSubmit={onSubmitPhone} className="flex gap-2">
                  <input
                    required
                    type="tel"
                    value={phoneInput}
                    onChange={(e) => {
                      setPhoneInput(e.target.value);
                      markActivity();
                    }}
                    placeholder="Your Phone Number"
                    className="flex-1 rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm focus:border-[#1a3a8f] focus:outline-none"
                  />
                  <button type="submit" className="rounded-lg bg-[#1a3a8f] px-4 py-2 text-sm font-semibold text-white">
                    Send
                  </button>
                </form>
              ) : null}

              {step === "confirm" ? (
                <div className="grid grid-cols-2 gap-2">
                  <button type="button" onClick={onConfirm} className="rounded-lg bg-[#1a3a8f] px-3 py-2 text-sm font-semibold text-white">
                    ✅ Confirm
                  </button>
                  <button
                    type="button"
                    onClick={onEdit}
                    className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm font-semibold text-zinc-700"
                  >
                    ✏️ Edit
                  </button>
                </div>
              ) : null}

              {step === "completed" ? (
                <button
                  type="button"
                  onClick={restartConversation}
                  className="w-full rounded-lg bg-[#1a3a8f] px-3 py-2 text-sm font-semibold text-white"
                >
                  Start New Enquiry
                </button>
              ) : null}

              {step === "submitting" ? (
                <div className="rounded-lg border border-zinc-200 bg-white px-3 py-2 text-center text-sm text-zinc-600">
                  Submitting your enquiry...
                </div>
              ) : null}

              {step !== "product" ? (
                <a
                  href={talkToTeamUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="block rounded-lg border border-[#1a3a8f]/25 bg-white px-3 py-2 text-center text-sm font-medium text-[#1a3a8f] hover:bg-[#1a3a8f]/5"
                >
                  Talk to Team
                </a>
              ) : null}
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="flex items-center gap-2">
        <AnimatePresence>
          {showFabHint ? (
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="steelbot-tooltip"
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
          ) : null}
        </AnimatePresence>
        {!open ? (
          <button
            type="button"
            title="Quick steel quote (HR, CR, GP, coils). This assistant is not WhatsApp."
            onClick={() => {
              markActivity();
              setOpen(true);
            }}
            aria-label="Open steel quote assistant"
            className="beat-glow-blue grid h-[70px] w-[70px] shrink-0 place-items-center rounded-full bg-transparent p-0 shadow-none"
          >
            <img
              src="/Chat_bot_icon_image.png"
              alt=""
              width={70}
              height={70}
              draggable={false}
              className="fab-glow-beat"
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "50%",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
          </button>
        ) : null}
      </div>
    </div>
  );
}
