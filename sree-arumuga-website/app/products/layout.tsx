import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Products | HR, HRPO, CR, GP, GL, EG, PPGL Sheets & Coils Chennai",
  description:
    "Buy JSW HR, HRPO, CR, GP, GL, EG, PPGL steel sheets, plates and coils in Chennai. Exclusive JSW distributor. Best prices, bulk supply. Call +91 98400 36010.",
  alternates: {
    canonical: "https://sast-website.vercel.app/products",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

