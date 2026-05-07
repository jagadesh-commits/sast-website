import type { Metadata } from "next";
import { EnquiryForm } from "@/components/enquiry-form";
import { Reveal } from "@/components/reveal";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Contact Us | Sree Arumuga Steel Trading Chennai | +91 98400 36010",
  description:
    "Contact Sree Arumuga Steel Trading Pvt Ltd. Visit us at D-196 Sathangadu Iron & Steel Market, Manali, Chennai 600068. Call +91 98400 36010 or WhatsApp +91 99401 19914.",
  alternates: { canonical: "https://sast-website.vercel.app/contact" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/contact",
    title: "Contact Us | Sree Arumuga Steel Trading Chennai | +91 98400 36010",
    description:
      "Contact Sree Arumuga Steel Trading Pvt Ltd. Visit us at D-196 Sathangadu Iron & Steel Market, Manali, Chennai 600068. Call +91 98400 36010 or WhatsApp +91 99401 19914.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Sree Arumuga Steel Trading Chennai | +91 98400 36010",
    description:
      "Contact Sree Arumuga Steel Trading Pvt Ltd. Visit us at D-196 Sathangadu Iron & Steel Market, Manali, Chennai 600068. Call +91 98400 36010 or WhatsApp +91 99401 19914.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-20">
      <Reveal>
        <h1 className="text-5xl font-black text-[var(--primary-blue)]">Contact Us</h1>
      </Reveal>
      <div className="mt-10 grid gap-7 md:grid-cols-2">
        <Reveal className="rounded-3xl border border-zinc-200 bg-white p-8 pb-10 shadow-sm max-h-[90vh] overflow-y-auto overscroll-contain">
          <h2 className="text-2xl font-bold text-[var(--primary-blue)]">Send an Enquiry</h2>
          <EnquiryForm source="contact-page" />
        </Reveal>
        <Reveal className="relative min-h-[420px] overflow-hidden rounded-3xl border border-zinc-200">
          <Image
            src="/office.png"
            alt="Sree Arumuga office photo"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
      </div>
      <Reveal className="mt-7 rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--primary-blue)]">Reach Us Directly</h2>
          <p className="mt-4 text-sm text-zinc-600">Phone: +91 99401 19914</p>
          <p className="text-sm text-zinc-600">Email: sree.arumuga@gmail.com</p>
          <p className="mt-2 text-sm text-zinc-600">D-196, Sathangadu Iron & Steel Market, Manali, Chennai - 600068</p>
          <a href="https://wa.me/919940119914" target="_blank" rel="noreferrer" className="mt-6 inline-block rounded-full bg-[#25D366] px-5 py-3 font-semibold text-white">
            WhatsApp
          </a>
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200">
            <iframe
              title="Sree Arumuga Steel Trading Private Limited Location"
              src="https://maps.google.com/maps?q=D-196%2C%20Sathangadu%20Iron%20%26%20Steel%20Market%2C%20Manali%2C%20Chennai%20600068&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-[280px] w-full"
              loading="lazy"
            />
          </div>
      </Reveal>
    </div>
  );
}
