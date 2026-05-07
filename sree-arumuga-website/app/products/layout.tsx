import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Products",
  description: "Browse premium steel sheets, plates, and coils supplied across Tamil Nadu by Sree Arumuga Steel Trading Private Limited.",
  alternates: { canonical: "https://sast-website.vercel.app/products" },
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
  const url = "https://sast-website.vercel.app/products";
  const productSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: "JSW Steel Sheets, Plates and Coils",
        brand: { "@type": "Brand", name: "JSW Steel" },
        category: "HR, HRPO, CR, GP, GL, EG, PPGL sheets and coils",
        url,
        seller: {
          "@type": "Organization",
          name: "Sree Arumuga Steel Trading Private Limited",
          url: "https://sast-website.vercel.app/",
        },
      },
      {
        "@type": "Article",
        headline: "JSW Steel Sheets, Plates and Coils",
        about: "HR, HRPO, CR, GP, GL, EG, PPGL sheets and coils",
        url,
        publisher: {
          "@type": "Organization",
          name: "Sree Arumuga Steel Trading Private Limited",
          url: "https://sast-website.vercel.app/",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {children}
    </>
  );
}

