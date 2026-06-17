"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const PHOTO = "/leadership/jagadesh-md.png";
const NAME = "Mr. P. A. Jagadesh";
const TITLE = "Director";
const BIO =
  "P. A. Jagadesh leads Sree Arumuga Steel Trading Private Limited as Director, steering the company through its most significant transformation yet — the transition from a proprietorship firm to a Private Limited Company in 2026. Building on a foundation laid in 1984, he has driven the expansion of operations, strengthened customer relationships, and introduced modern business practices to a four-decade legacy in the steel trading industry. Under his leadership, the company has cemented its position as an Exclusive Distributor of JSW Steel and one of South India's leading steel distributors, with an annual turnover exceeding Rs. 350 Crores. He combines deep industry knowledge with a forward-looking approach, ensuring the company stays true to its founding values of trust and reliability while scaling for the future.";

export function ManagingDirectorCard() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  return (
    <>
      {/* Same card styling as the placeholder cards; only adds click behavior. */}
      <motion.div
        role="button"
        tabIndex={0}
        aria-haspopup="dialog"
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="premium-card cursor-pointer rounded-3xl border border-zinc-200 p-6 transition hover:-translate-y-2 hover:shadow-xl"
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="relative h-36 overflow-hidden rounded-2xl">
          <Image src={PHOTO} alt={`${NAME} — ${TITLE}`} fill sizes="200px" className="object-cover object-top" />
        </div>
        <p className="mt-4 text-lg font-bold text-[var(--primary-blue)]">P.A. JAGADESH</p>
        <p className="text-sm text-zinc-500">Managing Director</p>
      </motion.div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[120] grid place-items-center bg-black/60 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={`${NAME}, ${TITLE}`}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 20, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 10, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-3xl bg-white shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 z-10 grid h-9 w-9 cursor-pointer place-items-center rounded-full bg-white/90 text-lg font-bold text-[var(--primary-blue)] shadow-md transition hover:bg-white"
              >
                ✕
              </button>

              <div className="grid md:grid-cols-[minmax(0,38%)_1fr]">
                <div className="relative h-72 w-full bg-[var(--primary-blue)] md:h-auto md:min-h-[460px]">
                  <Image
                    src={PHOTO}
                    alt={`${NAME} — ${TITLE}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="industrial-heading text-2xl font-black text-[var(--primary-blue)] md:text-3xl">{NAME}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[var(--primary-red)]">{TITLE}</p>
                  <div className="mt-4 h-1 w-16 rounded-full bg-[var(--primary-blue)]/30" />
                  <p className="mt-5 text-sm leading-relaxed text-zinc-600">{BIO}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
