"use client";

import { ProductCard, type ProductCardData } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import Image from "next/image";
import { useMemo, useState } from "react";

const PRODUCT_CARDS: ProductCardData[] = [
  {
    title: "HR Sheets & Coils (Hot Rolled)",
    brand: "JSW Steel",
    calc: "HR Sheets",
    simplified: true,
    tagline: "High strength hot rolled steel for fabrication and engineering.",
    images: { sheet: "/products/hr-sheet.png", coil: "/products/hr-coil.png" },
    sheet: {
      description:
        "Hot Rolled steel sheets and coils are the foundation of industrial manufacturing. Ideal for fabrication, automotive components, pipes, tubes, and general engineering applications. Available in thicknesses from 1.6mm to 16mm.",
      applications: "Fabrication, Automotive, Pipes & Tubes, General Engineering",
    },
    coil: {
      description:
        "Hot Rolled steel sheets and coils are the foundation of industrial manufacturing. Ideal for fabrication, automotive components, pipes, tubes, and general engineering applications. Available in thicknesses from 1.6mm to 16mm.",
      applications: "Fabrication, Automotive, Pipes & Tubes, General Engineering",
    },
  },
  {
    title: "HRPO Sheets & Coils (Hot Rolled Pickled & Oiled)",
    brand: "JSW Steel",
    calc: "HR Sheets",
    simplified: true,
    tagline: "Cleaner, scale-free hot rolled steel with superior surface finish.",
    images: { sheet: "/products/hrpo-sheet.png", coil: "/products/hrpo-coil.png" },
    sheet: {
      description:
        "HRPO sheets offer a cleaner, scale-free surface compared to standard HR. Perfect for applications requiring better surface finish before further processing. Available in thicknesses from 1.6mm to 6mm.",
      applications: "Automotive parts, White goods, Press components",
    },
    coil: {
      description:
        "HRPO sheets offer a cleaner, scale-free surface compared to standard HR. Perfect for applications requiring better surface finish before further processing. Available in thicknesses from 1.6mm to 6mm.",
      applications: "Automotive parts, White goods, Press components",
    },
  },
  {
    title: "CR Sheets & Coils (Cold Rolled)",
    brand: "JSW Steel",
    calc: "CR Sheets",
    simplified: true,
    tagline: "Superior surface finish and excellent formability for precision applications.",
    images: { sheet: "/products/cr-sheet.png", coil: "/products/cr-coil.png" },
    sheet: {
      description:
        "Cold Rolled steel offers superior surface finish, tighter thickness tolerances and excellent formability. Widely used in automotive, appliances, and precision engineering. Available from 0.4mm to 3.15mm.",
      applications: "Automotive, Home appliances, Precision components",
    },
    coil: {
      description:
        "Cold Rolled steel offers superior surface finish, tighter thickness tolerances and excellent formability. Widely used in automotive, appliances, and precision engineering. Available from 0.4mm to 3.15mm.",
      applications: "Automotive, Home appliances, Precision components",
    },
  },
  {
    title: "GP Sheets & Coils (Galvanized Plain)",
    brand: "JSW Steel",
    calc: "GP Sheets",
    simplified: true,
    tagline: "Hot-dip galvanized steel with excellent corrosion resistance.",
    images: { sheet: "/products/gp-sheet.png", coil: "/products/gp-coil.png" },
    sheet: {
      description:
        "Galvanized Plain sheets provide excellent corrosion resistance through hot-dip zinc coating. Ideal for roofing, cladding, ducts and agricultural equipment. Available from 0.14mm to 3.15mm.",
      applications: "Roofing, Cladding, Ducts, Agricultural equipment",
    },
    coil: {
      description:
        "Galvanized Plain sheets provide excellent corrosion resistance through hot-dip zinc coating. Ideal for roofing, cladding, ducts and agricultural equipment. Available from 0.14mm to 3.15mm.",
      applications: "Roofing, Cladding, Ducts, Agricultural equipment",
    },
  },
  {
    title: "GL Sheets & Coils (Galvalume)",
    brand: "JSW Steel",
    calc: "GL Sheets",
    sheet: {
      description:
        "Galvalume sheets combine zinc and aluminum coating for superior corrosion and heat resistance compared to standard GP. Perfect for industrial roofing and long-life structural applications.",
      applications: "Industrial roofing, Long-life structures, Pre-engineered buildings",
    },
    coil: {
      description:
        "Galvalume sheets combine zinc and aluminum coating for superior corrosion and heat resistance compared to standard GP. Perfect for industrial roofing and long-life structural applications.",
      applications: "Industrial roofing, Long-life structures, Pre-engineered buildings",
    },
  },
  {
    title: "EG Sheets & Coils (Electro Galvanized)",
    brand: "JSW Steel",
    calc: "EG Sheets",
    sheet: {
      description:
        "Electro Galvanized sheets offer a thin, uniform zinc coating applied through electroplating. Ideal for applications requiring excellent paintability and surface quality.",
      applications: "Automotive body panels, Appliances, Painted components",
    },
    coil: {
      description:
        "Electro Galvanized sheets offer a thin, uniform zinc coating applied through electroplating. Ideal for applications requiring excellent paintability and surface quality.",
      applications: "Automotive body panels, Appliances, Painted components",
    },
  },
  {
    title: "PPGL Sheets (Pre-Painted Galvalume)",
    brand: "JSW Colour ON+, JSW Radiance, Colourshine Spectrum, Colourshine Pratham",
    calc: "PPGL Sheets",
    image: "/products/ppgl-coil.png",
    sheet: {
      description:
        "Pre-Painted Galvalume sheets come with factory-applied paint coating over Galvalume base. Available in multiple colors. Perfect for roofing, wall cladding and architectural applications.",
      applications: "Roofing, Wall cladding, Architectural panels, Pre-engineered buildings",
    },
    coil: {
      description:
        "Pre-Painted Galvalume sheets come with factory-applied paint coating over Galvalume base. Available in multiple colors. Perfect for roofing, wall cladding and architectural applications.",
      applications: "Roofing, Wall cladding, Architectural panels, Pre-engineered buildings",
    },
  },
  {
    title: "MS Plates (Mild Steel)",
    brand: "JSW Steel / Jindal India",
    calc: "MS Plates",
    sheet: {
      description:
        "Mild Steel plates are essential for heavy structural and engineering applications. High tensile strength and weldability make them ideal for bridges, ships, pressure vessels and construction.",
      applications: "Bridges, Shipbuilding, Pressure vessels, Heavy construction",
    },
    coil: {
      description:
        "Mild Steel plates are essential for heavy structural and engineering applications. High tensile strength and weldability make them ideal for bridges, ships, pressure vessels and construction.",
      applications: "Bridges, Shipbuilding, Pressure vessels, Heavy construction",
    },
  },
];

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
            {PRODUCT_CARDS.map((product) => (
              <ProductCard key={product.title} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
