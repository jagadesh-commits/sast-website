"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type HeroGsapProps = {
  children: React.ReactNode;
  className?: string;
};

export function HeroGsap({ children, className }: HeroGsapProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const targets = root.querySelectorAll("[data-hero-anim]");
      gsap.fromTo(
        targets,
        { y: 28, autoAlpha: 0 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.9,
          stagger: 0.12,
          ease: "power3.out",
          clearProps: "transform,opacity,visibility",
        }
      );
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className={className}>
      {children}
    </div>
  );
}
