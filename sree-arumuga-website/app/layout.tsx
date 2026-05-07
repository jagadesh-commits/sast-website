import type { Metadata } from "next";
import { Inter, Oswald } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site-chrome";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sast-website.vercel.app"),
  title: {
    default: "Sree Arumuga Steel Trading Pvt Ltd | JSW Exclusive Distributor Chennai",
    template: "%s | Sree Arumuga Steel Trading",
  },
  description:
    "Leading steel trading company in Chennai since 1984. JSW exclusive distributor for HR, HRPO, CR, GP, GL, EG, PPGL sheets, plates and coils. Get instant quote.",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Sree Arumuga Steel Trading",
    title: "Sree Arumuga Steel Trading Pvt Ltd | JSW Exclusive Distributor Chennai",
    description:
      "Leading steel trading company in Chennai since 1984. JSW exclusive distributor for HR, HRPO, CR, GP, GL, EG, PPGL sheets, plates and coils. Get instant quote.",
    images: [{ url: "https://sast-website.vercel.app/og-image.jpg", width: 1200, height: 630, alt: "Sree Arumuga Steel Trading" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sree Arumuga Steel Trading Pvt Ltd | JSW Exclusive Distributor Chennai",
    description:
      "Leading steel trading company in Chennai since 1984. JSW exclusive distributor for HR, HRPO, CR, GP, GL, EG, PPGL sheets, plates and coils. Get instant quote.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  category: "business",
  applicationName: "Sree Arumuga Steel Trading",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  keywords:
    "steel trading Chennai, JSW distributor Chennai, HR sheets Chennai, CR coils Chennai, GP sheets Chennai, steel plates Chennai, PPGL sheets, EG sheets, steel supplier Chennai, Manali steel market",
  other: {
    "geo.region": "IN-TN",
    "geo.placename": "Chennai",
    "geo.position": "13.1388;80.2978",
    ICBM: "13.1388, 80.2978",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Sree Arumuga Steel Trading Private Limited",
    image: "https://sast-website.vercel.app/og-image.jpg",
    url: "https://sast-website.vercel.app",
    telephone: "+919840036010",
    email: "sree.arumuga@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "D-196 Sathangadu Iron & Steel Market, Manali",
      addressLocality: "Chennai",
      addressRegion: "Tamil Nadu",
      postalCode: "600068",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 13.1388,
      longitude: 80.2978,
    },
    openingHours: "Mo-Sa 09:00-18:00",
    priceRange: "₹₹",
    sameAs: [],
    description: "JSW exclusive distributor for steel sheets, plates and coils in Chennai since 1984.",
  };

  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
