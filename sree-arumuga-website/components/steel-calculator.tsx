"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { getPricePerTonForProduct } from "@/lib/steel-prices";
import { CALCULATOR_PRODUCTS, computeSteelWeight } from "@/lib/steel-weight";

type Props = {
  compact?: boolean;
};

export function SteelCalculator({ compact = false }: Props) {
  const [product, setProduct] = useState<string>(CALCULATOR_PRODUCTS[0].value);
  const [thickness, setThickness] = useState("1.2");
  const [length, setLength] = useState("2500");
  const [width, setWidth] = useState("1250");
  const [quantity, setQuantity] = useState("10");
  const [show, setShow] = useState(false);

  const result = useMemo(
    () =>
      computeSteelWeight({
        thicknessMm: Number(thickness),
        lengthMm: Number(length),
        widthMm: Number(width),
        quantity: Number(quantity),
      }),
    [thickness, length, width, quantity],
  );

  const estimate = useMemo(() => {
    if (!result) return null;
    const perTon = getPricePerTonForProduct(product);
    const base = result.totalWeightTons * perTon;
    return { min: base * 0.97, max: base * 1.03 };
  }, [result, product]);

  return (
    <section className={compact ? "" : "bg-white px-6 py-20"}>
      <div className={compact ? "" : "mx-auto max-w-6xl"}>
        <p className="industrial-heading text-sm font-semibold text-[var(--primary-blue)]">Steel Weight Calculator</p>
        <h2 className="industrial-heading mt-2 text-4xl font-black text-zinc-900 md:text-5xl">Estimate Weight & Price Instantly</h2>
        <div className="mt-8 rounded-3xl border border-[var(--primary-blue)]/20 bg-[var(--primary-blue)]/5 p-6 md:p-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <label className="text-sm font-medium text-zinc-700">
              Product Type
              <select value={product} onChange={(e) => setProduct(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--primary-blue)]/30 bg-white px-4 py-3">
                {CALCULATOR_PRODUCTS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            <CalcField label="Thickness (mm)" value={thickness} onChange={setThickness} />
            <CalcField label="Length (mm)" value={length} onChange={setLength} />
            <CalcField label="Width (mm)" value={width} onChange={setWidth} />
            <CalcField label="Quantity (pieces)" value={quantity} onChange={setQuantity} />
          </div>
          <button
            type="button"
            onClick={() => setShow(true)}
            className="mt-6 rounded-full bg-[var(--primary-blue)] px-7 py-3 font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
          >
            Calculate
          </button>
          <AnimatePresence>
            {show && result && estimate ? (
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="mt-6 grid gap-4 rounded-2xl bg-white p-5 md:grid-cols-3">
                <ResultCard title="Weight / piece" value={`${result.weightPerPieceKg.toFixed(2)} kg`} />
                <ResultCard title="Total weight" value={`${result.totalWeightKg.toFixed(2)} kg (${result.totalWeightTons.toFixed(3)} tons)`} />
                <ResultCard
                  title="Estimated price range"
                  value={`INR ${estimate.min.toLocaleString("en-IN", { maximumFractionDigits: 0 })} - INR ${estimate.max.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}`}
                />
              </motion.div>
            ) : null}
          </AnimatePresence>
          <p className="mt-4 text-sm text-zinc-600">Contact us for exact pricing.</p>
        </div>
      </div>
    </section>
  );
}

function CalcField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-medium text-zinc-700">
      {label}
      <input type="number" value={value} onChange={(e) => onChange(e.target.value)} className="mt-1 w-full rounded-xl border border-[var(--primary-blue)]/30 bg-white px-4 py-3" />
    </label>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <article className="rounded-xl border border-[var(--primary-blue)]/15 bg-[var(--primary-blue)]/5 p-4">
      <p className="text-xs uppercase tracking-wide text-zinc-500">{title}</p>
      <p className="mt-1 font-semibold text-zinc-900">{value}</p>
    </article>
  );
}
