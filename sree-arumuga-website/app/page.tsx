import type { Metadata } from "next";
import { CountUp } from "@/components/count-up";
import { Reveal } from "@/components/reveal";
import { HeroGsap } from "@/components/hero-gsap";
import { SteelCalculator } from "@/components/steel-calculator";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  alternates: { canonical: "https://sast-website.vercel.app/" },
};

export default function Home() {
  return (
    <div>
      <section
        className="relative min-h-screen overflow-hidden px-6"
      >
        <Image
          src="/website_phot_1.png"
          alt="Industrial steel warehouse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 z-[1] bg-black/[0.55]" />
        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl items-center">
          <Reveal noHide>
            <HeroGsap>
              <p data-hero-anim className="industrial-heading text-sm font-semibold tracking-[0.25em] text-white/90">
                Trusted Since 1984
              </p>
              <h1 data-hero-anim className="industrial-heading mt-4 text-6xl font-black leading-[0.9] text-white md:text-8xl">
                STEEL THAT BUILDS INDIA
              </h1>
              <div data-hero-anim className="mt-5 h-1.5 w-44 rounded-full bg-[var(--primary-blue)]" />
              <p data-hero-anim className="mt-6 max-w-2xl text-lg text-zinc-300">
                Trusted steel trading solutions since 1984. Premium sheets, plates and coils for
                infrastructure, fabrication and industrial growth.
              </p>
              <div data-hero-anim className="mt-10 flex flex-wrap gap-4">
                <button
                  data-open-quote="true"
                  className="industrial-heading rounded-full bg-[var(--primary-blue)] px-8 py-3.5 text-base font-semibold text-white shadow-[0_16px_30px_rgba(26,58,143,0.35)] transition hover:-translate-y-0.5 hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
                >
                  Get Quote
                </button>
                <Link
                  href="/products"
                  className="industrial-heading rounded-full border-2 border-white px-8 py-3.5 text-base font-semibold text-white transition hover:bg-white hover:text-zinc-900"
                >
                  Our Products
                </Link>
              </div>
              <div data-hero-anim className="mt-8 inline-flex items-center rounded-full border border-[var(--gold)] bg-black/30 px-6 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(212,175,55,0.35)]">
                JSW Exclusive Distributor
              </div>
            </HeroGsap>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-[var(--primary-blue)] py-3">
        <div className="ticker-track flex w-max gap-10 whitespace-nowrap px-6 text-sm font-semibold text-white">
          {[
            ["HR Coil", "INR 60,000 / ton"],
            ["MS Plate", "INR 62,000 / ton"],
            ["HRPO", "INR 65,000 / ton"],
            ["CR Coil", "INR 69,000 / ton"],
            ["GP Coil", "INR 83,000 / ton"],
            ["GL Coil", "INR 86,000 / ton"],
            ["PPGL", "INR 89,000 / ton"],
            ["EG Coil", "INR 86,000 / ton"],
            ["HR Coil", "INR 60,000 / ton"],
            ["MS Plate", "INR 62,000 / ton"],
            ["HRPO", "INR 65,000 / ton"],
            ["CR Coil", "INR 69,000 / ton"],
            ["GP Coil", "INR 83,000 / ton"],
            ["GL Coil", "INR 86,000 / ton"],
            ["PPGL", "INR 89,000 / ton"],
            ["EG Coil", "INR 86,000 / ton"],
          ].map(([name, price], index) => (
            <span key={`${name}-${index}`}>
              <span className="mr-2 font-semibold text-white">{name}</span>
              <span className="font-mono text-sky-100">{price}</span>
            </span>
          ))}
        </div>
      </section>
      <p className="px-6 py-2 text-xs text-zinc-500">
        * Prices are indicative and subject to change. Contact us for current pricing.
      </p>

      <section className="grid md:grid-cols-2">
        <div className="bg-white px-6 py-20">
          <div className="mx-auto max-w-xl">
            <p className="industrial-heading text-sm font-semibold text-[var(--primary-blue)]">About Us</p>
            <h2 className="industrial-heading mt-3 text-5xl font-black text-zinc-900">Trusted Steel Partner Since 1984</h2>
            <p className="mt-5 text-zinc-600">
              Sree Arumuga Steel Trading Private Limited serves Tamil Nadu with dependable quality,
              transparent pricing, and reliable industrial steel supply.
            </p>
            <div className="mt-8 space-y-4">
              {[
                { label: "Client Satisfaction", value: "95%" },
                { label: "On-Time Delivery", value: "90%" },
                { label: "Product Quality", value: "98%" },
              ].map((item) => (
                <div key={item.label}>
                  <div className="mb-1 flex justify-between text-sm font-semibold text-zinc-700">
                    <span>{item.label}</span>
                    <span>{item.value}</span>
                  </div>
                  <div className="h-2 rounded-full bg-zinc-200">
                    <div className="h-full rounded-full bg-[var(--primary-blue)]" style={{ width: item.value }} />
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/about"
              className="industrial-heading mt-8 inline-block rounded-full border-2 border-[var(--primary-blue)] px-6 py-3 text-sm font-bold text-[var(--primary-blue)] transition hover:bg-[var(--primary-blue)]/5"
            >
              Read More
            </Link>
          </div>
        </div>
        <div className="relative min-h-[460px]">
          <Image
            src="/workers.png"
            alt="Sree Arumuga workers"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </section>

      <section className="bg-[var(--primary-blue)] px-6 py-16 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {[
            { name: "Steel Sheets", text: "High precision sheets for fabrication and industrial use." },
            { name: "Steel Plates", text: "Reliable heavy-duty plates for core infrastructure projects." },
            { name: "Steel Coils", text: "Premium coils with consistent quality and controlled finish." },
          ].map((item) => (
            <article key={item.name} className="rounded-2xl border border-white/20 bg-white/5 p-7 transition hover:bg-white/10">
              <p className="text-4xl">▣</p>
              <h3 className="industrial-heading mt-4 text-3xl font-bold">{item.name}</h3>
              <p className="mt-3 text-white/80">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--primary-blue)] px-6 py-20 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-[var(--gold)]" />
            <CountUp end={40} label="Years" dark suffix="+" className="text-center" />
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-[var(--primary-blue)] ring-1 ring-white/40" />
            <CountUp end={5000} label="Customers" dark suffix="+" className="text-center" />
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-[var(--gold)]" />
            <CountUp end={500000} label="Tons" dark suffix="+" className="text-center" />
          </div>
          <div className="text-center">
            <div className="mx-auto mb-2 h-1 w-20 rounded-full bg-[var(--primary-blue)] ring-1 ring-white/40" />
            <CountUp end={100} label="Quality" dark suffix="%" className="text-center" />
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <p className="industrial-heading text-sm font-semibold text-zinc-500">Industrial News</p>
          <h2 className="industrial-heading mt-2 text-5xl font-black text-zinc-900">Blog Posts</h2>
          <div className="mt-8 overflow-hidden rounded-3xl bg-[#1d1f24] text-white">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="text-xs uppercase tracking-widest text-zinc-400">April 10, 2026 | Industry News | Market Desk</p>
                <h3 className="industrial-heading mt-4 text-4xl font-black">Steel Price Trends in India 2024</h3>
                <p className="mt-4 text-zinc-300">
                  Market movement analysis, demand signals, and procurement guidance for industrial buyers.
                </p>
                <Link
                  href="/blog/steel-price-trends-india-2024"
                  className="industrial-heading mt-7 inline-block rounded-full border border-sky-300/60 px-6 py-2 text-sm font-bold text-sky-200 transition hover:border-sky-100 hover:bg-white/10 hover:text-white"
                >
                  Read More
                </Link>
              </div>
              <div className="relative min-h-[260px]">
                <Image
                  src="/macchine_warehouse1.png"
                  alt="Industrial steel feature"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsCarousel />

      <SteelCalculator />

      <section className="bg-[var(--primary-blue)] px-6 py-14 text-white">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/20 bg-white/10 p-7 md:flex md:items-center md:justify-between">
          <div>
            <p className="industrial-heading text-sm tracking-wide text-white/80">Need Exact Loading Estimation?</p>
            <h3 className="industrial-heading mt-2 text-3xl font-black">Use Full Calculator Page</h3>
          </div>
          <Link
            href="/calculator"
            className="industrial-heading mt-4 inline-block rounded-full bg-white px-6 py-3 text-sm font-bold text-[var(--primary-blue)] transition hover:bg-[var(--primary-red)] hover:text-white md:mt-0"
          >
            Open Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
