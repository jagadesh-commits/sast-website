import type { Metadata } from "next";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Milestones and industrial achievements of Sree Arumuga Steel Trading Private Limited.",
  alternates: { canonical: "https://sast-website.vercel.app/achievements" },
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
            <h1 className="text-5xl font-black md:text-6xl">Achievements</h1>
            <p className="mt-3 text-white/80">Milestones that reflect our consistency and customer trust.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          <CountUp end={40} label="Years in Business" />
          <CountUp end={250} label="Projects Supplied" />
          <CountUp end={5000} label="Repeat Customers" />
        </div>
        <Reveal className="mt-10 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-3xl font-black text-[var(--primary-blue)]">Milestone Timeline</h2>
          <div className="mt-6 space-y-4">
            {[
              "1984 - Company established in Chennai steel market",
              "2005 - Expanded statewide supply capabilities",
              "2018 - Delivered high-volume industrial contracts",
              "2026 - Recognized as JSW Exclusive Distributor",
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
