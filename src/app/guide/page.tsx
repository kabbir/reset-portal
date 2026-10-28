"use client";

import React, { useState } from "react";
import Link from "next/image";
import NextLink from "next/link";
import { ChevronDown, ArrowLeft, FileText } from "lucide-react";
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
      a: "The Guide is a clean 112-page PDF. It looks sharp and reads easily on your iPad, iPhone, Android, Kindle, Mac, or PC. You can also print it out if you prefer reading and writing on paper. You receive an immediate download link right after checkout."
    },
    {
      q: "HOW DOES THE DAILY ROUTINE WORK?",
      a: "It takes less than 10 minutes a day: Read 1 Page in the morning, and Write 1 Page at night. In the morning, you read a single short lesson on focus, emotional control, or personal boundaries. At night before bed, you answer a quick prompt to review how you handled your day."
    },
    {
      q: "IS THERE ANY MOTIVATIONAL FLUFF OR CLICHÉS?",
      a: "None at all. No vague slogans, no academic jargon, and no filler. Every page gets straight to the point with practical ideas and honest reflections you can actually use that day."
    },
    {
      q: "WHAT IS THE REFUND POLICY?",
      a: "Because The Guide is an instant digital download, all sales are final. If you have any trouble downloading or opening the file on any device, message us anytime and our team will personally make sure you get your copy immediately."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-riviera overflow-x-clip selection:bg-[#121814] selection:text-white">
      {/* Top Navigation */}
      <Navbar activePage="guide" />

      {/* =========================================================================
         SUBPAGE HERO: CLEAN EDITORIAL INTRODUCTION
         ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-12 px-4 sm:px-8 max-w-5xl mx-auto text-left">
        <NextLink
          href="/"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-black/50 hover:text-black transition-colors mb-6 font-medium"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Overview</span>
        </NextLink>

        <span className="text-[11px] uppercase tracking-[0.35em] text-black/50 font-medium block mb-3">
          The Complete Architecture • 112 Pages
        </span>

        <h1 className="text-3xl sm:text-5xl font-light tracking-[0.14em] text-[#121814] uppercase leading-[1.15] mb-4">
          What&apos;s Inside The Guide
        </h1>

        <p className="text-sm sm:text-base text-black/70 font-light leading-relaxed max-w-2xl tracking-[0.02em] mb-8">
          A full breakdown of the 47 mental frameworks, facing audit pages, and the 10-minute daily routine designed for emotional control and calm focus.
        </p>

        {/* Quick Purchase Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-black/15">
          <a
            href={STRIPE_CHECKOUT_URL}
            className="rr-btn inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
          >
            <StripeLogo className="h-3.5 w-auto opacity-80" />
            <span>Get The Guide — $19</span>
          </a>

          <div className="flex items-center gap-4 text-[10px] text-black/50 uppercase tracking-[0.2em] font-medium">
            <span>Instant PDF Download</span>
            <span>·</span>
            <span>All Devices Supported</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 1: DAILY ROUTINE — READ 1 PAGE. WRITE 1 PAGE.
         Unified heading and content, zero disjointed lines
         ========================================================================= */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto border-t border-black/15">
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block mb-2 font-medium">
            The Daily Practice
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814] mb-2">
            Read 1 Page. Write 1 Page.
          </h2>
          <p className="text-xs sm:text-sm text-black/60 font-light leading-relaxed max-w-xl tracking-[0.01em]">
            Takes less than 10 minutes a day to keep your focus sharp and your mind calm:
          </p>
        </div>

        {/* 3 Steps in Clean Architectural Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="border border-black/15 p-6 bg-white/60 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-2">
                01 • Morning
              </div>
              <h3 className="text-base font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Read 1 Page
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                Start your morning with one clear lesson on patience, focus, or personal boundaries before checking your phone or dealing with other people.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 text-[10px] uppercase tracking-[0.2em] text-black/40">
              Under 4 minutes
            </div>
          </div>

          <div className="border border-black/15 p-6 bg-white/60 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-2">
                02 • Afternoon
              </div>
              <h3 className="text-base font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Put It Into Practice
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                Use what you read during tough meetings, stressful moments, or difficult conversations throughout your day.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 text-[10px] uppercase tracking-[0.2em] text-black/40">
              Throughout the day
            </div>
          </div>

          <div className="border border-black/15 p-6 bg-white/60 flex flex-col justify-between">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-2">
                03 • Night
              </div>
              <h3 className="text-base font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Write 1 Page
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                Answer the quick evening question in your journal, tablet, or phone. Take two minutes before sleeping to reflect on your day and see where you can improve.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-black/10 text-[10px] uppercase tracking-[0.2em] text-black/40">
              Under 3 minutes
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 2: COMPLETE 3-PART CURRICULUM
         Unified heading and content, zero disjointed lines
         ========================================================================= */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto border-t border-black/15">
        <div className="mb-8">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block mb-2 font-medium">
            Complete Curriculum
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814] mb-2">
            The 3 Core Modules
          </h2>
          <p className="text-xs sm:text-sm text-black/60 font-light leading-relaxed max-w-xl tracking-[0.01em]">
            47 practical lessons and prompts organized across 112 facing pages:
          </p>
        </div>

        {/* 3 Pillars - Clean Visual Hierarchy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* Pillar 01 */}
          <div className="border border-black/15 p-6 sm:p-8 bg-white/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-2 font-medium">
                Part 01 • 16 Lessons
              </span>
              <h3 className="text-lg font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Building Real Discipline
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em] mb-4">
                Practical steps to stop procrastinating, build solid morning habits, and keep your focus on what actually matters without getting distracted.
              </p>
            </div>
            <ul className="text-xs text-black/60 space-y-2 pt-4 border-t border-black/10 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>The 10-Second Delay Rule</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Eliminating Distraction Loops</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Daily Friction Reduction</span>
              </li>
            </ul>
          </div>

          {/* Pillar 02 */}
          <div className="border border-black/15 p-6 sm:p-8 bg-white/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-2 font-medium">
                Part 02 • 16 Lessons
              </span>
              <h3 className="text-lg font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Controlling Your Emotions
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em] mb-4">
                How to stay calm when people test your patience, stop reacting out of anger, and keep your cool in tense, uncomfortable situations.
              </p>
            </div>
            <ul className="text-xs text-black/60 space-y-2 pt-4 border-t border-black/10 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>De-escalating High-Stakes Arguments</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Mastering Inner Composure</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Detachment from Outside Judgments</span>
              </li>
            </ul>
          </div>

          {/* Pillar 03 */}
          <div className="border border-black/15 p-6 sm:p-8 bg-white/60 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-2 font-medium">
                Part 03 • 15 Prompts
              </span>
              <h3 className="text-lg font-medium uppercase tracking-[0.16em] text-[#121814] mb-3">
                Nightly Journaling
              </h3>
              <p className="text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em] mb-4">
                Simple, honest evening questions to help you review your actions before bed, fix bad habits, and wake up ready for the next day.
              </p>
            </div>
            <ul className="text-xs text-black/60 space-y-2 pt-4 border-t border-black/10 font-light">
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>2-Minute Nightly Self-Audits</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Pattern Recognition in Reactions</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1 h-1 bg-black/60" />
                <span>Clearing Mental Clutter Before Bed</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* =========================================================================
         SECTION 3: DEVICE COMPATIBILITY & TRUST BADGES
         ========================================================================= */}
      <section className="relative py-14 px-4 sm:px-8 max-w-5xl mx-auto border-t border-black/15">
        <div className="border border-black/15 p-8 sm:p-12 bg-white/70 text-center">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block mb-2 font-medium">
            Instant Digital Delivery
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814] mb-3">
            Read Anywhere, On Any Device
          </h2>
          <p className="text-xs sm:text-sm text-black/65 font-light max-w-xl mx-auto mb-8 leading-relaxed">
            Immediate access right after checkout. High-resolution PDF optimized for GoodNotes, Notability, Apple Books, Kindle, and print.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-[11px] text-black/70 uppercase tracking-[0.2em] font-medium mb-8">
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
              <span>Printable PDF (8.5x11)</span>
            </div>
          </div>

          <a
            href={STRIPE_CHECKOUT_URL}
            className="rr-btn inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
          >
            <StripeLogo className="h-3.5 w-auto opacity-80" />
            <span>Get The Guide — $19</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
         SECTION 4: FAQS
         ========================================================================= */}
      <section className="relative py-14 px-4 sm:px-8 max-w-4xl mx-auto border-t border-black/15">
        <div className="mb-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814] mb-1">
            Frequently Asked Questions
          </h2>
          <p className="text-xs uppercase tracking-[0.25em] text-black/50 font-light">
            Everything You Need To Know
          </p>
        </div>

        <div className="border-t border-black/15 divide-y divide-black/15">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#121814] hover:text-black/70 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/50 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-6 text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist Footer */}
      <footer className="w-full border-t border-black/15 py-10 px-4 sm:px-8 text-center text-xs text-black/50 bg-[#fbfaf6]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
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
            <NextLink href="/" className="hover:text-black transition-colors">
              Overview
            </NextLink>
            <NextLink href="/discord" className="hover:text-black transition-colors">
              Creator Discord ($29)
            </NextLink>
            <NextLink href="/refund-policy" className="hover:text-black transition-colors">
              Refund Policy
            </NextLink>
            <a href="mailto:support@ourlifereset.com" className="hover:text-black transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
