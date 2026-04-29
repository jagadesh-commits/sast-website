"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function RouteLoader() {
  const pathname = usePathname();
  return <LoaderOverlay key={pathname} />;
}

function LoaderOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShow(false);
    }, 1500);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show ? (
        <motion.div className="fixed inset-0 z-[130] grid place-items-center bg-[var(--primary-blue)]" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 0.5 } }}>
          <div className="text-center">
            <motion.div
              initial={{ scale: 0.55, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto h-24 w-24 overflow-hidden rounded-full border border-white/30 bg-white/15 p-2"
            >
              <Image src="/Logo.png" alt="Sree Arumuga logo" width={88} height={88} className="h-full w-full object-contain" />
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.45 }} className="industrial-heading mt-4 text-sm tracking-[0.28em] text-white">
              Trusted Since 1984
            </motion.p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
