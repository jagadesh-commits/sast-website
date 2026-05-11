"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useState } from "react";

const PHONE = "919940119914";
const TEMPLATE_MESSAGE = "Hi! I'm interested in your steel products. Can you help me?";

export function WhatsAppWidget() {
  const [open, setOpen] = useState(false);
  const waUrl = useMemo(() => `https://wa.me/${PHONE}?text=${encodeURIComponent(TEMPLATE_MESSAGE)}`, []);

  return (
    <div className="whatsapp-fab-container fixed bottom-5 right-5 z-[95]">
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            className="mb-3 w-[320px] overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl"
          >
            <div className="bg-[#128C7E] px-4 py-3 text-white">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-white/90">
                  <Image src="/Logo.png" alt="Sree Arumuga" width={40} height={40} className="h-full w-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold">Sree Arumuga Steel Trading</p>
                  <p className="text-xs text-white/90">Typically replies within 1 hour</p>
                </div>
              </div>
            </div>
            <div className="bg-[#f0f7f4] p-4">
              <div className="rounded-xl bg-white p-3 text-sm text-zinc-700 shadow-sm">
                Hi! I&apos;m interested in your steel products. Can you help me?
              </div>
              <a
                href={waUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-[#25D366] px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Send on WhatsApp
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Open WhatsApp chat"
        className="whatsapp-button beat-glow-green grid h-[70px] w-[70px] place-items-center rounded-full bg-transparent p-0 shadow-none"
      >
        <img
          src="/whatsapp-icon.png"
          alt="WhatsApp steel enquiry +91 99401 19914"
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
    </div>
  );
}
