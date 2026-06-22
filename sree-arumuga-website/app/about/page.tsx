import type { Metadata } from "next";
import { Reveal } from "@/components/reveal";
import { FoundersMessage } from "@/components/founders-message";
import { LeadershipBioCard } from "@/components/leadership-bio-card";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Us | Sree Arumuga Steel Trading Pvt Ltd | JSW Distributor Chennai Since 1984",
  description:
    "Sree Arumuga Steel Trading Private Limited — JSW exclusive steel distributor in Chennai since 1984. Supplying HR, CR, GP, HRPO, GL, PPGL sheets and coils across Tamil Nadu.",
  keywords:
    "jsw steel distributor chennai, jsw distributors tamil nadu, steel trading company chennai, sree arumuga steel, jsw steel dealership, steel supplier sathangadu manali chennai",
  alternates: { canonical: "https://sast-website.vercel.app/about" },
  openGraph: {
    type: "website",
    siteName: "Sree Arumuga Steel Trading",
    url: "https://sast-website.vercel.app/about",
    title: "About Us | Sree Arumuga Steel Trading Pvt Ltd | JSW Distributor Chennai Since 1984",
    description:
      "Sree Arumuga Steel Trading Private Limited — JSW exclusive steel distributor in Chennai since 1984. Supplying HR, CR, GP, HRPO, GL, PPGL sheets and coils across Tamil Nadu.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | Sree Arumuga Steel Trading Pvt Ltd | JSW Distributor Chennai Since 1984",
    description:
      "Sree Arumuga Steel Trading Private Limited — JSW exclusive steel distributor in Chennai since 1984. Supplying HR, CR, GP, HRPO, GL, PPGL sheets and coils across Tamil Nadu.",
    images: ["https://sast-website.vercel.app/og-image.jpg"],
  },
};

