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
    default: "Sree Arumuga Steel Trading Private Limited | Trusted Since 1984",
    template: "%s | Sree Arumuga Steel Trading Private Limited",
  },
  description:
    "Exclusive JSW Steel distributor in Tamil Nadu for premium steel sheets, plates, and coils. Trusted industrial steel trading partner since 1984.",
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
    siteName: "Sree Arumuga Steel Trading Private Limited",
    title: "Sree Arumuga Steel Trading Private Limited | Trusted Since 1984",
    description:
      "Exclusive JSW Steel distributor in Tamil Nadu for premium steel sheets, plates, and coils. Trusted since 1984.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Sree Arumuga Steel Trading" }],
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sree Arumuga Steel Trading Private Limited",
    description: "JSW Exclusive Distributor in Tamil Nadu. Premium sheets, plates, and coils.",
    images: ["/twitter-image"],
  },
  category: "business",
  applicationName: "Sree Arumuga Steel Trading",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
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
  const baseUrl = "https://sast-website.vercel.app";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#org`,
        name: "Sree Arumuga Steel Trading Private Limited",
        url: baseUrl,
        logo: `${baseUrl}/Logo.png`,
        sameAs: [
          "https://www.facebook.com/profile.php?id=61577460474521",
          "https://www.instagram.com/sreearumugastell",
          "https://www.linkedin.com/company/sree-arumuga-steel-trading-private-limited",
        ],
      },
      {
        "@type": "LocalBusiness",
        "@id": `${baseUrl}/#localbusiness`,
        name: "Sree Arumuga Steel Trading Private Limited",
        url: baseUrl,
        image: `${baseUrl}/Logo.png`,
        telephone: "+91 99401 19914",
        email: "sree.arumuga@gmail.com",
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          streetAddress: "D-196, Sathangadu Iron & Steel Market, Manali",
          addressLocality: "Chennai",
          addressRegion: "TN",
          postalCode: "600068",
          addressCountry: "IN",
        },
        areaServed: "Tamil Nadu",
      },
    ],
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
