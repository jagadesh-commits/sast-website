"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useState } from "react";
import { useChatbotOpen } from "@/components/chatbot-open-context";

const WA_SEND_URL =
  "https://wa.me/919940119914?text=Hi!%20I'm%20interested%20in%20purchasing%20steel%20products%20from%20Sree%20Arumuga%20Steel%20Trading.%20Please%20share%20your%20current%20price%20list%20for%20HR%2FCR%2FGP%20coils.%20Thank%20you.";

const BUBBLE_TEXT =
  "👋 Hi! I'm interested in purchasing steel products from Sree Arumuga Steel Trading. Please share your current price list for HR/CR/GP coils. Thank you.";

export function WhatsAppWidget() {
  const [whatsappOpen, setWhatsappOpen] = useState(false);
  const { chatbotOpen } = useChatbotOpen();

  const popupRight = chatbotOpen ? 420 : 24;

  const sendOnWhatsApp = useCallback(() => {
    window.open(WA_SEND_URL, "_blank", "noopener,noreferrer");
    setWhatsappOpen(false);
  }, []);

  return (
    <>
      <AnimatePresence>
        {whatsappOpen ? (
          <motion.div
            key="whatsapp-popup"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            style={{
              position: "fixed",
              bottom: 100,
              right: popupRight,
              width: 300,
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
              zIndex: 9997,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                background: "#25D366",
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <img
                  src="/Logo.png"
                  alt=""
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <div>
                  <p style={{ color: "white", fontWeight: 600, fontSize: 14, margin: 0 }}>
                    Sree Arumuga Steel Trading
                  </p>
                  <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 11, margin: 0 }}>
                    ● Typically replies within 1 hour
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setWhatsappOpen(false)}
                aria-label="Close WhatsApp preview"
                style={{
                  background: "white",
                  border: "none",
                  borderRadius: "50%",
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#25D366",
                  fontWeight: "bold",
                  fontSize: "18px",
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ background: "#ECE5DD", padding: 16, flex: 1 }}>
              <div
                style={{
                  background: "white",
                  borderRadius: "0px 12px 12px 12px",
                  padding: "12px 16px",
                  fontSize: 13,
                  color: "#111",
                  maxWidth: "85%",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                {BUBBLE_TEXT}
              </div>
            </div>

            <button
              type="button"
              onClick={sendOnWhatsApp}
              style={{
                background: "#25D366",
                color: "white",
                width: "100%",
                padding: 14,
                border: "none",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Send on WhatsApp
            </button>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="whatsapp-fab-container fixed bottom-6 right-6 z-[95]">
        <button
          type="button"
          onClick={() => setWhatsappOpen((v) => !v)}
          aria-expanded={whatsappOpen}
          aria-label={whatsappOpen ? "Close WhatsApp preview" : "Open WhatsApp preview"}
          className="whatsapp-button beat-glow-green grid h-16 w-16 place-items-center rounded-full bg-transparent p-0 shadow-none"
        >
          <img
            src="/whatsapp-icon.png"
            alt="WhatsApp steel enquiry +91 99401 19914"
            width={64}
            height={64}
            draggable={false}
            className="fab-glow-beat"
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block",
            }}
          />
        </button>
      </div>
    </>
  );
}
