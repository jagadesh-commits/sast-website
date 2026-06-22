"use client";

import { Reveal } from "@/components/reveal";
import Image from "next/image";

const FOUNDER_QUOTE =
  "I started this business with nothing but a firm handshake and a promise to deliver. No shortcuts. No excuses. In 1984, when I set up shop at Sathangadu Market, steel trading in Chennai ran on trust — and I made it my life's work to never break that trust, not once, not with a single customer. Forty years later, that promise is still the foundation of everything we do. The machines have changed, the volumes have grown, the company has a new name — but the commitment is exactly the same. If we say it will be there, it will be there.";

export function FoundersMessage() {
  return (
    <section className="bg-[#0a1628] px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <div className="grid items-center gap-10 md:grid-cols-5 md:gap-12">
            <div className="relative mx-auto w-full max-w-sm md:col-span-2 md:mx-0 md:max-w-none">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-2 border-[var(--gold)]/60 shadow-[0_24px_60px_rgba(212,175,55,0.22)] md:-mr-8 md:translate-x-4 md:shadow-[0_32px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src="/leadership/arumugam-founder.png"
                  alt="Mr. P. G. Arumugam, Founder of Sree Arumuga Steel Trading"
                  fill
                  sizes="(max-width: 768px) 80vw, 40vw"
                  className="object-cover object-[center_35%]"
                />
              </div>
            </div>

            <div className="relative md:col-span-3 md:py-4">
              <span
                className="pointer-events-none absolute -left-2 -top-6 select-none font-serif text-[7rem] leading-none text-[var(--gold)]/25 md:-left-4 md:-top-10 md:text-[9rem]"
                aria-hidden
              >
                &ldquo;
              </span>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold)]">
                FROM THE FOUNDER
              </p>
              <h2 className="industrial-heading mt-3 text-3xl font-black leading-tight text-white md:text-4xl lg:text-[2.75rem]">
                Built on Trust. Delivered with Honour.
              </h2>

              <blockquote className="relative mt-8 text-lg leading-relaxed text-white/90 md:text-xl md:leading-[1.85]">
                {FOUNDER_QUOTE}
              </blockquote>

              <div className="mt-10 border-t border-white/10 pt-6">
                <p className="text-lg font-bold text-white">Mr. P. G. Arumugam</p>
                <p className="mt-1 text-sm text-white/60">
                  Founder, Sree Arumuga Steel Trading Private Limited
                </p>
                <p className="mt-2 text-sm italic text-[var(--gold)]">Est. 1984 — Chennai</p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
