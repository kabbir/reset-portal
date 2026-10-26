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
    <header className="sticky top-0 z-50 w-full bg-[#fbfaf6]/92 backdrop-blur-md border-b border-[#e7e5dc] transition-all">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <Image
            src="/logo-with-bg.png"
            alt="Our Life Reset Official Logo"
            width={32}
            height={32}
            className="rounded-md border border-[#d8d5cb] shadow-xs group-hover:scale-105 transition-transform duration-300"
            priority
          />
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-tight text-[#121814] group-hover:text-[#1b3826] transition-colors">
              @ourlife.reset
            </span>
            <div className="flex items-center gap-1.5 -mt-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
              </span>
              <span className="text-[10px] text-[#798a80] font-medium tracking-wide">
                {activePage === "guide" ? "Guide · Instant Access" : "Creator Discord · Enrolling"}
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation Switcher */}
        <nav className="hidden md:flex items-center gap-1 bg-[#ece9e0]/60 p-1 rounded-full border border-[#dedad0]">
          <Link
            href="/"
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
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
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
              activePage === "discord"
                ? "bg-[#1b3826] text-white shadow-xs"
                : "text-[#4a5950] hover:text-[#121814] hover:bg-[#dedad0]/50"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Creator Discord</span>
            <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
              0 to 30k
            </span>
          </Link>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          {activePage === "guide" ? (
            <a
              href={STRIPE_CHECKOUT_URL}
              className="scale-cta-btn py-1.5 px-3.5 sm:px-4 text-xs font-semibold"
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
              className="scale-cta-btn py-1.5 px-3.5 sm:px-4 text-xs font-semibold"
            >
              <div className="scale-cta-sheen" />
              <span className="relative z-10">Join Discord</span>
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
            className="md:hidden p-1.5 rounded-lg text-[#4a5950] hover:text-[#121814] hover:bg-[#eceae3] transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#e7e5dc] bg-[#fbfaf6] px-4 py-3 space-y-2">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activePage === "guide"
                ? "bg-[#1b3826] text-white"
                : "text-[#121814] bg-[#f4f2ea]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4" />
              <span>The Self-Mastery Guide ($19)</span>
            </div>
            <span className="text-xs font-mono opacity-80">112 Pages</span>
          </Link>

          <Link
            href="/discord"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
              activePage === "discord"
                ? "bg-[#1b3826] text-white"
                : "text-[#121814] bg-[#f4f2ea]"
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4" />
              <span>Creator Discord (0 to 30k)</span>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold uppercase">
              Mastermind
            </span>
          </Link>
        </div>
      )}
    </header>
  );
}
