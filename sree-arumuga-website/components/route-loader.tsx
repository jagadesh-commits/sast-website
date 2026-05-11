"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const LOADER_MS = 1500;

export function RouteLoader() {
  const pathname = usePathname();
  const [show, setShow] = useState(true);

  useEffect(() => {
    setShow(true);
    const timer = window.setTimeout(() => {
      setShow(false);
    }, LOADER_MS);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key={pathname}
          className="fixed inset-0 z-[130] grid place-items-center bg-[var(--primary-blue)]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto flex h-[120px] w-[120px] items-center justify-center overflow-hidden rounded-full border border-white/30 bg-white/15 p-[15px]"
            >
              <Image
                src="/Logo.png"
                alt="Sree Arumuga logo"
                width={90}
                height={90}
                className="block h-full w-full rounded-full object-cover object-center"
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.45 }}
              className="industrial-heading mt-4 text-sm tracking-[0.28em] text-white"
            >
              Trusted Since 1984
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
