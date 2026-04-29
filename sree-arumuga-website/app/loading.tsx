import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--primary-blue)]">
      <div className="text-center">
        <div className="mx-auto h-24 w-24 animate-pulse overflow-hidden rounded-full border border-white/35 bg-white/10 p-2">
          <Image src="/Logo.png" alt="Sree Arumuga Logo" width={88} height={88} className="h-full w-full object-contain" />
        </div>
        <p className="industrial-heading mt-4 text-sm font-semibold tracking-[0.25em] text-white">Trusted Since 1984</p>
      </div>
    </div>
  );
}
