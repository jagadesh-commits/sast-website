"use client";

import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { useMemo, useState } from "react";

const items = [
  {
    name: "HR Sheets (Hot Rolled)",
    category: "Sheets",
    thickness: "1.6mm - 12mm",
    useCase: "Fabrication, Construction",
  },
  {
    name: "HRPO Sheets (Hot Rolled Pickled & Oiled)",
    category: "Sheets",
    thickness: "1.6mm - 6mm",
    useCase: "Automobile, Engineering",
  },
  {
    name: "CR Sheets (Cold Rolled)",
    category: "Sheets",
    thickness: "0.5mm - 3mm",
    useCase: "Automotive, Appliances",
  },
  {
    name: "GP Sheets (Galvanized Plain)",
    category: "Sheets",
    thickness: "0.35mm - 2mm",
    useCase: "Roofing, Construction",
  },
  {
    name: "GL Sheets (Galvalume)",
    category: "Sheets",
    thickness: "0.35mm - 1.6mm",
    useCase: "Roofing, Cladding",
  },
  {
    name: "EG Sheets (Electro Galvanized)",
    category: "Sheets",
    thickness: "0.5mm - 2mm",
    useCase: "Automotive, Electronics",
  },
  {
    name: "PPGL Sheets (Pre Painted Galvalume)",
    category: "Sheets",
    thickness: "0.35mm - 1mm",
    useCase: "Roofing, Architecture",
  },
  {
    name: "MS Plates (Mild Steel)",
    category: "Plates",
    thickness: "6mm - 100mm",
    useCase: "Heavy fabrication, Shipbuilding",
  },
  {
    name: "HR Plates",
    category: "Plates",
    thickness: "5mm - 40mm",
    useCase: "Industrial, Construction",
  },
  {
    name: "HR Coils (Hot Rolled)",
    category: "Coils",
    thickness: "As per requirement",
    useCase: "Tube making, Fabrication",
  },
  {
    name: "CR Coils (Cold Rolled)",
    category: "Coils",
    thickness: "As per requirement",
    useCase: "Stamping, Automotive",
  },
  {
    name: "GP Coils (Galvanized)",
    category: "Coils",
    thickness: "As per requirement",
    useCase: "Roofing, Doors",
  },
];

const categoryImages: Record<string, string> = {
  Sheets: "/machine2.png",
  Plates: "/warehouse_2.png",
  Coils: "/warehouse_1.png",
};

export default function ProductsPage() {
  const [active, setActive] = useState("All");
  const filtered = useMemo(
    () => items.filter((item) => active === "All" || item.category === active),
    [active]
  );

  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 text-white">
        <Image
          src="/warehouse_3.png"
          alt="Products hero warehouse"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-5xl font-black">Our Steel Products</h1>
            <p className="mt-3 max-w-2xl text-zinc-200">Explore premium sheets, plates, and coils for industrial applications.</p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mt-8 flex flex-wrap gap-3">
            {["All", "Sheets", "Plates", "Coils"].map((tag) => (
              <button
                key={tag}
                onClick={() => setActive(tag)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  active === tag
                    ? "bg-[var(--primary-blue)] text-white shadow-lg shadow-[var(--primary-blue)]/30"
                    : "border border-zinc-300 bg-white text-zinc-700"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {filtered.map((item) => (
              <Reveal key={item.name}>
                <article className="premium-card rounded-3xl border border-zinc-200 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative h-40 overflow-hidden rounded-2xl">
                    <Image
                      src={categoryImages[item.category]}
                      alt={`${item.name} product`}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-[var(--primary-blue)]">{item.category}</p>
                  <h3 className="mt-1 text-xl font-bold text-[var(--primary-blue)]">{item.name}</h3>
                  <p className="mt-2 text-sm text-zinc-700">Thickness: {item.thickness}</p>
                  <p className="mt-1 text-sm text-zinc-600">Use: {item.useCase}</p>
                  <button
                    data-open-quote="true"
                    className="mt-5 rounded-full bg-[var(--primary-blue)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
                  >
                    Request Quote
                  </button>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
