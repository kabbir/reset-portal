"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowLeft, FileText, Check } from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  StripeLogo,
  AppleLogo,
  KindleLogo,
  InstagramLogo
} from "@/components/BrandLogos";

const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

export default function GuideDetailPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "WHAT FORMAT DOES THE GUIDE COME IN?",
      a: "The Guide is a clean 112-page digital PDF. It is formatted to look sharp and read easily on your iPad, iPhone, Android, Kindle, Mac, or PC. You can also print it out if you prefer writing with pen and paper. You get an immediate download link right after checkout."
    },
    {
      q: "HOW DOES THE DAILY ROUTINE WORK?",
      a: "It takes less than 10 minutes a day: Read 1 Page in the morning, and Write 1 Page at night. In the morning, you read a single short thought on focus, boundaries, or calm composure. At night before bed, you answer a single honest question to review your day and clear your head."
    },
    {
      q: "IS THERE ANY FLUFF OR COMPLICATED JARGON?",
      a: "None at all. No vague slogans, no academic theories, and no filler. Every page gets straight to the point with honest, practical truths you can actually apply to your real life that day."
    }
  ];

  /* The 5 Diverse Real-Life Problems */
  const struggles = [
    {
      num: "01",
      problem: "When you feel secretly behind in life",
      explanation:
        "You look at peers or social media and get that quiet sinking panic that you're running out of time, even when things look fine on paper. The guide cuts straight through the comparison trap. It reminds you who you are actually building for, pulls your focus away from everyone else, and grounds you back in your own daily standard."
    },
    {
      num: "02",
      problem: "When you keep putting things off and breaking promises to yourself",
      explanation:
        "You make big plans in your head, but when the day comes, you avoid the hard work, scroll instead, and go to bed with that subtle guilt eating at your self-respect. The guide doesn't lecture or hype you up. The facing write-page forces you to look at your honest excuses without judgment, helping you rebuild self-trust one day at a time."
    },
    {
      num: "03",
      problem: "When someone tests your patience or pushes you to react",
      explanation:
        "An unexpected disagreement, an irritating remark, or someone disrespecting your boundary. Old habits make you react right away, say something you regret, or stay angry for hours. The guide gives you the quiet power of the pause—learning to stay silent, lower your voice, and stay in complete control while everyone else is losing theirs."
    },
    {
      num: "04",
      problem: "When your mind won't stop overthinking at night",
      explanation:
        "Replaying old conversations, worrying about what someone thought of you, or carrying the day's stress straight into bed. The evening prompts give you a place to dump the mental chaos. You get the thoughts out of your chest and onto paper, closing the open tabs in your brain so you can sleep peacefully."
    },
    {
      num: "05",
      problem: "When you care too much about being liked",
      explanation:
        "Saying yes to things you hate just to keep the peace, modifying your personality around different people, or worrying about looking foolish. The lessons give you the courage to be quietly misunderstood. You learn to speak with honesty, hold your boundaries, and build self-respect from within."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-riviera overflow-x-clip selection:bg-[#121814] selection:text-white">
      {/* Top Navigation */}
      <Navbar activePage="guide" />

      {/* =========================================================================
         1. HERO: SEAMLESS, AIRY EDITORIAL INTRODUCTION (ZERO BOXES)
         ========================================================================= */}
      <section className="relative pt-12 sm:pt-24 pb-16 px-4 sm:px-8 max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-black/40 hover:text-black transition-colors mb-8 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Main Page</span>
        </Link>

        <span className="text-[11px] uppercase tracking-[0.35em] text-black/50 font-medium block mb-4">
          112 Pages · 47 Lessons & Prompts
        </span>

        <h1 className="text-3xl sm:text-6xl font-light tracking-[0.14em] text-[#121814] uppercase leading-[1.12] mb-6">
          What&apos;s Inside The Guide
        </h1>

        <p className="text-base sm:text-lg text-black/75 font-light leading-relaxed max-w-2xl tracking-[0.01em] mb-10">
          A simple daily standard for keeping your mind calm, your focus clear, and your self-respect intact—no matter what life throws at you.
        </p>

        {/* Action Button & Instant Delivery Note */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-2">
          <a
            href={STRIPE_CHECKOUT_URL}
            className="rr-btn inline-flex items-center justify-center gap-2.5 px-9 py-4 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
          >
            <StripeLogo className="h-3.5 w-auto opacity-80" />
            <span>Get The Guide — $19</span>
          </a>

          <div className="flex items-center gap-3 text-[11px] text-black/50 uppercase tracking-[0.2em] font-light">
            <span>Instant PDF Download</span>
            <span>·</span>
            <span>All Devices</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. THE DAILY ROUTINE: PURE EDITORIAL FLOW (NO BOXES, NO HARD FRAMES)
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="mb-14">
          <span className="text-[11px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
            The Daily Routine
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814] mb-4">
            Read 1 Page. Write 1 Page.
          </h2>
          <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed max-w-xl">
            It takes under 10 minutes a day. Designed to act like a grounded friend who keeps you on the right path.
          </p>
        </div>

        {/* 3 Steps in Clean, Open Editorial Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              01 · Morning (Under 4 Min)
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Read 1 Page
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              Start your morning with a single lesson on patience, calm, or boundaries before you check notifications or deal with other people.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              02 · Daytime (In Your Head)
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Stay Grounded
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              When someone tests you, when stress hits, or when you feel tempted to react out of ego, you remember the lesson and take the pause.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              03 · Night (Under 3 Min)
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Write 1 Page
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              Answer the single question on the facing page. Review your day honestly, admit where you slipped, and close your day with a clear head.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. HOW THE GUIDE HELPS YOU TACKLE DIVERSE LIFE STRUGGLES
         Seamless, beautiful typographic rhythm without boxed cards
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="mb-16">
          <span className="text-[11px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
            Real Life Solutions
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814] mb-4">
            Built For What You Actually Go Through
          </h2>
          <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed max-w-2xl">
            Real life doesn&apos;t test you with abstract ideas. It tests you when you&apos;re tired, stressed, or secretly doubting yourself. Here is how the guide helps you through those exact moments:
          </p>
        </div>

        {/* Seamless Flowing Problem-Solution List (No Box Borders) */}
        <div className="space-y-14 sm:space-y-16">
          {struggles.map((item) => (
            <div key={item.num} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start">
              <div className="md:col-span-1">
                <span className="font-riviera text-xs text-black/30 font-medium tracking-[0.2em] block">
                  {item.num}
                </span>
              </div>
              <div className="md:col-span-4">
                <h3 className="text-base sm:text-lg font-medium uppercase tracking-[0.12em] text-[#121814] leading-snug">
                  {item.problem}
                </h3>
              </div>
              <div className="md:col-span-7">
                <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed">
                  {item.explanation}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. WHAT YOU RECEIVE & DEVICE COMPATIBILITY (SEAMLESS ELEGANCE)
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-4xl mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <span className="text-[11px] uppercase tracking-[0.35em] text-black/40 block font-medium">
            Digital Edition
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814]">
            Read On Any Device You Own
          </h2>
          <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed">
            Instant digital access delivered immediately after checkout. High-resolution PDF with clean typography, optimized for GoodNotes, Notability, Apple Books, Kindle, or paper printing.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] text-black/70 uppercase tracking-[0.2em] font-medium pt-4">
            <div className="flex items-center gap-2">
              <AppleLogo className="w-4 h-4 opacity-80" />
              <span>iPad & iPhone</span>
            </div>
            <div className="flex items-center gap-2">
              <KindleLogo className="w-4 h-4 opacity-80" />
              <span>Kindle & Android</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 opacity-80" />
              <span>Printable PDF</span>
            </div>
          </div>

          <div className="pt-6">
            <a
              href={STRIPE_CHECKOUT_URL}
              className="rr-btn inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
            >
              <StripeLogo className="h-3.5 w-auto opacity-80" />
              <span>Get The Guide — $19</span>
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. FAQS (CLEAN ACCORDION, MINIMAL DIVIDERS)
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="mb-10 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block mb-2 font-medium">
            Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814]">
            Common Questions
          </h2>
        </div>

        <div className="divide-y divide-black/10 border-t border-b border-black/10">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-[#121814] hover:text-black/60 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/40 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-6 text-xs sm:text-sm text-black/70 font-light leading-relaxed">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="w-full py-12 px-4 sm:px-8 text-center text-xs text-black/50 bg-[#fbfaf6]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium uppercase tracking-[0.25em] text-[#121814]">
              OurLife.Reset
            </span>
            <span>·</span>
            <span className="font-light uppercase tracking-[0.2em] text-black/40">
              The Self-Mastery Guide
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-light uppercase tracking-[0.2em]">
            <a
              href="https://instagram.com/ourlife.reset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <InstagramLogo className="w-3.5 h-3.5 opacity-70" />
              <span>@ourlife.reset</span>
            </a>
            <Link href="/" className="hover:text-black transition-colors">
              The Guide
            </Link>
            <Link href="/discord" className="hover:text-black transition-colors">
              Creator Discord
            </Link>
            <Link href="/refund-policy" className="hover:text-black transition-colors">
              Refund Policy
            </Link>
            <a href="mailto:support@ourlifereset.com" className="hover:text-black transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
