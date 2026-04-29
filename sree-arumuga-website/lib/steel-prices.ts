/** Indicative INR per metric ton for calculator estimates (align with marketing ticker). */
export const STEEL_PRICE_INR_PER_TON: Record<string, number> = {
  "HR Coil": 60000,
  "CR Coil": 69000,
  "GP Coil": 83000,
  "GL Coil": 86000,
  "PPGL": 89000,
  "EG Coil": 86000,
  "HRPO": 65000,
  "MS Plate": 62000,
  "HR Sheets": 60000,
  "CR Sheets": 69000,
  "GP Sheets": 83000,
  "GL Sheets": 86000,
  "EG Sheets": 86000,
  "PPGL Sheets": 89000,
  "MS Plates": 62000,
  "Coils (General)": 63000,
};

export function getPricePerTonForProduct(productKey: string): number {
  return STEEL_PRICE_INR_PER_TON[productKey] ?? 62000;
}
