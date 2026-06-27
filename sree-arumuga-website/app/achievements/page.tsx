import type { Metadata } from "next";
import { AwardsRecognition } from "@/components/awards-recognition";
import { CountUp } from "@/components/count-up";
import { MilestoneTimeline } from "@/components/milestone-timeline";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd | 40 Years Excellence Chennai",
  description:
    "40+ years of excellence in steel trading. JSW exclusive distributor awards and milestones. Trusted by 3000+ customers across Tamil Nadu since 1984.",
  keywords:
    "jsw steel dealer award, steel trading company achievements, sree arumuga steel trading, jsw distributor tamil nadu, steel supplier chennai 1984",
  alternates: { canonical: "https://sast-website.vercel.app/achievements" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/achievements",
    title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd | 40 Years Excellence Chennai",
    description:
      "40+ years of excellence in steel trading. JSW exclusive distributor awards and milestones. Trusted by 3000+ customers across Tamil Nadu since 1984.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd | 40 Years Excellence Chennai",
    description:
      "40+ years of excellence in steel trading. JSW exclusive distributor awards and milestones. Trusted by 3000+ customers across Tamil Nadu since 1984.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function AchievementsPage() {
  return (
    <div>
      <section className="relative flex h-[350px] items-center overflow-hidden px-6 text-white sm:h-[380px]">
        <Image
          src="/achievements-hero.png"
          alt="JSW Champions Night 2025 award ceremony — Sree Arumuga Steel Trading on stage"
          fill
          priority
          sizes="100vw"
          className="z-0 object-cover object-[center_20%]"
          aria-hidden
        />
        <div
          className="absolute inset-0 z-[1] bg-gradient-to-b from-black/50 via-black/40 to-black/20"
          aria-hidden="true"
        />
        <div className="relative z-10 mx-auto max-w-7xl">
          <Reveal noHide>
            <h1 className="text-3xl font-black leading-tight sm:text-4xl md:text-5xl lg:text-6xl">Our Achievements</h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/90 sm:mt-4 sm:text-base md:text-lg">
              Four decades of milestones, awards and recognition in the steel trading industry.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20" aria-label="Achievement statistics and milestones">
        <div className="grid gap-6 md:grid-cols-3" role="group" aria-label="Company achievement statistics">
          <CountUp end={40} label="Years in Business" />
          <CountUp end={3000} label="Happy Customers" />
          <CountUp end={500000} label="Tons Supplied" />
        </div>
        <AwardsRecognition />
        <Reveal className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <MilestoneTimeline />
        </Reveal>
      </section>
    </div>
  );
}
