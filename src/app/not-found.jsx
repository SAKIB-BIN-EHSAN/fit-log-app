"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center py-12 px-6 text-center bg-[#0a0a0a]">
      {/* Big 404 */}
      <p className="font-oswald text-[clamp(6rem,18vw,14rem)] font-bold text-[#ccff00] m-0 leading-none opacity-15 tracking-[0.05em] select-none">
        404
      </p>

      <div className="-mt-8 relative z-10">
        <h1 className="font-oswald text-[clamp(1.8rem,4vw,3rem)] font-bold text-white m-0 mb-4 tracking-[0.05em]">
          PAGE NOT FOUND
        </h1>
        <p className="font-inter text-base text-[#666] m-0 mb-8 max-w-[400px]">
          Looks like you took a wrong turn. This page doesn&apos;t exist in the FitLog library.
        </p>

        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-[#ccff00] text-[#0a0a0a] font-oswald font-semibold text-[0.95rem] tracking-[0.08em] px-6 py-3 rounded-lg no-underline transition-transform duration-200 hover:-translate-y-0.5"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            BACK TO LIBRARY
          </Link>

          <Link
            href="/my-plan"
            className="inline-flex items-center gap-2 bg-transparent text-[#ccff00] border-[1.5px] border-[#ccff00] font-oswald font-semibold text-[0.95rem] tracking-[0.08em] px-6 py-3 rounded-lg no-underline transition-colors duration-200 hover:bg-[#ccff0018]"
          >
            VIEW MY PLAN
          </Link>
        </div>
      </div>
    </div>
  );
}
