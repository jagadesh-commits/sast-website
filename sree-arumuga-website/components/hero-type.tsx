"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function HeroType({ text }: { text: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const chars = text.split("");
    const state = { value: 0 };
    gsap.fromTo(
      state,
      { value: 0 },
      {
        value: chars.length,
        duration: 2,
        ease: "power2.out",
        onUpdate: () => {
          const count = Math.round(state.value);
          element.textContent = chars.slice(0, count).join("");
        },
      }
    );
  }, [text]);

  return <span ref={ref} className="text-gradient" />;
}
