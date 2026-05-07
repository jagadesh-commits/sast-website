import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Steel Products | HR, HRPO, CR, GP, GL, EG, PPGL Sheets & Coils Chennai",
  description:
    "Buy JSW HR, HRPO, CR, GP, GL, EG, PPGL steel sheets, plates and coils in Chennai. Exclusive JSW distributor. Best prices, bulk supply. Call +91 98400 36010.",
  alternates: { canonical: "https://sast-website.vercel.app/products" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/products",
    title: "Steel Products | HR, HRPO, CR, GP, GL, EG, PPGL Sheets & Coils Chennai",
    description:
      "Buy JSW HR, HRPO, CR, GP, GL, EG, PPGL steel sheets, plates and coils in Chennai. Exclusive JSW distributor. Best prices, bulk supply. Call +91 98400 36010.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Products | HR, HRPO, CR, GP, GL, EG, PPGL Sheets & Coils Chennai",
    description:
      "Buy JSW HR, HRPO, CR, GP, GL, EG, PPGL steel sheets, plates and coils in Chennai. Exclusive JSW distributor. Best prices, bulk supply. Call +91 98400 36010.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

