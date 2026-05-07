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
        <h1 className="text-5xl font-black text-[var(--primary-blue)]">Careers at Sree Arumuga Steel</h1>
        <p className="mt-3 text-zinc-600">
          Join Tamil Nadu&apos;s leading steel trading company. Build your career with us.
        </p>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Sales Executive — Steel Products",
            meta: "Full Time | Location: Chennai",
            desc:
              "We are looking for an experienced sales executive to handle B2B steel product sales across Tamil Nadu. Must have knowledge of steel products and industrial customer handling.",
            req:
              "Requirements: 2+ years B2B sales experience, Steel/metals industry preferred, Tamil and English communication, Two-wheeler required for field visits",
          },
          {
            title: "Warehouse & Inventory Executive",
            meta: "Full Time | Location: Manali, Chennai",
            desc:
              "Manage steel inventory, loading/unloading operations and stock records at our Manali warehouse.",
            req:
              "Requirements: Experience in steel/metal warehouse, Basic computer knowledge, Physical fitness for warehouse operations",
          },
          {
            title: "Office Administrator",
            meta: "Full Time | Location: Manali, Chennai",
            desc:
              "Handle day-to-day office operations, customer calls, billing, and documentation for our steel trading operations.",
            req:
              "Requirements: Graduate with 1+ year office experience, MS Office and Tally knowledge, Good communication in Tamil and English",
          },
        ].map((job) => (
          <Reveal key={job.title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-[var(--primary-blue)]">Open Position</p>
            <h3 className="mt-2 text-xl font-bold text-[var(--primary-blue)]">{job.title}</h3>
            <p className="mt-2 text-sm text-zinc-600">{job.meta}</p>
            <p className="mt-3 text-sm text-zinc-600">{job.desc}</p>
            <p className="mt-3 text-sm text-zinc-600">{job.req}</p>
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
        <h2 className="text-3xl font-black text-[var(--primary-blue)]">How To Apply</h2>
        <p className="mt-3 text-sm text-zinc-600">
          Send your resume to sree.arumuga@gmail.com with the subject line: &apos;Application — [Position Name]&apos;.
          Or WhatsApp your resume to +91 99401 19914.
        </p>
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
