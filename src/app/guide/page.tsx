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
      q: "WHAT IS ACTUALLY INSIDE THE GUIDE?",
      a: "It is a complete collection of the best learnings from the most famous books, thinkers, and authors in history—all combined into one 112-page guide. From Marcus Aurelius, Seneca, and Carl Jung to Robert Greene, James Clear, and David Goggins, their core lessons are distilled into single pages and paired with direct questions that make you examine your own life."
    },
    {
      q: "HOW DOES THE DAILY ROUTINE WORK?",
      a: "It takes less than 10 minutes a day: Read 1 Page in the morning, and Write 1 Page at night. On the left page, you read a timeless lesson distilled from a famous book or thinker. On the facing right page, you answer an honest question that makes you look deep within yourself and spot what you need to change."
    },
    {
      q: "WHAT FORMAT DOES THE GUIDE COME IN?",
      a: "The Guide is a clean 112-page digital PDF. It is formatted to look sharp and read easily on your iPad, iPhone, Android, Kindle, Mac, or PC. You can also print it out if you prefer writing with pen and paper. You get an immediate download link right after checkout."
    }
  ];

  /* The 5 Diverse Real-Life Problems & Looking Deep Within */
  const struggles = [
    {
      num: "01",
      problem: "When you keep repeating the same mistakes and don't know why",
      explanation:
        "Most people go through years of life blaming bad luck, timing, or other people without ever seeing their own blind spots. By combining the sharpest lessons on human nature from thinkers like Carl Jung, Seneca, and Robert Greene, the guide holds up a mirror to your daily behavior—helping you finally see the patterns and faults within yourself that are holding you back."
    },
    {
      num: "02",
      problem: "When you keep putting things off and breaking promises to yourself",
      explanation:
        "You set goals in your head, but when the day comes, you take the easy route and go to bed with quiet guilt eating at your self-respect. Drawing from the best teachings on habits and human resistance—from James Clear and Steven Pressfield to David Goggins—the guide forces you to look at your own excuses on paper and change how you show up every day."
    },
    {
      num: "03",
      problem: "When you feel secretly behind or lost in your own life",
      explanation:
        "You look at people around you or online and feel like you are running out of time, chasing things you don't even care about just to keep up. Through the timeless writings of Marcus Aurelius, Emerson, and Thoreau, the guide makes you question what you are actually building, strip away fake ambitions, and fix the areas of your life that feel empty."
    },
    {
      num: "04",
      problem: "When you care too much about other people's opinions",
      explanation:
        "Saying yes when you want to say no, changing how you act to fit in, or letting someone else's disrespect ruin your peace. Combining the famous lessons of Epictetus, Schopenhauer, and Nietzsche, the guide makes you confront where you are giving your power away so you can build real self-respect from within."
    },
    {
      num: "05",
      problem: "When you read books or watch videos but never actually change",
      explanation:
        "You can read twenty books or save hundreds of advice videos and still stay the exact same person—because passive reading never forces you to look at yourself. Here, every famous lesson is paired with a facing reflection page that asks you the hard questions about your own life, turning wisdom from the greatest minds into real personal change."
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
          112 Pages · 47 Timeless Lessons & Self-Reflections
        </span>

        <h1 className="text-3xl sm:text-6xl font-light tracking-[0.14em] text-[#121814] uppercase leading-[1.12] mb-6">
          What&apos;s Inside The Guide
        </h1>

        <p className="text-base sm:text-lg text-black/75 font-light leading-relaxed max-w-2xl tracking-[0.01em] mb-10">
          The best combinations of the greatest books and famous life lessons from history&apos;s sharpest thinkers, authors, and minds—all brought together in one guide to make you look deep within, find the faults within yourself, and change the areas of your life holding you back.
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
            How It Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814] mb-4">
            Read 1 Page. Write 1 Page.
          </h2>
          <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed max-w-2xl">
            Instead of reading dozens of 300-page books and forgetting 90% of what you read, every spread gives you the core lesson from a legendary author or thinker on the left, and a direct mirror to examine your own life on the right.
          </p>
        </div>

        {/* 3 Steps in Clean, Open Editorial Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              01 · Left Page
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Read 1 Page
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              Absorb the core truth from one of the greatest books or minds in history—from Marcus Aurelius, Seneca, and Carl Jung to Robert Greene, James Clear, and David Goggins—distilled down to what actually matters.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              02 · Look Within
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Spot Your Faults
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              Let that lesson sit with you and challenge the way you live. Notice where your own ego, habits, or excuses are the real reason certain parts of your life aren&apos;t where they should be.
            </p>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] font-medium text-black/40 block">
              03 · Right Page
            </span>
            <h3 className="text-lg font-medium uppercase tracking-[0.14em] text-[#121814]">
              Write 1 Page
            </h3>
            <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed">
              Answer the direct prompt on the facing page. Be completely honest with yourself about your blind spots, admit where you are falling short, and write down what you are going to change.
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
            Why It Works
          </span>
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814] mb-4">
            A Mirror For Every Area Of Your Life
          </h2>
          <p className="text-sm sm:text-base text-black/65 font-light leading-relaxed max-w-2xl">
            Every chapter combines the wisdom of a great thinker or author with deep self-reflection—so no matter what problem you are facing right now, it helps you look within, see where you are going wrong, and fix it:
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

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-[#121814] hover:text-black/60 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/40 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-5 text-xs sm:text-sm text-black/70 font-light leading-relaxed">
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
