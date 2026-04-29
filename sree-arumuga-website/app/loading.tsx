import Image from "next/image";

export default function Loading() {
  return (
    <div className="grid min-h-screen place-items-center bg-[var(--primary-blue)]">
      <div className="text-center">
        <div className="mx-auto flex h-[120px] w-[120px] animate-pulse items-center justify-center overflow-hidden rounded-full border border-white/35 bg-white/10 p-[15px]">
          <Image
            src="/Logo.png"
            alt="Sree Arumuga Logo"
            width={90}
            height={90}
            className="block h-full w-full rounded-full object-cover object-center"
          />
        </div>
        <p className="industrial-heading mt-4 text-sm font-semibold tracking-[0.25em] text-white">Trusted Since 1984</p>
      </div>
    </div>
  );
}
