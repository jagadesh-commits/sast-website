"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMemo, useState } from "react";
import { computeSteelWeight } from "@/lib/steel-weight";

const QUICK_PRODUCTS = [
  "HR Sheets",
  "HR Coils",
  "HRPO Sheets",
  "HRPO Coils",
  "CR Sheets",
  "CR Coils",
  "GP Sheets",
  "GP Coils",
  "GL Sheets",
  "GL Coils",
  "BGL Sheets",
  "BGL Coils",
  "PPGL Sheets",
  "MS Plates",
] as const;

const DEFAULT_LENGTH_MM = 2500;
const DEFAULT_WIDTH_MM = 1250;

const fieldClass =
  "mt-1 w-full cursor-pointer rounded-lg border border-white/20 bg-white/10 px-3 py-2.5 text-sm text-white placeholder:text-white/40 transition focus:border-[var(--gold)] focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50";

export function QuickCalculatorStrip() {
  const [product, setProduct] = useState<string>(QUICK_PRODUCTS[0]);
  const [thickness, setThickness] = useState("");
  const [quantity, setQuantity] = useState("");
  const [showResult, setShowResult] = useState(false);

  const totalWeightKg = useMemo(() => {
    const result = computeSteelWeight({
      thicknessMm: Number(thickness),
      lengthMm: DEFAULT_LENGTH_MM,
      widthMm: DEFAULT_WIDTH_MM,
      quantity: Number(quantity),
    });
    return result?.totalWeightKg ?? null;
  }, [thickness, quantity]);

  const handleCalculate = () => {
    if (totalWeightKg !== null) setShowResult(true);
    else setShowResult(false);
  };

  return (
    <section
      className="border-t-2 border-[var(--gold)] bg-[#0a1628] px-6 py-4 text-white md:py-5"
      aria-label="Quick weight estimator"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:gap-4">
          <p className="industrial-heading shrink-0 text-xs font-bold tracking-wide text-[var(--gold)] md:mb-2 md:max-w-[120px] md:self-center md:text-[11px] md:leading-tight">
            ⚡ Quick Weight Estimator
          </p>

          <label className="min-w-0 flex-1 text-xs font-medium text-white/80 md:max-w-[200px]">
            Product Type
            <select
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              className={fieldClass}
            >
              {QUICK_PRODUCTS.map((item) => (
                <option key={item} value={item} className="bg-[#0a1628] text-white">
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="min-w-0 flex-1 text-xs font-medium text-white/80 md:max-w-[140px]">
            Thickness (mm)
            <input
              type="number"
              min="0"
              step="any"
              value={thickness}
              onChange={(e) => {
                setThickness(e.target.value);
                setShowResult(false);
              }}
              placeholder="e.g. 1.2"
              className={fieldClass}
            />
          </label>

          <label className="min-w-0 flex-1 text-xs font-medium text-white/80 md:max-w-[140px]">
            Quantity (pieces)
            <input
              type="number"
              min="1"
              step="1"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setShowResult(false);
              }}
              placeholder="e.g. 10"
              className={fieldClass}
            />
          </label>

          <button
            type="button"
            onClick={handleCalculate}
            className="industrial-heading w-full shrink-0 cursor-pointer rounded-lg bg-[var(--gold)] px-6 py-2.5 text-sm font-bold text-[#0a1628] transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-white/50 active:brightness-95 md:w-auto md:min-w-[120px]"
          >
            Calculate
          </button>
        </div>

        <AnimatePresence>
          {showResult && totalWeightKg !== null ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="mt-4 border-t border-white/10 pt-4"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
                <p className="text-sm font-semibold text-white">
                  Estimated Weight:{" "}
                  <span className="text-[var(--gold)]">
                    {totalWeightKg.toLocaleString("en-IN", { maximumFractionDigits: 2 })} kg
                  </span>
                </p>
                <Link
                  href={`/calculator?product=${encodeURIComponent(product)}`}
                  className="cursor-pointer text-sm font-bold text-[var(--gold)] underline-offset-2 transition hover:underline focus:outline-none focus:ring-2 focus:ring-[var(--gold)]/50"
                >
                  Full Calculator →
                </Link>
              </div>
              <p className="mt-2 text-xs text-white/55">
                * Approximate estimate based on standard sheet size (2500×1250mm). For exact pricing contact us.
              </p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
}
