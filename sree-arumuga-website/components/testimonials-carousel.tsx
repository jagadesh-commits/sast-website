"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

type Testimonial = {
  quote: string;
  stars: number;
  name: string;
  company: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Sree Arumuga has been our go-to steel supplier for over 8 years. Their HR coil quality is consistently excellent and delivery is always on time. Highly recommended for any fabricator in Chennai.",
    stars: 5,
    name: "Rajesh Kumar",
    company: "RK Fabrication Works, Ambattur",
  },
  {
    quote:
      "Best JSW dealer in Chennai. We source all our CR sheets and GP coils from them. Pricing is transparent with no hidden charges. The team is very responsive on WhatsApp.",
    stars: 5,
    name: "Suresh Babu",
    company: "Sri Murugan Steel Structures, Manali",
  },
  {
    quote:
      "Reliable coils and smooth logistics coordination. We trust them for urgent loads. Even on short notice they arrange delivery within Chennai the same day.",
    stars: 5,
    name: "Naveen Raj",
    company: "Metro Engineering, Thiruvottiyur",
  },
  {
    quote:
      "Professional service and genuine JSW certified products. We have been buying PPGL roofing sheets from them for 3 years. Quality never compromises.",
    stars: 5,
    name: "Meenakshi Sundaram",
    company: "Southern Roofing Solutions, Ponneri",
  },
  {
    quote:
      "Their steel weight calculator on the website is very useful for estimating material cost before ordering. Good digital experience from a traditional steel company.",
    stars: 5,
    name: "Arun Prakash",
    company: "AP Construction, Redhills",
  },
  {
    quote:
      "We shifted from our old supplier to Sree Arumuga Steel two years ago. Best decision for our factory. GP coil prices are competitive and stock is always available.",
    stars: 5,
    name: "Karthik Selvam",
    company: "KS Sheet Metal Works, Ambattur",
  },
];

const GAP_PX = 16;

function starsString(n: number) {
  return "★".repeat(n);
}

export function TestimonialsCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportW, setViewportW] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const [slideIndex, setSlideIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const slideCount = Math.max(1, Math.ceil(testimonials.length / cardsPerView));

  const measure = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    const w = el.getBoundingClientRect().width;
    setViewportW(w);
    const perView = window.matchMedia("(min-width: 768px)").matches ? 2 : 1;
    setCardsPerView(perView);
  }, []);

  useLayoutEffect(() => {
    measure();
  }, [measure]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const ro = new ResizeObserver(() => measure());
    ro.observe(el);
    return () => ro.disconnect();
  }, [measure]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onChange = () => {
      measure();
      setSlideIndex(0);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [measure]);

  useEffect(() => {
    setSlideIndex((prev) => Math.min(prev, slideCount - 1));
  }, [slideCount]);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slideCount);
    }, 4000);
    return () => window.clearInterval(id);
  }, [paused, slideCount]);

  const cardWidth =
    viewportW > 0 && cardsPerView > 0
      ? (viewportW - GAP_PX * (cardsPerView - 1)) / cardsPerView
      : 0;

  const translateX = viewportW > 0 ? -slideIndex * viewportW : 0;

  const go = (dir: -1 | 1) => {
    setSlideIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return slideCount - 1;
      if (next >= slideCount) return 0;
      return next;
    });
  };

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="industrial-heading text-sm font-semibold text-[var(--primary-blue)]">Testimonials</p>
        <h2 className="industrial-heading mt-2 text-5xl font-black text-zinc-900">What Our Clients Say</h2>

        <div
          className="mt-8 rounded-3xl border border-[var(--primary-blue)]/15 bg-[var(--primary-blue)]/5 p-7 md:p-10"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative flex items-stretch gap-2 md:gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="z-10 hidden shrink-0 items-center justify-center self-center rounded-full border border-[var(--primary-blue)]/25 bg-white px-3 py-2 text-xl font-bold leading-none text-[var(--primary-blue)] shadow-sm transition hover:bg-[var(--primary-blue)]/10 md:flex"
              aria-label="Previous testimonial"
            >
              ‹
            </button>

            <div ref={viewportRef} className="min-w-0 flex-1 overflow-hidden">
              <div
                className="flex"
                style={{
                  gap: GAP_PX,
                  transform: `translateX(${translateX}px)`,
                  transition: "transform 0.5s ease",
                }}
              >
                {testimonials.map((item) => (
                  <article
                    key={item.name}
                    className="shrink-0 rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm"
                    style={{
                      width: cardWidth > 0 ? cardWidth : undefined,
                      minWidth: cardWidth > 0 ? cardWidth : undefined,
                    }}
                  >
                    <p className="text-4xl text-[var(--primary-blue)]">❝</p>
                    <p className="mt-4 text-lg text-zinc-700">{item.quote}</p>
                    <p className="mt-4 text-sm tracking-widest text-[var(--gold)]">{starsString(item.stars)}</p>
                    <p className="mt-3 font-bold text-zinc-900">{item.name}</p>
                    <p className="text-sm text-zinc-600">{item.company}</p>
                  </article>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => go(1)}
              className="z-10 hidden shrink-0 items-center justify-center self-center rounded-full border border-[var(--primary-blue)]/25 bg-white px-3 py-2 text-xl font-bold leading-none text-[var(--primary-blue)] shadow-sm transition hover:bg-[var(--primary-blue)]/10 md:flex"
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-3 md:hidden">
            <button
              type="button"
              onClick={() => go(-1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-blue)]/25 bg-white text-xl font-bold text-[var(--primary-blue)]"
              aria-label="Previous testimonial"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--primary-blue)]/25 bg-white text-xl font-bold text-[var(--primary-blue)]"
              aria-label="Next testimonial"
            >
              ›
            </button>
          </div>

          <div className="mt-5 flex justify-center gap-2">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setSlideIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${slideIndex === index ? "bg-[var(--primary-blue)]" : "bg-zinc-300"}`}
                aria-label={`Go to testimonial slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
