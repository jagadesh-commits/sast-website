"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  FaBuilding,
  FaGlobe,
  FaHandshake,
  FaImage,
  FaRocket,
  FaTrophy,
  FaTruck,
} from "react-icons/fa";
import { MdInventory2 } from "react-icons/md";

type Milestone = {
  year: string;
  title: string;
  description: string;
  icon: IconType;
  stat?: { value: string; label: string };
  showAwardPlaceholder?: boolean;
};

const MILESTONES: Milestone[] = [
  {
    year: "1984",
    title: "Founded",
    description:
      "Sree Arumuga Steel Traders was established in Sathangadu Iron & Steel Market, Manali, Chennai — beginning a legacy built on trust, reliable supply, and honest service.",
    icon: FaRocket,
  },
  {
    year: "1995",
    title: "Product Expansion",
    description:
      "Expanded our product range to include GP and CR sheets, strengthening relationships with fabricators and manufacturers across Chennai.",
    icon: MdInventory2,
    stat: { value: "100+", label: "Customers Served" },
  },
  {
    year: "2005",
    title: "JSW Authorized Distributor",
    description:
      "Became an authorized JSW Steel distributor — a defining partnership that elevated our product quality, brand credibility, and statewide reach.",
    icon: FaHandshake,
  },
  {
    year: "2015",
    title: "Supply Milestone",
    description:
      "Crossed a major annual supply threshold, delivering consistent bulk volumes to industries across Tamil Nadu with dependable logistics.",
    icon: FaTruck,
    stat: { value: "10,000+", label: "Tons Annual Supply" },
  },
  {
    year: "2020",
    title: "Top Performer Award",
    description:
      "Recognized as the Top Performing JSW Distributor in Tamil Nadu — honoring excellence in sales volume, customer retention, and service standards.",
    icon: FaTrophy,
    showAwardPlaceholder: true,
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description:
      "Launched our digital platform with online quoting and enquiry tools, expanding service to customers across Tamil Nadu with faster response times.",
    icon: FaGlobe,
    stat: { value: "3,000+", label: "Customers" },
  },
  {
    year: "2026",
    title: "Private Limited Company",
    description:
      "Converted to Sree Arumuga Steel Trading Private Limited — formalizing four decades of growth and preparing the business for its next chapter under modern corporate governance.",
    icon: FaBuilding,
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: Milestone;
  index: number;
}) {
  const Icon = milestone.icon;

  return (
    <motion.article
      className="group relative z-10 flex h-full flex-col rounded-2xl border border-[var(--primary-blue)]/15 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:pl-6"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: "easeOut" }}
    >
      {/* Connection node — mobile left rail */}
      <span
        className="absolute -left-[calc(1.25rem+5px)] top-10 z-20 h-3 w-3 rounded-full border-2 border-white bg-[var(--gold)] shadow-sm md:hidden"
        aria-hidden
      />
      {/* Connection node — desktop top center */}
      <span
        className="absolute -top-[calc(0.75rem+1px)] left-1/2 z-20 hidden h-3 w-3 -translate-x-1/2 rounded-full border-2 border-white bg-[var(--gold)] shadow-sm lg:block"
        aria-hidden
      />

      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[var(--primary-blue)]/10 text-[var(--primary-blue)] transition-colors group-hover:bg-[var(--primary-blue)] group-hover:text-white"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="m-0">
            <span className="block text-xs font-bold uppercase tracking-[0.2em] text-[var(--gold)]">
              {milestone.year}
            </span>
            <span className="mt-1 block text-lg font-black text-[var(--primary-blue)]">
              {milestone.title}
            </span>
          </h3>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600">
        {milestone.description}
      </p>

      {milestone.stat && (
        <div className="mt-5 border-t border-[var(--primary-blue)]/10 pt-4">
          <p className="text-2xl font-black text-[var(--primary-blue)]">
            {milestone.stat.value}
          </p>
          <p className="mt-0.5 text-xs font-semibold uppercase tracking-wider text-zinc-500">
            {milestone.stat.label}
          </p>
        </div>
      )}

      {milestone.showAwardPlaceholder && (
        <div
          className="mt-5 flex aspect-[4/3] flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[var(--gold)]/50 bg-[var(--primary-blue)]/[0.03]"
          role="img"
          aria-label="JSW Top Performing Distributor Tamil Nadu 2020 award certificate"
        >
          <FaImage className="h-8 w-8 text-[var(--gold)]/60" aria-hidden />
          <span className="text-xs font-medium text-zinc-400" aria-hidden="true">
            Certificate photo coming soon
          </span>
        </div>
      )}
    </motion.article>
  );
}

export function MilestoneTimeline() {
  return (
    <section aria-label="Company Milestones">
      <h2 className="text-3xl font-black text-[var(--primary-blue)]">
        Milestone Timeline
      </h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-600">
        Four decades of growth — from a single-market trader to Tamil Nadu&apos;s
        trusted JSW steel partner.
      </p>

      <div className="relative mt-10">
        {/* Mobile: vertical connector */}
        <div
          className="absolute bottom-4 left-[7px] top-4 w-0.5 bg-gradient-to-b from-[var(--primary-blue)]/20 via-[var(--gold)] to-[var(--primary-blue)]/20 md:hidden"
          aria-hidden
        />

        {/* Tablet: 2-column serpentine connector */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full md:block lg:hidden"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 25 8 L 75 8 L 75 22 L 25 22 L 25 36 L 75 36 L 75 50 L 25 50 L 25 64"
            fill="none"
            stroke="url(#timeline-gradient-md)"
            strokeWidth="0.35"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="timeline-gradient-md" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1a3a8f" stopOpacity="0.25" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#1a3a8f" stopOpacity="0.25" />
            </linearGradient>
          </defs>
        </svg>

        {/* Desktop: 3-column serpentine connector */}
        <svg
          className="pointer-events-none absolute inset-0 z-0 hidden h-full w-full lg:block"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M 17 10 L 50 10 L 83 10 L 83 24 L 17 24 L 17 38 L 50 38 L 83 38 L 83 52 L 17 52 L 17 66"
            fill="none"
            stroke="url(#timeline-gradient-lg)"
            strokeWidth="0.3"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
          <defs>
            <linearGradient id="timeline-gradient-lg" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1a3a8f" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#d4af37" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#1a3a8f" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>

        <ol className="relative z-10 m-0 grid list-none grid-cols-1 gap-8 p-0 pl-8 md:grid-cols-2 md:pl-0 lg:grid-cols-3">
          {MILESTONES.map((milestone, index) => (
            <li key={milestone.year}>
              <MilestoneCard milestone={milestone} index={index} />
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
