"use client";

import { useEffect, useState } from "react";

const VIEW_SIZE = 56;
const STROKE = 3;
const RADIUS = (VIEW_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function BackToTopProgress() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0;
      setProgress(ratio);
      setShow(scrollTop > 300);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  const dashOffset = CIRCUMFERENCE * (1 - progress);
  const center = VIEW_SIZE / 2;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fab-stack-back-to-top fab-stack-item relative overflow-hidden rounded-full border-0 bg-[#1a3a8f] p-0 text-white shadow-xl"
    >
      <svg
        viewBox={`0 0 ${VIEW_SIZE} ${VIEW_SIZE}`}
        className="pointer-events-none absolute inset-0 h-full w-full -rotate-90"
        aria-hidden
      >
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          stroke="rgba(255, 255, 255, 0.25)"
          strokeWidth={STROKE}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={RADIUS}
          stroke="#ffffff"
          strokeWidth={STROKE}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
        />
      </svg>
      <span className="absolute inset-0 grid place-items-center text-lg font-semibold leading-none">↑</span>
    </button>
  );
}
