import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Sree Arumuga Steel Trading Private Limited and its legacy since 1984.",
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
            <h1 className="text-5xl font-black md:text-6xl">About Sree Arumuga Steel Trading Private Limited</h1>
            <p className="mt-4 max-w-2xl text-white/80">Trusted steel trading excellence from Tamil Nadu since 1984.</p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Reveal className="border-l-4 border-[var(--primary-blue)] pl-6">
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Company Story</h2>
            <p className="mt-4 text-zinc-600">
              Established in 1984, Sree Arumuga Steel Trading Private Limited has built enduring
              relationships through dependable quality and transparent business practices.
            </p>
            <p className="mt-3 text-zinc-600">
              As an exclusive JSW Steel distributor, we supply premium sheets, plates, and coils to
              construction, fabrication, and industrial clients across Tamil Nadu.
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
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Operations</h2>
            <p className="mt-4 text-zinc-600">
              Our day-to-day operations are powered by experienced teams who ensure safe handling,
              quality checks, and timely delivery for every order.
            </p>
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
          <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Timeline</h2></Reveal>
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
