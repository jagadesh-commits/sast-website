"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { BackToTopProgress } from "@/components/back-to-top-progress";
import { ChatbotOpenProvider } from "@/components/chatbot-open-context";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { EnquiryForm } from "@/components/enquiry-form";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { RouteLoader } from "@/components/route-loader";
import { WhatsAppWidget } from "@/components/whatsapp-widget";
import { PHONE_PRIMARY, PHONES_DISPLAY, WHATSAPP_NUMBER_DIGITS } from "@/lib/company-contact";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/products", label: "Products" },
  { href: "/achievements", label: "Achievements" },
  { href: "/blog", label: "Blog" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    onScroll();
    window.addEventListener("scroll", onScroll);
    const onOpenQuote = () => setShowModal(true);
    window.addEventListener("open-quote-modal", onOpenQuote);
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("[data-open-quote='true']")) setShowModal(true);
    };
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("open-quote-modal", onOpenQuote);
      window.removeEventListener("click", onClick);
    };
  }, []);

  // #region agent log
  useEffect(() => {
    const logProbe = (reason: string) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const min769 = window.matchMedia("(min-width: 769px)").matches;
      const max768 = window.matchMedia("(max-width: 768px)").matches;
      fetch("http://127.0.0.1:7734/ingest/c439cf8e-d643-4685-858a-3d34dff60eb3", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Debug-Session-Id": "a439d7" },
        body: JSON.stringify({
          sessionId: "a439d7",
          runId: "ui-audit-pre",
          hypothesisId: "H1-H5",
          location: "site-chrome.tsx:uiProbe",
          message: "viewport_route_breakpoints",
          data: { reason, pathname, vw, vh, min769, max768 },
          timestamp: Date.now(),
        }),
      }).catch(() => {});
    };
    logProbe("pathname");
    const onResize = () => logProbe("resize");
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [pathname]);
  // #endregion

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50">
        <div className="bg-[#141414] px-6 py-2 text-xs text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <p>Mon-Sat: 9AM - 6PM</p>
            <p>☎ {PHONE_PRIMARY}</p>
            <p>✉ sree.arumuga@gmail.com</p>
            <p>📍 Manali, Chennai</p>
          </div>
        </div>
        <div
          className={`bg-white transition-all ${
            isScrolled ? "border-b border-[var(--primary-blue)] shadow-md" : "border-b border-zinc-200"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center gap-2 px-3 py-3 min-[769px]:justify-between min-[769px]:gap-0 min-[769px]:px-6 min-[769px]:py-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <Image
                src="/Logo.png"
                alt="Sree Arumuga Steel Trading Private Limited logo"
                width={60}
                height={60}
                className="h-10 w-10 min-[769px]:h-14 min-[769px]:w-14"
              />
              <div className="hidden md:block">
                <p className="industrial-heading text-xl font-bold text-[var(--primary-blue)]">Sree Arumuga Steel Trading Private Limited</p>
              </div>
            </Link>

            <div className="scrollbar-hide min-w-0 flex-1 overflow-x-auto min-[769px]:hidden">
              <div className="flex w-max items-center gap-3 pr-2">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`industrial-heading whitespace-nowrap text-[11px] font-bold tracking-wide transition-colors ${
                        active
                          ? "border-b-2 border-[var(--gold)] pb-0.5 text-[var(--primary-blue)]"
                          : "text-[var(--primary-blue)]/80 hover:text-[var(--primary-blue)]"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="hidden items-center gap-7 min-[769px]:flex">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`industrial-heading group relative text-sm font-bold tracking-wide transition-colors duration-300 ease-[ease] ${
                    active
                      ? "text-[var(--primary-red)]"
                      : "text-[var(--primary-blue)] hover:text-[var(--primary-red)]"
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] transition-[width,background-color] duration-300 ease-[ease] ${
                      active
                        ? "w-full bg-[var(--primary-red)]"
                        : "w-0 bg-[var(--primary-blue)] group-hover:w-full group-hover:bg-[var(--primary-red)]"
                    }`}
                  />
                </Link>
                );
              })}
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="industrial-heading rounded-full bg-[var(--primary-blue)] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[var(--primary-red)] active:bg-[var(--primary-red)]"
              >
                Request Quote
              </button>
            </div>
          </nav>
        </div>
      </header>

      <main key={pathname}>{children}</main>

      <RouteLoader />

      <footer className="mt-24 bg-[var(--primary-blue)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-center gap-3">
            <Image src="/Logo.png" alt="Sree Arumuga Steel Trading Private Limited logo" width={52} height={52} className="h-12 w-12" />
            <div>
              <p className="industrial-heading text-lg font-black">Sree Arumuga Steel Trading Private Limited</p>
              <p className="text-sm text-white/80">Trusted Since 1984</p>
            </div>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
          <div>
            <p className="font-semibold text-[var(--gold)]">About</p>
            <p className="mt-3 text-sm text-white/80">
              Exclusive JSW Steel Distributor in Chennai since 1984. Premium sheets, plates and coils for Tamil Nadu&apos;s
              industrial growth.
            </p>
          </div>
          <div>
            <p className="font-semibold text-[var(--gold)]">Products</p>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              <p>Steel Sheets</p>
              <p>Steel Plates</p>
              <p>Steel Coils</p>
            </div>
          </div>
          <div>
            <p className="font-semibold text-[var(--gold)]">Quick Links</p>
            <div className="mt-3 space-y-2 text-sm text-white/80">
              {links.map((link) => (
                <Link key={link.href} href={link.href} className="block hover:text-white">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="font-semibold text-[var(--gold)]">Contact</p>
            <p className="mt-3 text-sm text-white/80">{PHONES_DISPLAY}</p>
            <p className="text-sm text-white/80">sree.arumuga@gmail.com</p>
            <p className="mt-2 text-sm text-white/80">
              D-196, Sathangadu Iron & Steel Market, Manali, Chennai - 600068
            </p>
            <p className="mt-2 text-sm text-white/80">GST No: 33ABSCS3792H1ZS</p>
            <div className="mt-4 flex gap-3 text-sm">
              <a
                href="https://www.facebook.com/profile.php?id=61577460474521"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-facebook"
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/sreearumugastell"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-instagram"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/sree-arumuga-steel-trading-private-limited"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-linkedin"
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER_DIGITS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon social-whatsapp"
              >
                <FaWhatsapp size={16} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-10 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />
        <p className="pt-5 text-center text-xs text-white/65">
          © {new Date().getFullYear()} Sree Arumuga Steel Trading Private Limited. All Rights Reserved.
        </p>
        </div>
      </footer>

      <QuoteModal show={showModal} onClose={() => setShowModal(false)} />
      {!isDashboard && <ExitIntentPopup />}
      <BackToTopProgress />
      <ChatbotOpenProvider>
        <ChatbotWidget />
        <WhatsAppWidget />
      </ChatbotOpenProvider>
    </div>
  );
}

function QuoteModal({ show, onClose }: { show: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/45 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(event) => event.stopPropagation()}
            className="premium-card w-full max-w-lg rounded-3xl p-8 pb-10 max-h-[90vh] overflow-y-auto overscroll-contain"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <h3 className="text-2xl font-bold text-[var(--primary-blue)]">Request a Quote</h3>
            <p className="mt-1 text-sm text-zinc-500">We will contact you within one business day.</p>
            <EnquiryForm
              source="quote-modal"
              className="mt-6"
              leadingActions={
                <button type="button" onClick={onClose} className="rounded-full border border-zinc-300 px-5 py-3 text-sm font-medium text-zinc-800">
                  Cancel
                </button>
              }
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

