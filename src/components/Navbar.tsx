"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DiscordLogo, StripeLogo } from "@/components/BrandLogos";

interface NavbarProps {
  activePage: "guide" | "discord";
}

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

export default function Navbar({ activePage }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-md transition-colors duration-500 ${
        activePage === "discord"
          ? "bg-[#0b0b0b]/95 border-b border-white/15 text-white"
          : "bg-[#fbfaf6]/95 border-b border-black/15 text-[#121814]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-18 sm:h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3.5 shrink-0 group">
          <Image
            src="/logo-with-bg.png"
            alt="OurLife.Reset Official Logo"
            width={44}
            height={44}
            className="w-9 h-9 sm:w-11 sm:h-11 rounded-none border border-current opacity-90 group-hover:opacity-100 transition-opacity"
            priority
          />
          <div className="flex flex-col">
            <span className="font-riviera text-xs sm:text-sm uppercase tracking-[0.28em] font-medium leading-tight">
              OurLife.Reset
            </span>
            <span
              className={`text-[10px] uppercase tracking-[0.2em] font-light mt-0.5 ${
                activePage === "discord" ? "text-white/50" : "text-black/50"
              }`}
            >
              {activePage === "guide" ? "Daily Mindset Guide" : "Creator Discord"}
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Switcher - Minimalist Editorial (Only 2 Main Pages) */}
        <nav className="hidden md:flex items-center gap-7">
          <Link
            href="/"
            className={`font-riviera text-xs uppercase tracking-[0.25em] transition-all duration-300 py-1 border-b ${
              activePage === "guide"
                ? "border-current opacity-100 font-medium"
                : "border-transparent opacity-50 hover:opacity-100 font-light"
            }`}
          >
            The Guide
          </Link>
          <span className={`text-xs ${activePage === "discord" ? "text-white/20" : "text-black/20"}`}>/</span>
          <Link
            href="/discord"
            className={`font-riviera text-xs uppercase tracking-[0.25em] transition-all duration-300 py-1 border-b flex items-center gap-2 ${
              activePage === "discord"
                ? "border-current opacity-100 font-medium"
                : "border-transparent opacity-50 hover:opacity-100 font-light"
            }`}
          >
            <DiscordLogo className="w-3.5 h-3.5 opacity-80" />
            <span>Creator Discord</span>
          </Link>
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-4">
          {activePage === "guide" ? (
            <a
              href={STRIPE_CHECKOUT_URL}
              className="rr-btn hidden sm:inline-flex items-center gap-2.5 px-6 py-2.5 text-xs font-medium border border-[#121814] text-[#121814] hover:bg-[#121814] hover:text-white"
            >
              <StripeLogo className="h-3 w-auto opacity-70" />
              <span>Get The Guide — $19</span>
            </a>
          ) : (
            <a
              href="#enroll"
              className="rr-btn hidden sm:inline-flex items-center gap-2.5 px-6 py-2.5 text-xs font-medium border border-white text-white hover:bg-white hover:text-black"
            >
              <DiscordLogo className="w-3.5 h-3.5" />
              <span>Join Discord — $29</span>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-current opacity-70 hover:opacity-100 transition-opacity"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer (Only The Guide and Creator Discord) */}
      {mobileMenuOpen && (
        <div
          className={`md:hidden border-t px-6 py-6 space-y-4 ${
            activePage === "discord"
              ? "bg-[#0b0b0b] border-white/15 text-white"
              : "bg-[#fbfaf6] border-black/15 text-[#121814]"
          }`}
        >
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block font-riviera text-xs uppercase tracking-[0.25em] py-2 border-b ${
              activePage === "guide"
                ? "border-current opacity-100 font-medium"
                : activePage === "discord"
                ? "border-white/10 opacity-60"
                : "border-black/10 opacity-60"
            }`}
          >
            The Guide
          </Link>

          <Link
            href="/discord"
            onClick={() => setMobileMenuOpen(false)}
            className={`flex items-center gap-2 font-riviera text-xs uppercase tracking-[0.25em] py-2 border-b ${
              activePage === "discord"
                ? "border-current opacity-100 font-medium"
                : "border-black/10 opacity-60 hover:opacity-100 font-light"
            }`}
          >
            <DiscordLogo className="w-3.5 h-3.5 opacity-80" />
            <span>Creator Discord</span>
          </Link>

          <div className="pt-2">
            <a
              href={activePage === "guide" ? STRIPE_CHECKOUT_URL : "#enroll"}
              className={`rr-btn flex items-center justify-center gap-2 w-full py-3 text-center text-xs font-medium border ${
                activePage === "discord"
                  ? "border-white text-white hover:bg-white hover:text-black"
                  : "border-[#121814] text-[#121814] hover:bg-[#121814] hover:text-white"
              }`}
            >
              {activePage === "guide" ? (
                <>
                  <StripeLogo className="h-3 w-auto opacity-70" />
                  <span>Get The Guide — $19</span>
                </>
              ) : (
                <>
                  <DiscordLogo className="w-3.5 h-3.5" />
                  <span>Join Discord — $29</span>
                </>
              )}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
