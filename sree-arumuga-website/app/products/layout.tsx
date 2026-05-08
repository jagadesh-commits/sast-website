import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Products | HR Coil, CR Coil, GP Coil, HRPO Sheets Chennai | JSW Distributor",
  description:
    "Buy JSW HR coil, CR coil, GP coil, HRPO sheets, GL sheets, EG sheets, PPGL sheets and MS plates in Chennai. Exclusive JSW steel distributor. Best price guaranteed.",
  keywords:
    "hr coil, cr coil, gp coil, hrpo coil, hrpo sheet, cold rolled coil, hot rolled steel coil, gp coil sheet, cr sheet coil, jsw steel dealers near me, steel sheets chennai",
  alternates: {
    canonical: "https://sast-website.vercel.app/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

