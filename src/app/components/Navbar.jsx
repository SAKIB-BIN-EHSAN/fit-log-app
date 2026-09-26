"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useFitLog } from "../context/FitLogContext";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const { todaysPlan, saved } = useFitLog();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Workout" },
    { href: "/my-plan", label: "My Plan" },
  ];

  return (
    <nav className="bg-[#0d0d0d] border-b border-[#1f1f1f] sticky top-0 z-[100]">
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-[68px]">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 no-underline">
          <Image src="/logo.png" alt="FitLog Logo" width={32} height={32} />
          <span className="font-oswald text-2xl font-bold text-[#ccff00] tracking-[0.05em]">
            FITLOG
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-oswald text-base font-medium tracking-[0.08em] no-underline pb-[2px] transition-colors duration-200 border-b-2 ${
                  isActive 
                    ? "text-[#ccff00] border-[#ccff00]" 
                    : "text-[#a0a0a0] border-transparent"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </div>

        {/* Right: Badges + Hamburger */}
        <div className="flex items-center gap-3">
          {/* Plan badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 no-underline bg-[#ccff00] text-[#0a0a0a] rounded-full py-[5px] px-[14px] font-oswald font-semibold text-[0.85rem] tracking-[0.05em] transition-transform duration-200 hover:scale-105"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            Plan{" "}
            <span className="bg-[#0a0a0a] text-[#ccff00] rounded-full py-[1px] px-[7px] text-[0.75rem] font-bold">
              {todaysPlan.length}
            </span>
          </Link>

          {/* Saved badge */}
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 no-underline bg-transparent text-[#ccff00] border-[1.5px] border-[#ccff00] rounded-full py-[5px] px-[14px] font-oswald font-semibold text-[0.85rem] tracking-[0.05em] transition-colors duration-200 hover:bg-[#ccff0022]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Saved{" "}
            <span className="bg-[#ccff0022] text-[#ccff00] rounded-full py-[1px] px-[7px] text-[0.75rem] font-bold">
              {saved.length}
            </span>
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden bg-transparent border-none text-white cursor-pointer p-1 flex"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {menuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d0d0d] border-t border-[#1f1f1f] p-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`font-oswald text-[1.1rem] font-medium tracking-[0.08em] no-underline pb-2 border-b border-[#1f1f1f] ${
                  isActive ? "text-[#ccff00]" : "text-white"
                }`}
              >
                {link.label.toUpperCase()}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
