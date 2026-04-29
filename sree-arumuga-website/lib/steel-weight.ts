/** Mild steel density kg/m³ */
const DENSITY_KG_M3 = 7850;

export const CALCULATOR_PRODUCTS = [
  { value: "HR Sheets", label: "HR Sheets" },
  { value: "CR Sheets", label: "CR Sheets" },
  { value: "GP Sheets", label: "GP Sheets" },
  { value: "GL Sheets", label: "GL Sheets" },
  { value: "EG Sheets", label: "EG Sheets" },
  { value: "PPGL Sheets", label: "PPGL Sheets" },
  { value: "MS Plates", label: "MS Plates" },
  { value: "Coils (General)", label: "Coils (General)" },
] as const;

export type CalculatorProduct = (typeof CALCULATOR_PRODUCTS)[number]["value"];

export type SteelWeightInputs = {
  thicknessMm: number;
  lengthMm: number;
  widthMm: number;
  quantity: number;
};

export type SteelWeightResult = {
  volumeM3: number;
  weightPerPieceKg: number;
  totalWeightKg: number;
  totalWeightTons: number;
};

export function computeSteelWeight(inputs: SteelWeightInputs): SteelWeightResult | null {
  const { thicknessMm, lengthMm, widthMm, quantity } = inputs;
  if (
    !Number.isFinite(thicknessMm) ||
    !Number.isFinite(lengthMm) ||
    !Number.isFinite(widthMm) ||
    !Number.isFinite(quantity) ||
    thicknessMm <= 0 ||
    lengthMm <= 0 ||
    widthMm <= 0 ||
    quantity <= 0
  ) {
    return null;
  }
  const volumeM3 = (thicknessMm / 1000) * (lengthMm / 1000) * (widthMm / 1000);
  const weightPerPieceKg = volumeM3 * DENSITY_KG_M3;
  const totalWeightKg = weightPerPieceKg * quantity;
  const totalWeightTons = totalWeightKg / 1000;
  return { volumeM3, weightPerPieceKg, totalWeightKg, totalWeightTons };
}
