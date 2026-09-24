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

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50">
        <div className="bg-[#141414] px-4 py-2 text-[11px] text-white md:px-6 md:text-xs">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <p className="hidden sm:block">Mon-Sat: 9AM - 6PM</p>
            <a href={`tel:${PHONE_PRIMARY.replace(/\s/g, "")}`} className="hover:underline">
              ☎ {PHONE_PRIMARY}
            </a>
            <a href="mailto:sree.arumuga@gmail.com" className="hidden truncate sm:inline hover:underline">
              ✉ sree.arumuga@gmail.com
            </a>
            <p className="sm:ml-auto">📍 Manali, Chennai</p>
          </div>
        </div>
        <div
          className={`bg-white transition-all ${
            isScrolled ? "border-b border-[var(--primary-blue)] shadow-md" : "border-b border-zinc-200"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-6 md:py-4">
            <Link href="/" className="flex shrink-0 items-center gap-2 max-[379px]:gap-1.5 sm:gap-2.5 lg:gap-3">
              <Image
                src="/Logo.png"
                alt="Sree Arumuga Steel Trading Private Limited logo"
                width={60}
                height={60}
                className="h-10 w-10 shrink-0 md:h-12 md:w-12 min-[1100px]:h-14 min-[1100px]:w-14"
              />
              <div>
                <p className="industrial-heading whitespace-nowrap text-[13px] font-bold leading-none text-[var(--primary-blue)] max-[379px]:text-[11px] sm:text-sm min-[1100px]:!text-base xl:!text-xl xl:leading-normal">
                  <span className="lg:hidden">Sree Arumuga Steel Trading</span>
                  <span className="hidden lg:inline min-[1100px]:!hidden">Sree Arumuga</span>
                  <span className="hidden min-[1100px]:!inline">
                    Sree Arumuga Steel Trading Private Limited
                  </span>
                </p>
              </div>
            </Link>

            <div className="flex shrink-0 items-center gap-2 max-[379px]:gap-1.5 lg:hidden">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="industrial-heading rounded-full bg-[var(--primary-blue)] px-3.5 py-2 text-[11px] font-semibold text-white transition active:bg-[var(--primary-red)] max-[379px]:px-3"
              >
                Quote
              </button>
              <button
                type="button"
                aria-expanded={menuOpen}
                aria-controls="mobile-nav-panel"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
                className="grid h-10 w-10 place-items-center rounded-full border border-[var(--primary-blue)]/25 text-[var(--primary-blue)]"
              >
                {menuOpen ? (
                  <span aria-hidden className="text-xl leading-none">
                    ×
                  </span>
                ) : (
                  <span aria-hidden className="flex flex-col gap-1.5">
                    <span className="block h-0.5 w-5 bg-current" />
                    <span className="block h-0.5 w-5 bg-current" />
                    <span className="block h-0.5 w-5 bg-current" />
                  </span>
                )}
              </button>
            </div>

            <div className="hidden items-center gap-4 lg:flex xl:gap-7">
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

          <AnimatePresence>
            {menuOpen ? (
              <motion.div
                id="mobile-nav-panel"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.22 }}
                className="overflow-hidden border-t border-zinc-200 bg-white lg:hidden"
              >
                <div className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-3">
                  {links.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`industrial-heading rounded-xl px-4 py-3 text-sm font-bold tracking-wide ${
                          active
                            ? "bg-[var(--primary-blue)]/10 text-[var(--primary-blue)]"
                            : "text-[var(--primary-blue)]/85 active:bg-zinc-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
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
        <p className="pt-5 text-center text-xs text-white/65" suppressHydrationWarning>
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

