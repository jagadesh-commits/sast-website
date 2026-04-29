import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse premium steel sheets, plates, and coils supplied across Tamil Nadu by Sree Arumuga Steel Trading Private Limited.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Steel Products | Sree Arumuga Steel",
    description: "Premium sheets, plates, and coils for fabrication, infrastructure, and industrial applications.",
    url: "/products",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Steel Products | Sree Arumuga Steel",
    description: "Premium sheets, plates, and coils for industrial applications.",
  },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

