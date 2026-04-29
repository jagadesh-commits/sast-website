"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FormEvent, useEffect, useState } from "react";
import { buildWhatsAppQuoteUrl, submitEnquiryToSheet } from "@/lib/enquiry-api";

const KEY = "sas-exit-popup-shown";

export function ExitIntentPopup() {
  const [ready, setReady] = useState(false);
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!ready) return;
    if (sessionStorage.getItem(KEY) === "1") return;

    const onMove = (event: MouseEvent) => {
      if (event.clientY <= 10) {
        setShow(true);
        sessionStorage.setItem(KEY, "1");
      }
    };

    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [ready]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      email: "",
      message: "Exit intent popup lead",
      productInterest: "General",
      source: "exit-intent-popup",
    };
    const ok = await submitEnquiryToSheet(payload);
    setSubmitting(false);
    if (ok) {
      window.open(buildWhatsAppQuoteUrl(payload.name, payload.phone, payload.email, payload.message), "_blank", "noopener,noreferrer");
      setShow(false);
    }
  };

  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="fixed inset-0 z-[110] grid place-items-center bg-black/45 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 10, opacity: 0 }}
            className="w-full max-w-md rounded-3xl bg-[var(--primary-blue)] p-7 text-white shadow-2xl"
          >
            <h3 className="industrial-heading text-3xl font-black">Get a FREE Quote Before You Leave!</h3>
            <p className="mt-2 text-sm text-white/85">Our steel experts are ready to help.</p>
            <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
              <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 placeholder:text-white/70" />
              <input required value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 placeholder:text-white/70" />
              <button type="submit" disabled={submitting} className="mt-2 rounded-full bg-white px-5 py-3 font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--primary-red)] hover:text-white">
                {submitting ? "Submitting..." : "Get My Free Quote"}
              </button>
            </form>
            <button type="button" onClick={() => setShow(false)} className="mt-4 text-xs text-white/80 underline underline-offset-4">
              No thanks
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
