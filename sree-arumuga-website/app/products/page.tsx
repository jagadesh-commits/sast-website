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

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "JSW Steel Sheets Plates and Coils",
    brand: { "@type": "Brand", name: "JSW Steel" },
    seller: {
      "@type": "Organization",
      name: "Sree Arumuga Steel Trading Private Limited",
    },
    category: "HR, HRPO, CR, GP, GL, EG, PPGL Steel Sheets and Coils",
    url: "https://sast-website.vercel.app/products",
  };

  return (
    <div>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
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
            <p className="mt-3 max-w-2xl text-zinc-200">
              Premium JSW steel sheets, plates and coils for every industrial need. Trusted by 500+ businesses across
              Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {[
              {
                title: "HR Sheets & Coils (Hot Rolled)",
                desc:
                  "Hot Rolled steel sheets and coils are the foundation of industrial manufacturing. Ideal for fabrication, automotive components, pipes, tubes, and general engineering applications. Available in thicknesses from 1.6mm to 16mm.",
                apps: "Fabrication, Automotive, Pipes & Tubes, General Engineering",
                brand: "JSW Steel",
              },
              {
                title: "HRPO Sheets & Coils (Hot Rolled Pickled & Oiled)",
                desc:
                  "HRPO sheets offer a cleaner, scale-free surface compared to standard HR. Perfect for applications requiring better surface finish before further processing. Available in thicknesses from 1.6mm to 6mm.",
                apps: "Automotive parts, White goods, Press components",
                brand: "JSW Steel",
              },
              {
                title: "CR Sheets & Coils (Cold Rolled)",
                desc:
                  "Cold Rolled steel offers superior surface finish, tighter thickness tolerances and excellent formability. Widely used in automotive, appliances, and precision engineering. Available from 0.4mm to 3.15mm.",
                apps: "Automotive, Home appliances, Precision components",
                brand: "JSW Steel",
              },
              {
                title: "GP Sheets & Coils (Galvanized Plain)",
                desc:
                  "Galvanized Plain sheets provide excellent corrosion resistance through hot-dip zinc coating. Ideal for roofing, cladding, ducts and agricultural equipment. Available from 0.14mm to 3.15mm.",
                apps: "Roofing, Cladding, Ducts, Agricultural equipment",
                brand: "JSW Steel",
              },
              {
                title: "GL Sheets & Coils (Galvalume)",
                desc:
                  "Galvalume sheets combine zinc and aluminum coating for superior corrosion and heat resistance compared to standard GP. Perfect for industrial roofing and long-life structural applications.",
                apps: "Industrial roofing, Long-life structures, Pre-engineered buildings",
                brand: "JSW Steel",
              },
              {
                title: "EG Sheets & Coils (Electro Galvanized)",
                desc:
                  "Electro Galvanized sheets offer a thin, uniform zinc coating applied through electroplating. Ideal for applications requiring excellent paintability and surface quality.",
                apps: "Automotive body panels, Appliances, Painted components",
                brand: "JSW Steel",
              },
              {
                title: "PPGL Sheets (Pre-Painted Galvalume)",
                desc:
                  "Pre-Painted Galvalume sheets come with factory-applied paint coating over Galvalume base. Available in multiple colors. Perfect for roofing, wall cladding and architectural applications.",
                apps: "Roofing, Wall cladding, Architectural panels, Pre-engineered buildings",
                brand: "JSW Colour ON+, JSW Radiance, Colourshine Spectrum, Colourshine Pratham",
              },
              {
                title: "MS Plates (Mild Steel)",
                desc:
                  "Mild Steel plates are essential for heavy structural and engineering applications. High tensile strength and weldability make them ideal for bridges, ships, pressure vessels and construction.",
                apps: "Bridges, Shipbuilding, Pressure vessels, Heavy construction",
                brand: "JSW Steel / Jindal India",
              },
            ].map((p) => (
              <Reveal key={p.title}>
                <article className="premium-card rounded-3xl border border-zinc-200 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-blue)]">Product</p>
                  <h3 className="mt-2 text-xl font-bold text-[var(--primary-blue)]">{p.title}</h3>
                  <p className="mt-3 text-sm text-zinc-700">{p.desc}</p>
                  <p className="mt-3 text-sm text-zinc-600">
                    <span className="font-semibold text-zinc-800">Applications:</span> {p.apps}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600">
                    <span className="font-semibold text-zinc-800">Brand:</span> {p.brand}
                  </p>
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
