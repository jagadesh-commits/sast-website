"use client";

import { useEffect, useState } from "react";

const testimonials = [
  {
    name: "Ravi Kumar",
    company: "RK Fabricators",
    review: "Consistent sheet quality and timely dispatch every single order. Great support team.",
  },
  {
    name: "S. Prakash",
    company: "Chennai Infra Works",
    review: "Excellent plate quality for structural projects. Pricing transparency is impressive.",
  },
  {
    name: "Naveen Raj",
    company: "Metro Engineering",
    review: "Reliable coils and smooth logistics coordination. We trust them for urgent loads.",
  },
  {
    name: "Meena Devi",
    company: "Southline Industries",
    review: "Professional service and responsive team. Product specs are always accurate.",
  },
  {
    name: "Arun K",
    company: "Prime Build Systems",
    review: "Strong inventory availability and quality assurance. A dependable steel partner.",
  },
];

export function TestimonialsCarousel() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 3800);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <p className="industrial-heading text-sm font-semibold text-[var(--primary-blue)]">Testimonials</p>
        <h2 className="industrial-heading mt-2 text-5xl font-black text-zinc-900">What Our Clients Say</h2>
        <div className="mt-8 overflow-hidden rounded-3xl border border-[var(--primary-blue)]/15 bg-[var(--primary-blue)]/5 p-7 md:p-10">
          <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${active * 100}%)` }}>
            {testimonials.map((item) => (
              <article key={item.name} className="min-w-full">
                <p className="text-4xl text-[var(--primary-blue)]">❝</p>
                <p className="mt-4 text-lg text-zinc-700">{item.review}</p>
                <p className="mt-4 text-sm tracking-widest text-[var(--gold)]">★★★★★</p>
                <p className="mt-3 font-bold text-zinc-900">{item.name}</p>
                <p className="text-sm text-zinc-600">{item.company}</p>
              </article>
            ))}
          </div>
        </div>
        <div className="mt-5 flex justify-center gap-2">
          {testimonials.map((item, index) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(index)}
              className={`h-2.5 w-2.5 rounded-full transition ${active === index ? "bg-[var(--primary-blue)]" : "bg-zinc-300"}`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
