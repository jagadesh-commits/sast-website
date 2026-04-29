import type { Metadata } from "next";
import { SteelCalculator } from "@/components/steel-calculator";

export const metadata: Metadata = {
  title: "Steel Weight Calculator",
  description: "Calculate steel sheet, plate, and coil weight with indicative pricing.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <SteelCalculator compact />
    </div>
  );
}
