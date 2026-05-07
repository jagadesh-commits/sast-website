import type { Metadata } from "next";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd",
  description:
    "40+ years of excellence in steel trading. JSW exclusive distributor awards, milestones and achievements by Sree Arumuga Steel Trading Chennai.",
  alternates: { canonical: "https://sast-website.vercel.app/achievements" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/achievements",
    title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd",
    description:
      "40+ years of excellence in steel trading. JSW exclusive distributor awards, milestones and achievements by Sree Arumuga Steel Trading Chennai.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Achievements | Sree Arumuga Steel Trading Pvt Ltd",
    description:
      "40+ years of excellence in steel trading. JSW exclusive distributor awards, milestones and achievements by Sree Arumuga Steel Trading Chennai.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function AchievementsPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 text-white">
        <Image
          src="/warehouse_1.png"
          alt="Warehouse achievement background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--primary-blue)]/75" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-5xl font-black md:text-6xl">Our Achievements</h1>
            <p className="mt-3 text-white/80">
              Four decades of milestones, awards and recognition in the steel trading industry.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <CountUp end={40} label="Years in Business" />
          <CountUp end={500} label="Happy Customers" />
          <CountUp end={50000} label="Tons Supplied" />
        </div>
        <Reveal className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[var(--primary-blue)]">Milestone Timeline</h2>
          <div className="mt-6 space-y-4">
            {[
              "1984: Founded as Sree Arumuga Steel Traders — started operations in Sathangadu Iron & Steel Market, Manali, Chennai.",
              "1995: Expanded product range to include GP and CR sheets — serving 100+ customers across Chennai.",
              "2005: Became authorized JSW Steel distributor — a major milestone in our growth journey.",
              "2015: Crossed 10,000 tons annual supply milestone — serving industries across Tamil Nadu.",
              "2020: Recognized as Top Performing JSW Distributor in Tamil Nadu region.",
              "2023: Converted to Private Limited company — Sree Arumuga Steel Trading Private Limited incorporated.",
              "2024: Launched digital platform and expanded to serve 500+ customers across Tamil Nadu.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <span className="text-xl text-[var(--gold)]">🏆</span>
                <p className="text-sm text-zinc-700">{item}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </div>
  );
}
