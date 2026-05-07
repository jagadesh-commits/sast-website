"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { BackToTopProgress } from "@/components/back-to-top-progress";
import { ChatbotWidget } from "@/components/chatbot-widget";
import { EnquiryForm } from "@/components/enquiry-form";
import { ExitIntentPopup } from "@/components/exit-intent-popup";
import { RouteLoader } from "@/components/route-loader";
import { WhatsAppWidget } from "@/components/whatsapp-widget";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50">
        <div className="bg-[#141414] px-6 py-2 text-xs text-white">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-1">
            <p>Mon-Sat: 9AM - 6PM</p>
            <p>☎ +91 99401 19914</p>
            <p>✉ sree.arumuga@gmail.com</p>
            <p>📍 Manali, Chennai</p>
          </div>
        </div>
        <div
          className={`bg-white transition-all ${
            isScrolled ? "border-b border-[var(--primary-blue)] shadow-md" : "border-b border-zinc-200"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <Link href="/" className="flex items-center gap-3">
              <Image src="/Logo.png" alt="Sree Arumuga Logo" width={60} height={60} className="h-12 w-12 md:h-14 md:w-14" />
              <div className="hidden md:block">
                <p className="industrial-heading text-xl font-bold text-[var(--primary-blue)]">Sree Arumuga Steel Trading Private Limited</p>
              </div>
            </Link>
            <div className="hidden items-center gap-7 lg:flex">
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
            <button
              onClick={() => setMobileOpen(true)}
              className="rounded-md border border-zinc-300 p-2 lg:hidden"
              aria-label="Open mobile menu"
            >
              <span className="block h-0.5 w-5 bg-[var(--primary-blue)]" />
              <span className="mt-1.5 block h-0.5 w-5 bg-[var(--primary-blue)]" />
              <span className="mt-1.5 block h-0.5 w-5 bg-[var(--primary-blue)]" />
            </button>
          </nav>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-[105] bg-black/45 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              className="ml-auto flex h-full w-full max-w-md flex-col bg-[var(--primary-blue)] text-white"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between px-5 py-5">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
                  <Image src="/Logo.png" alt="Sree Arumuga Logo" width={46} height={46} className="h-11 w-11 rounded-full bg-white/85 p-1" />
                  <p className="industrial-heading text-sm font-bold text-white">Sree Arumuga</p>
                </Link>
                <button
                  type="button"
                  aria-label="Close mobile menu"
                  onClick={() => setMobileOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/35 text-2xl leading-none text-white"
                >
                  ×
                </button>
              </div>

              <nav className="flex flex-1 flex-col items-center justify-center gap-6 px-8 text-center">
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`industrial-heading text-[20px] font-bold tracking-wide transition-colors duration-300 ${
                        active ? "text-white/100 underline underline-offset-8" : "text-white/90 hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>

              <div className="space-y-3 px-5 pb-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setShowModal(true);
                  }}
                  className="industrial-heading w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--primary-blue)] transition hover:bg-[var(--primary-red)] hover:text-white active:bg-[var(--primary-red)]"
                >
                  Request Quote
                </button>
                <a
                  href="https://wa.me/919940119914"
                  target="_blank"
                  rel="noreferrer"
                  className="block w-full rounded-full bg-[#25D366] px-5 py-3 text-center text-sm font-semibold text-white"
                >
                  WhatsApp
                </a>
                <div className="pt-3">
                  <div className="mx-auto h-px w-full bg-white/25" />
                  <div className="mt-4 flex items-center justify-center gap-3 text-sm">
                    <a href="https://www.facebook.com/profile.php?id=61577460474521" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--primary-blue)]">f</a>
                    <a href="https://www.instagram.com/sreearumugastell" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--primary-blue)]">i</a>
                    <a href="https://www.linkedin.com/company/sree-arumuga-steel-trading-private-limited" target="_blank" rel="noreferrer" className="grid h-9 w-9 place-items-center rounded-full bg-white text-[var(--primary-blue)]">in</a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -18 }}
          transition={{ duration: 0.4 }}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      <RouteLoader />

      <footer className="mt-24 bg-[var(--primary-blue)] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <div className="mb-8 flex items-center gap-3">
            <Image src="/Logo.png" alt="Sree Arumuga Logo" width={52} height={52} className="h-12 w-12" />
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
            <p className="mt-3 text-sm text-white/80">+91 99401 19914</p>
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
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transition: "background 0.3s",
                }}
              >
                <FaFacebookF size={16} />
              </a>

              <a
                href="https://www.instagram.com/sreearumugastell"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transition: "background 0.3s",
                }}
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="https://www.linkedin.com/company/sree-arumuga-steel-trading-private-limited"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transition: "background 0.3s",
                }}
              >
                <FaLinkedinIn size={16} />
              </a>

              <a
                href="https://wa.me/919940119914"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.15)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  transition: "background 0.3s",
                }}
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
      <ExitIntentPopup />
      <BackToTopProgress />
      <ChatbotWidget />
      <WhatsAppWidget />
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

