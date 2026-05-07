import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Sree Arumuga Steel Trading Pvt Ltd Chennai",
  description:
    "Trusted steel trading company since 1984. JSW exclusive distributor in Chennai specializing in HR, CR, GP sheets and coils for infrastructure and fabrication.",
  alternates: { canonical: "https://sast-website.vercel.app/about" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/about",
    title: "About Us | Sree Arumuga Steel Trading Pvt Ltd Chennai",
    description:
      "Trusted steel trading company since 1984. JSW exclusive distributor in Chennai specializing in HR, CR, GP sheets and coils for infrastructure and fabrication.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Sree Arumuga Steel Trading Pvt Ltd Chennai",
    description:
      "Trusted steel trading company since 1984. JSW exclusive distributor in Chennai specializing in HR, CR, GP sheets and coils for infrastructure and fabrication.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 text-white">
        <Image
          src="/warehouse_3.png"
          alt="Industrial warehouse facility"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--primary-blue)]/70" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-5xl font-black md:text-6xl">About Sree Arumuga Steel Trading</h1>
            <p className="mt-4 max-w-2xl text-white/80">
              Four decades of trust, quality and excellence in steel trading across Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Reveal className="border-l-4 border-[var(--primary-blue)] pl-6">
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Our Story</h2>
            <p className="mt-4 text-zinc-600">
              Founded in 1984 by our visionary promoter, Sree Arumuga Steel Traders started as a small steel trading
              firm in the Sathangadu Iron &amp; Steel Market, Manali, Chennai. Over four decades, we grew from a sole
              proprietorship into Sree Arumuga Steel Trading Private Limited — a trusted name in the Tamil Nadu steel
              industry.
            </p>
            <p className="mt-3 text-zinc-600">
              Today, as an exclusive JSW Steel distributor in Chennai, we supply HR sheets, HRPO sheets, CR sheets,
              GP sheets, GL sheets, EG sheets, PPGL sheets, MS plates and steel coils to hundreds of fabricators,
              contractors, manufacturers and industries across Tamil Nadu.
            </p>
            <p className="mt-3 text-zinc-600">
              Our strength lies in our people, our supplier relationships, and our unwavering commitment to delivering
              quality steel on time, every time.
            </p>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-3xl border border-zinc-200">
            <Image
              src="/office.png"
              alt="Sree Arumuga office"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-[#f9f9f9] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Why Choose Us</h2>
            <p className="mt-4 text-zinc-600">
              40+ years of experience, genuine JSW supply, and customer-first service — trusted by businesses across
              Tamil Nadu.
            </p>
            <div className="mt-6 grid gap-4">
              {[
                {
                  title: "40+ Years Experience",
                  desc: "Decades of expertise in steel trading gives us deep market knowledge and strong supplier relationships.",
                },
                {
                  title: "JSW Exclusive Distributor",
                  desc: "As an authorized JSW Steel distributor in Chennai, we guarantee genuine, certified quality products.",
                },
                {
                  title: "Wide Product Range",
                  desc: "HR, HRPO, CR, GP, GL, EG, PPGL sheets, MS plates and coils — all under one roof in Manali, Chennai.",
                },
                {
                  title: "Competitive Pricing",
                  desc: "Direct distributor pricing means you get the best market rates with complete transparency.",
                },
                {
                  title: "On-Time Delivery",
                  desc: "Reliable logistics network ensuring your steel reaches your site on schedule, every time.",
                },
                {
                  title: "Quality Assurance",
                  desc: "Every product comes with manufacturer certification and meets BIS/ISI standards for industrial use.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold text-[var(--primary-blue)]">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-3xl border border-zinc-200">
            <Image
              src="/workers.png"
              alt="Sree Arumuga operations team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Vision &amp; Mission</h2></Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[var(--primary-blue)]">Vision</p>
              <p className="mt-2 text-sm text-zinc-600">
                To be Tamil Nadu&apos;s most trusted and preferred steel trading partner, known for quality, reliability
                and customer-first service.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[var(--primary-blue)]">Mission</p>
              <p className="mt-2 text-sm text-zinc-600">
                To deliver premium JSW steel products with complete transparency, competitive pricing and on-time
                delivery — building long-term partnerships with every customer.
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            {["1984 - Foundation", "1998 - Product Expansion", "2012 - Large-Scale Supply", "2026 - Exclusive JSW Dealer"].map((milestone) => (
              <Reveal key={milestone}>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-3 rounded-full bg-[var(--primary-blue)]" />
                  <div className="h-1 flex-1 rounded-full bg-[var(--primary-blue)]/20" />
                  <p className="w-64 text-sm font-semibold text-zinc-700">{milestone}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Leadership</h2></Reveal>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {["Managing Director", "Operations Head", "Sales Director"].map((role) => (
            <Reveal key={role} className="premium-card rounded-3xl border border-zinc-200 p-6 transition hover:-translate-y-2 hover:shadow-xl">
              <div className="relative h-36 overflow-hidden rounded-2xl">
                <Image src="/warehouse_2.png" alt="" fill sizes="200px" className="object-cover" />
              </div>
              <p className="mt-4 text-lg font-bold text-[var(--primary-blue)]">{role}</p>
              <p className="text-sm text-zinc-500">Leadership profile coming soon.</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-[#f9f9f9] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Our Values</h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {["Integrity", "Reliability", "Quality", "Customer Focus"].map((value) => (
              <Reveal key={value} className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl text-[var(--primary-blue)]">◆</p>
                <p className="mt-3 font-semibold text-zinc-700">{value}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
