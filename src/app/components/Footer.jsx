import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-[#1f1f1f] py-6 px-6">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Left: Logo + Brand */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/logo.png" alt="FitLog Logo" width={28} height={28} />
          <span className="font-oswald text-xl font-bold text-[#ccff00] tracking-[0.08em]">
            FITLOG
          </span>
        </Link>

        {/* Right: Copyright */}
        <p className="text-[#666666] text-[0.85rem] font-inter m-0">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
