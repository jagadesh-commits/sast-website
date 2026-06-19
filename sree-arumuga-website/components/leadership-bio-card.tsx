"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type LeadershipBioCardProps = {
  /** Image path under /public, e.g. "/leadership/jagadesh-md.png" */
  photo: string;
  /** Name shown on the grid card */
  cardName: string;
  /** Title shown on the grid card */
  cardTitle: string;
  /** Name shown in the modal heading */
  modalName: string;
  /** Title shown in the modal */
  modalTitle: string;
  /** Bio paragraph shown in the modal */
  bio: string;
  /** Optional object-position utility for the grid card thumbnail (defaults to "object-top"). */
  cardImagePosition?: string;
};

export function LeadershipBioCard({
  photo,
  cardName,
  cardTitle,
  modalName,
  modalTitle,
  bio,
  cardImagePosition = "object-top",
}: LeadershipBioCardProps) {
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
          <Image src={photo} alt={`${modalName} — ${modalTitle}`} fill sizes="200px" className={`object-cover ${cardImagePosition}`} />
        </div>
        <p className="mt-4 text-lg font-bold text-[var(--primary-blue)]">{cardName}</p>
        <p className="text-sm text-zinc-500">{cardTitle}</p>
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
              aria-label={`${modalName}, ${modalTitle}`}
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
                    src={photo}
                    alt={`${modalName} — ${modalTitle}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className="object-cover object-top"
                  />
                </div>

                <div className="p-6 md:p-8">
                  <h3 className="industrial-heading text-2xl font-black text-[var(--primary-blue)] md:text-3xl">{modalName}</h3>
                  <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-[var(--primary-red)]">{modalTitle}</p>
                  <div className="mt-4 h-1 w-16 rounded-full bg-[var(--primary-blue)]/30" />
                  <p className="mt-5 text-sm leading-relaxed text-zinc-600">{bio}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
