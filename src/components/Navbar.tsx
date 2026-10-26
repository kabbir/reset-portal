"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Menu, X } from "lucide-react";

interface NavbarProps {
  activePage: "guide" | "discord";
}

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

export default function Navbar({ activePage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#fbfaf6]/95 backdrop-blur-md border-b border-[#e7e5dc] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo - Way Bigger as requested */}
        <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
          <Image
            src="/logo-with-bg.png"
            alt="OurLife.Reset Official Logo"
            width={52}
            height={52}
            className="rounded-xl border border-[#d0cdc2] shadow-sm group-hover:scale-105 transition-transform duration-300 w-11 h-11 sm:w-[52px] sm:h-[52px]"
            priority
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-bold tracking-tight text-[#121814] group-hover:text-[#1b3826] transition-colors leading-tight">
              OurLife.Reset
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
              </span>
              <span className="text-[11px] text-[#798a80] font-medium tracking-wide">
                {activePage === "guide" ? "The Guide · Instant Access" : "Creator Discord · Enrolling"}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ece9e0]/60 p-1.5 rounded-full border border-[#dedad0]">
          <Link
            href="/"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activePage === "guide"
                ? "bg-[#1b3826] text-white shadow-xs"
                : "text-[#4a5950] hover:text-[#121814] hover:bg-[#dedad0]/50"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>The Guide ($19)</span>
          </Link>
          <Link
            href="/discord"
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold transition-all ${
              activePage === "discord"
                ? "bg-[#1b3826] text-white shadow-xs"
                : "text-[#4a5950] hover:text-[#121814] hover:bg-[#dedad0]/50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Creator Discord ($29)</span>
          </Link>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activePage === "guide" ? (
            <a
              href={STRIPE_CHECKOUT_URL}
              className="scale-cta-btn py-2 px-4 sm:px-5 text-xs font-semibold"
            >
              <div className="scale-cta-sheen" />
              <span className="relative z-10">Get Guide — $19</span>
              <div className="relative z-10 w-3.5 h-3.5 overflow-hidden">
                <div className="scale-arrow-track">
                  <span className="w-1/2 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-1/2 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          ) : (
            <a
              href="#enroll"
              className="scale-cta-btn py-2 px-4 sm:px-5 text-xs font-semibold"
            >
              <div className="scale-cta-sheen" />
              <span className="relative z-10">Join Discord — $29</span>
              <div className="relative z-10 w-3.5 h-3.5 overflow-hidden">
                <div className="scale-arrow-track">
                  <span className="w-1/2 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <span className="w-1/2 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#4a5950] hover:text-[#121814] hover:bg-[#eceae3] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e7e5dc] bg-[#fbfaf6] px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activePage === "guide"
                ? "bg-[#1b3826] text-white"
                : "text-[#121814] bg-[#f4f2ea]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>The Self-Mastery Guide ($19)</span>
            </div>
          </Link>

          <Link
            href="/discord"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition-all ${
              activePage === "discord"
                ? "bg-[#1b3826] text-white"
                : "text-[#121814] bg-[#f4f2ea]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Creator Discord ($29)</span>
            </div>
          </Link>
        </div>
      )}
    </header>
  );
}
