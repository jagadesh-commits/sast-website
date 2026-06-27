"use client";

import { Reveal } from "@/components/reveal";
import Image from "next/image";

const AWARDS = [
  {
    image: "/awards/jsw-pragati-champion-trophy-2025.png",
    imageAlt: "JSW Pragati+ Champion Tamil Nadu 2025 trophy and letter of appreciation",
    title: "JSW Pragati+ Champion — Tamil Nadu",
    year: "2025",
    description:
      "Presented at JSW Champions Night 2025, Grand Hyatt Bolgatty, Kochi — recognizing outstanding performance in JSW Pragati+ coated steel products across Tamil Nadu. Accompanied by a letter of appreciation from Ashwani Sharma, Business Head, JSW Steel Coated Products Limited.",
  },
  {
    image: "/awards/jsw-pragati-champion-plaque-2024.png",
    imageAlt: "JSW Pragati+ Champion Tamil Nadu 2024 award plaque",
    title: "JSW Pragati+ Champion — Tamil Nadu",
    year: "2024",
    description:
      "Presented at The Leela Palace, Chennai on 16th July 2024 — honoring excellence in JSW Pragati+ coated steel distribution across Tamil Nadu.",
  },
  {
    image: "/awards/jsw-gp-champion-plaque-2024.png",
    imageAlt: "JSW GP Champion Chennai Tamil Nadu 2024 award plaque",
    title: "JSW GP Champion — Chennai, Tamil Nadu",
    year: "2024",
    description:
      "Presented at The Leela Palace, Chennai on 16th July 2024 — recognizing top performance in JSW GP (Galvanized Plain) steel product distribution in Chennai and Tamil Nadu.",
  },
] as const;

export function AwardsRecognition() {
  return (
    <section className="mt-16" aria-labelledby="awards-recognition-heading">
      <Reveal>
        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[var(--gold)]">Awards &amp; Recognition</p>
        <h2 id="awards-recognition-heading" className="mt-2 text-3xl font-black text-[var(--primary-blue)] md:text-4xl">
          Recognised by JSW Steel
        </h2>
        <p className="mt-3 max-w-3xl text-zinc-600">
          Multiple awards received from JSW Steel for outstanding performance, sales excellence, and distributor
          reliability across Tamil Nadu.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-3">
        {AWARDS.map((award, index) => (
          <Reveal key={award.image} delay={index * 0.12}>
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-100 bg-white shadow-md transition-shadow hover:shadow-lg">
              <div className="relative h-[280px] w-full bg-zinc-50">
                <Image
                  src={award.image}
                  alt={award.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-3"
                />
                <span className="absolute right-3 top-3 rounded-full bg-[var(--gold)] px-3 py-1 text-xs font-bold text-zinc-900 shadow-sm">
                  {award.year}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-black leading-snug text-[var(--primary-blue)]">{award.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-500">{award.description}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
