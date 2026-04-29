import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join Sree Arumuga Steel Trading Private Limited and build your career in industrial supply.",
};

export default function CareersPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <h1 className="text-5xl font-black text-[var(--primary-blue)]">Careers at Sree Arumuga</h1>
        <p className="mt-3 text-zinc-600">Join a trusted steel trading team committed to growth and excellence.</p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {["Sales Executive", "Logistics Coordinator", "Accounts Associate"].map((job) => (
          <Reveal key={job} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary-blue)]">Open Position</p>
            <h3 className="mt-2 text-xl font-bold text-[var(--primary-blue)]">{job}</h3>
            <p className="mt-3 text-sm text-zinc-600">Chennai | Full-time | Competitive salary</p>
            <button
              type="button"
              className="mt-5 rounded-full bg-[var(--primary-blue)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
            >
              Apply Now
            </button>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-12">
        <h2 className="text-3xl font-black text-[var(--primary-blue)]">Why Join Us</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-4">
          {["Career Growth", "Supportive Culture", "Industry Exposure", "Performance Rewards"].map((benefit) => (
            <div key={benefit} className="rounded-2xl border border-zinc-200 bg-white p-5 text-center shadow-sm">
              <p className="text-2xl text-[var(--primary-blue)]">◉</p>
              <p className="mt-2 text-sm font-semibold text-zinc-700">{benefit}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
