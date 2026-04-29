"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [ring, setRing] = useState({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouchLike = window.matchMedia("(any-pointer: coarse)").matches;
    if (isTouchLike) return;
    const onMouseMove = (event: MouseEvent) => {
      const position = { x: event.clientX, y: event.clientY };
      targetRef.current = position;
      setDot(position);
      setRing(position);
      setEnabled(true);
    };
    const onTouchStart = () => setEnabled(false);
    window.addEventListener("mousemove", onMouseMove, { once: true });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchstart", onTouchStart);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("custom-cursor");

    const onMove = (event: MouseEvent) => {
      targetRef.current = { x: event.clientX, y: event.clientY };
      setDot({ x: event.clientX, y: event.clientY });
    };

    const onHover = (event: Event) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest("a,button,input,textarea,select,[role='button'],[data-open-quote='true'],[onclick],.cursor-pointer");
      setHovering(Boolean(interactive));
    };

    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onBlur = () => {
      setPressed(false);
      setHovering(false);
    };

    const animate = () => {
      setRing((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.2,
        y: prev.y + (targetRef.current.y - prev.y) * 0.2,
      }));
      frameRef.current = window.requestAnimationFrame(animate);
    };

    frameRef.current = window.requestAnimationFrame(animate);
    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onHover, true);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onBlur);

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onHover, true);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onBlur);
      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = hovering ? 24 : 40;
  const halfRing = ringSize / 2;
  const ringBg = hovering ? "var(--primary-blue)" : "transparent";
  const ringBorder = hovering ? "rgba(26,58,143,1)" : "rgba(26,58,143,0.7)";

  return (
    <>
      <motion.span
        className="pointer-events-none fixed z-[120] h-3 w-3 rounded-full bg-[var(--primary-blue)]"
        style={{ transform: `translate3d(${dot.x - 6}px, ${dot.y - 6}px, 0)` }}
        animate={{
          opacity: hovering ? 0 : 1,
          scale: pressed ? 0.7 : 1,
        }}
        transition={{ duration: 0.14, ease: "easeOut" }}
      />
      <motion.span
        className="pointer-events-none fixed z-[119] rounded-full border-2"
        style={{
          width: `${ringSize}px`,
          height: `${ringSize}px`,
          backgroundColor: ringBg,
          borderColor: ringBorder,
          transform: `translate3d(${ring.x - halfRing}px, ${ring.y - halfRing}px, 0)`,
        }}
        animate={{
          scale: pressed ? 0.86 : 1,
        }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      />
    </>
  );
}
