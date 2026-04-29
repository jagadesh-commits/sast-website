"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  end: number;
  suffix?: string;
  label: string;
  dark?: boolean;
  className?: string;
};

export function CountUp({ end, suffix = "+", label, dark = false, className }: CountUpProps) {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const duration = 1600;
    const start = performance.now();
    const frame = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setValue(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [end, started]);

  return (
    <div ref={ref} className={className ?? "premium-card rounded-3xl p-6 text-center"}>
      <p className={`text-5xl font-black ${dark ? "text-white" : "text-[var(--primary-blue)]"}`}>
        {value}
        <span className={dark ? "text-[var(--gold)]" : ""}>{suffix}</span>
      </p>
      <p className={`mt-2 text-sm ${dark ? "text-white/80" : "text-zinc-600"}`}>{label}</p>
    </div>
  );
}
