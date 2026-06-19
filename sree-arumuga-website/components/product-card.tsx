"use client";

import { Reveal } from "@/components/reveal";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type VariantCopy = {
  description: string;
  applications: string;
};

export type ProductCardData = {
  title: string;
  brand: string;
  calc: string;
  sheet: VariantCopy;
  coil: VariantCopy;
  /** One-line tagline shown when simplified is true. */
  tagline?: string;
  /** When true, hide long description and applications (specs are in the infographic). */
  simplified?: boolean;
  /** Sheet/coil infographic images that switch with the toggle. */
  images?: { sheet: string; coil: string };
  /** Single infographic image (does not switch with toggle). */
  image?: string;
};

type Variant = "sheet" | "coil";

export function ProductCard({ product }: { product: ProductCardData }) {
  const [variant, setVariant] = useState<Variant>("sheet");
  const copy = variant === "sheet" ? product.sheet : product.coil;

  const imageSrc = product.images
    ? variant === "sheet"
      ? product.images.sheet
      : product.images.coil
    : product.image;

  return (
    <Reveal className="h-full">
      <article className="premium-card flex h-full flex-col rounded-3xl border border-zinc-200 p-6 transition duration-300 hover:-translate-y-2 hover:shadow-xl">
        {imageSrc ? (
          <div className="relative -mx-6 mb-4 w-[calc(100%+3rem)] overflow-hidden rounded-t-2xl">
            <Image
              src={imageSrc}
              alt={`${product.title} — ${product.images ? variant : "product"} infographic`}
              width={1024}
              height={682}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="h-auto w-full"
            />
          </div>
        ) : null}

        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--primary-blue)]">Product</p>
        <h3 className="mt-2 text-xl font-bold text-[var(--primary-blue)]">{product.title}</h3>

        {product.simplified && product.tagline ? (
          <p className="mt-3 text-sm text-zinc-700">{product.tagline}</p>
        ) : (
          <>
            <p className="mt-3 text-sm text-zinc-700">{copy.description}</p>
            <p className="mt-3 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-800">Applications:</span> {copy.applications}
            </p>
          </>
        )}

        <p className={`text-sm text-zinc-600 ${product.simplified ? "mt-3" : "mt-1"}`}>
          <span className="font-semibold text-zinc-800">Brand:</span> {product.brand}
        </p>

        <div className="mt-auto flex flex-col items-start gap-2 pt-5">
          <div className="flex flex-wrap gap-2">
            {(["sheet", "coil"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setVariant(v)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold capitalize transition ${
                  variant === v
                    ? "bg-[var(--primary-blue)] text-white"
                    : "border border-[var(--primary-blue)]/30 bg-white text-[var(--primary-blue)] hover:bg-[var(--primary-blue)]/5"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <button
            data-open-quote="true"
            className="rounded-full bg-[var(--primary-blue)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
          >
            Request Quote
          </button>
          <Link
            href={`/calculator?product=${encodeURIComponent(product.calc)}&type=${variant}`}
            className="rounded-full border border-[var(--primary-blue)] bg-white px-5 py-2 text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--primary-blue)]/5"
          >
            Calculate Weight &amp; Price
          </Link>
          <p className="text-xs text-zinc-400">* Prices may vary daily. Contact us for exact pricing.</p>
        </div>
      </article>
    </Reveal>
  );
}
