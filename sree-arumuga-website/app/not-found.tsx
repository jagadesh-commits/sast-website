import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative isolate grid min-h-[calc(100vh-120px)] place-items-center overflow-hidden bg-white px-6 py-16">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(26,58,143,0.14),transparent_45%),radial-gradient(circle_at_80%_80%,rgba(26,58,143,0.1),transparent_40%)]" />
      <div className="w-full max-w-2xl rounded-3xl border border-[var(--primary-blue)]/20 bg-white/90 p-10 text-center shadow-xl">
        <Image src="/Logo.png" alt="Sree Arumuga Logo" width={84} height={84} className="mx-auto h-20 w-20 object-contain" />
        <p className="industrial-heading mt-5 text-7xl font-black text-[var(--primary-blue)]">404</p>
        <h1 className="industrial-heading mt-2 text-3xl font-black text-zinc-900">Oops! Page Not Found</h1>
        <p className="mt-3 text-zinc-600">The page you&apos;re looking for doesn&apos;t exist.</p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link href="/" className="industrial-heading rounded-full bg-[var(--primary-blue)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-red)]">
            Go Back Home
          </Link>
          <a
            href="https://wa.me/919940119914?text=Hi%2C%20I%20need%20help%20finding%20a%20page%20on%20your%20website."
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            WhatsApp Support
          </a>
        </div>
      </div>
    </div>
  );
}
