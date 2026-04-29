"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  noHide?: boolean;
};

export function Reveal({ children, className, delay = 0, noHide = false }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={noHide ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay }}
    >
      {children}
    </motion.div>
  );
}