export default function AboutPage() {
  return (
    <div>
      <section className="relative overflow-hidden px-6 py-20 text-white">
        <Image
          src="/warehouse_3.png"
          alt="Steel warehouse Chennai — HR CR GP coil sheets"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[var(--primary-blue)]/70" />
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <h1 className="text-5xl font-black md:text-6xl">About Sree Arumuga Steel Trading</h1>
            <p className="mt-4 max-w-2xl text-white/80">
              Four decades of trust, quality and excellence in steel trading across Tamil Nadu.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-8 md:grid-cols-2 md:items-center">
          <Reveal className="border-l-4 border-[var(--primary-blue)] pl-6">
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Our Story</h2>
            <p className="mt-4 text-zinc-600">
              Sree Arumuga Steel Trading was founded in 1984 by Mr. P. G. Arumugam at the Sathangadu Iron &amp; Steel
              Market in Manali, Chennai. Starting with a small trading operation built on a simple promise — reliable
              supply and honest service — Mr. Arumugam grew the business steadily over four decades through trust, hard
              work, and an unwavering commitment to his customers.
            </p>
            <p className="mt-3 text-zinc-600">
              Today, under the leadership of Mr. P. A. Jagadesh (Director), the company has evolved into Sree Arumuga
              Steel Trading Private Limited — one of South India&apos;s leading steel distribution businesses and an
              Exclusive Distributor of JSW Steel products. With an annual turnover exceeding Rs. 350 Crores and a
              customer base of 3,000+ across Tamil Nadu, the company continues to honour the values its founder
              instilled: integrity, reliability, and genuine service.
            </p>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-3xl border border-zinc-200">
            <Image
              src="/office.png"
              alt="Sree Arumuga office"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <FoundersMessage />

      <section className="bg-[#f9f9f9] px-6 py-20">
        <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 md:items-center">
          <Reveal>
            <h2 className="text-4xl font-black text-[var(--primary-blue)]">Why Choose Us</h2>
            <p className="mt-4 text-zinc-600">
              40+ years of experience, genuine JSW supply, and customer-first service — trusted by businesses across
              Tamil Nadu.
            </p>
            <div className="mt-6 grid gap-4">
              {[
                {
                  title: "40+ Years of Experience",
                  desc: "Founded in 1984 by Mr. P. G. Arumugam, our four-decade legacy in steel trading means you deal with a partner who truly understands the industry.",
                },
                {
                  title: "JSW Exclusive Distributor",
                  desc: "As an authorized exclusive distributor of JSW Steel, we supply premium certified products — HR, CR, GP, GL, BGL, PPGL sheets, coils and MS plates.",
                },
                {
                  title: "Wide Product Range",
                  desc: "From hot-rolled sheets to colour-coated coils, we stock a comprehensive range of steel products to serve fabricators, contractors and manufacturers.",
                },
                {
                  title: "Competitive Pricing",
                  desc: "Our direct JSW distributor relationship ensures you get fair, market-linked pricing with full transparency. No hidden charges, no surprises.",
                },
                {
                  title: "On-Time Delivery",
                  desc: "With 90%+ on-time delivery across Tamil Nadu, we understand that project timelines don't wait — and neither do we.",
                },
                {
                  title: "Quality Assurance",
                  desc: "Every product we supply is JSW-certified and quality-checked, giving you confidence in what you're buying, every single time.",
                },
              ].map((item) => (
                <div key={item.title}>
                  <p className="text-sm font-bold text-[var(--primary-blue)]">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal className="relative min-h-[320px] overflow-hidden rounded-3xl border border-zinc-200">
            <Image
              src="/workers.png"
              alt="Sree Arumuga operations team"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="bg-white px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Vision &amp; Mission</h2></Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[var(--primary-blue)]">Vision</p>
              <p className="mt-2 text-sm text-zinc-600">
                To be Tamil Nadu&apos;s most trusted steel distribution partner — known for consistent quality, fair
                pricing, and service that industrial buyers can rely on.
              </p>
            </div>
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-bold text-[var(--primary-blue)]">Mission</p>
              <p className="mt-2 text-sm text-zinc-600">
                To provide fabricators, contractors, and industrial buyers across Tamil Nadu with premium JSW steel
                products, delivered on time and backed by four decades of expertise and relationships built on trust.
              </p>
            </div>
          </div>
          <div className="mt-10 space-y-6">
            {[
              {
                year: "1984",
                text: "Mr. P. G. Arumugam founds Sree Arumuga Steel Traders at Sathangadu Iron & Steel Market, Manali, Chennai",
              },
              {
                year: "1995",
                text: "Expanded product range to include GP and CR sheets, growing customer base to 100+",
              },
              {
                year: "2005",
                text: "Became an authorized JSW Steel distributor, strengthening product quality and supply reliability",
              },
              {
                year: "2015",
                text: "Achieved 10,000+ tons annual supply milestone, cementing position as a major Tamil Nadu steel distributor",
              },
              {
                year: "2020",
                text: "Recognized as Top Performing JSW Distributor in Tamil Nadu",
              },
              {
                year: "2024",
                text: "Launched digital platform and expanded customer base to 3,000+ across Tamil Nadu",
              },
              {
                year: "2026",
                text: "Transitioned to Private Limited company — Sree Arumuga Steel Trading Private Limited incorporated under the leadership of Mr. P. A. Jagadesh",
              },
            ].map((milestone) => (
              <Reveal key={milestone.year}>
                <div className="flex items-center gap-4">
                  <div className="h-3 w-3 shrink-0 rounded-full bg-[var(--primary-blue)]" />
                  <div className="h-1 flex-1 rounded-full bg-[var(--primary-blue)]/20" />
                  <p className="min-w-0 flex-1 text-sm text-zinc-700 md:max-w-xl">
                    <span className="font-bold text-[var(--primary-blue)]">{milestone.year}</span>: {milestone.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Leadership</h2></Reveal>
        <div className="mx-auto mt-8 grid max-w-4xl gap-6 md:grid-cols-2">
          <LeadershipBioCard
            photo="/leadership/arumugam-founder.png"
            cardName="Mr. P. G. Arumugam"
            cardTitle="Founder"
            cardImagePosition="object-[center_35%]"
            modalName="Mr. P. G. Arumugam"
            modalTitle="Founder"
            bio="P. G. Arumugam founded Sree Arumuga Steel Trading in 1984, laying the foundation for what would grow into one of South India's leading steel distribution businesses. Starting operations from Sathangadu Iron & Steel Market in Manali, Chennai, he built the company on a simple promise — reliable supply and honest service — and has not rested a single day since, a relentless work ethic that became the backbone of the business. His commitment to trust and consistency earned the company its standing among customers across Tamil Nadu, setting the foundation that the next generation of leadership continues to build on today."
          />
          <LeadershipBioCard
            photo="/leadership/jagadesh-md.png"
            cardName="P.A. JAGADESH"
            cardTitle="Managing Director"
            modalName="Mr. P. A. Jagadesh"
            modalTitle="Director"
            bio="P. A. Jagadesh leads Sree Arumuga Steel Trading Private Limited as Director, steering the company through its most significant transformation yet — the transition from a proprietorship firm to a Private Limited Company in 2026. Building on a foundation laid in 1984, he has driven the expansion of operations, strengthened customer relationships, and introduced modern business practices to a four-decade legacy in the steel trading industry. Under his leadership, the company has cemented its position as an Exclusive Distributor of JSW Steel and one of South India's leading steel distributors, with an annual turnover exceeding Rs. 350 Crores. He combines deep industry knowledge with a forward-looking approach, ensuring the company stays true to its founding values of trust and reliability while scaling for the future."
          />
        </div>
      </section>

      <section className="bg-[#f9f9f9] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <Reveal><h2 className="text-4xl font-black text-[var(--primary-blue)]">Our Values</h2></Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Integrity",
                desc: "We say what we mean and deliver what we promise — every order, every time.",
              },
              {
                title: "Reliability",
                desc: "Four decades of consistent supply has made us the go-to steel partner for businesses across Tamil Nadu.",
              },
              {
                title: "Quality",
                desc: "We stock only JSW-certified products, so our customers never have to compromise on what goes into their projects.",
              },
              {
                title: "Customer Focus",
                desc: "From bulk orders to urgent requirements, we treat every customer's need as our own priority.",
              },
            ].map((value) => (
              <Reveal key={value.title} className="rounded-3xl border border-zinc-200 bg-white p-6 text-center shadow-sm">
                <p className="text-3xl text-[var(--primary-blue)]">◆</p>
                <p className="mt-3 font-semibold text-zinc-700">{value.title}</p>
                <p className="mt-2 text-sm text-zinc-600">{value.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
