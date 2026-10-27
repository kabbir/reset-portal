"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  Zap,
  TrendingUp,
  Cpu,
  Repeat,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageCircle,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function DiscordLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Quick Application Form State */
  const [form, setForm] = useState({
    name: "",
    email: "",
    handle: "",
    currentFollowers: "0 - 1k",
    niche: "",
    challenge: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.handle.trim()) {
      setErrorMsg("Please fill out your name, email, and Instagram handle.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const combinedReason = `[Followers: ${form.currentFollowers} | Niche: ${form.niche || "General"}] ${form.challenge || "Looking to scale to 30k"}`;
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          handle: form.handle,
          track: "creator_discord_30k",
          reason: combinedReason
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const d = await res.json();
        setErrorMsg(d.error || "Failed to submit. Please try again.");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* Curriculum Modules - Simple, Direct, Confident & Enthusiastic */
  const modules = [
    {
      num: "01",
      title: "How to Make Viral Reels that Actually Get Views",
      tagline: "The Secret to Stopping the Scroll",
      desc: "Most people spend hours editing videos only for them to get stuck at 200 views. I'll show you the exact visual formats, clean fonts, high-contrast layouts, and subtle audio that make people stop scrolling and watch your reels two or three times in a row. No expensive cameras, no studio setups, and no complicated editing required.",
      highlights: [
        "How to format your text so people can't look away",
        "The simple audio trick that triggers the algorithm to push your videos",
        "How to make reels loop seamlessly so your watch time skyrockets"
      ]
    },
    {
      num: "02",
      title: "Why People Share to Their Stories (The Repost Secret)",
      tagline: "How to Get Free Organic Reach Daily",
      desc: "Here's the honest truth: people don't share your reels to help you grow. They share them to show their friends who they are, what they believe, and how smart they are. Once you understand this simple psychology, getting hundreds of daily story shares becomes natural and predictable.",
      highlights: [
        "How to pick quotes and topics that people are proud to repost",
        "Writing 4-paragraph captions that get thousands of saves and shares",
        "The secret to turning casual viewers into loyal daily followers"
      ]
    },
    {
      num: "03",
      title: "Make a Month of Content in One Afternoon",
      tagline: "Never Stress About Posting Again",
      desc: "Stop staring at a blank screen wondering what to post today. I'll hand you the exact automated batch workflow we use to generate, format, and schedule weeks of high-definition reels in just a couple of hours. You set it up once, and your page runs consistently without burning you out.",
      highlights: [
        "Step-by-step walkthrough of our entire batch creation system",
        "How to store and organize your content so you never run out of ideas",
        "Multi-platform scheduling that posts for you on complete autopilot"
      ]
    },
    {
      num: "04",
      title: "Turn Your Views into Real Money with Auto DMs",
      tagline: "Make Money While You Sleep",
      desc: "Getting millions of views feels great, but views alone don't pay the bills. I'll show you how we set up simple, friendly automatic DMs that send interested people directly to your digital products, courses, or services the exact second they drop a comment on your post.",
      highlights: [
        "How to set up automatic keyword DMs that get an 80%+ open rate",
        "Creating simple digital products that people actually want to buy",
        "How to turn warm comments into immediate Stripe sales smoothly"
      ]
    },
    {
      num: "05",
      title: "Weekly Live Account Reviews with Kabbir",
      tagline: "You Don't Have to Do This Alone",
      desc: "Every week, you get direct access to me inside our private Discord. Drop your account link, show me your latest reels, and I will personally review what's working, what's holding your views back, and what exact tweaks to make so you can break through plateaus and scale to 30k+ fast.",
      highlights: [
        "Live 1-on-1 teardowns of your account, hooks, and captions",
        "Instant access to our private vault of 500+ proven viral quotes",
        "A private room of driven, supportive creators all winning together"
      ]
    }
  ];

  const faqs = [
    {
      q: "Do I need prior video editing experience?",
      a: "No. The entire system is designed so that anyone can follow our step-by-step blueprints and automated frameworks. You don't need complex software or high-end gear."
    },
    {
      q: "Do I have to show my face on camera?",
      a: "Not at all. OurLife.Reset was grown to over 30,000 followers and millions of monthly impressions completely faceless. We teach both faceless authority and personal brand scaling."
    },
    {
      q: "What happens after I join the Discord?",
      a: "You get immediate access to all 5 module breakdowns, our private swipe files, dedicated channels for feedback and account audits with Kabbir, and daily discussions with fellow operators."
    },
    {
      q: "Can I cancel my membership at any time?",
      a: "Yes. There are zero contracts or commitments. You can cancel your membership anytime with one click directly inside your billing portal."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#0a0a0a] text-white font-riviera overflow-x-clip selection:bg-white selection:text-black">
      {/* Top Navigation */}
      <Navbar activePage="discord" />

      {/* =========================================================================
         1. HERO SECTION: ROLLS-ROYCE OBSIDIAN LUXURY
         ========================================================================= */}
      <section className="relative pt-20 sm:pt-32 pb-16 px-4 sm:px-8 max-w-6xl mx-auto text-center">
        {/* Eyebrow Kicker */}
        <span className="font-riviera text-xs uppercase tracking-[0.35em] text-white/50 block mb-6 font-medium">
          AN EXCLUSIVE CREATOR MASTERMIND · BATCH CREATION & MONETIZATION
        </span>

        {/* Main Headline */}
        <h1 className="font-riviera text-3xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.16em] leading-[1.12] text-white mb-6">
          GROW FROM 0 TO 30K.
          <span className="block font-light italic tracking-[0.12em] text-white/70 mt-2">
            THE CREATOR ENGINE
          </span>
        </h1>

        {/* Subhead */}
        <p className="font-riviera text-sm sm:text-base text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide mb-12">
          The exact viral hook formulas, automated batch systems, audience psychology, and monetization funnels behind OurLife.Reset. Everything you need to scale a high-leverage brand from 0 to 30,000+ followers.
        </p>

        {/* Action Buttons - Sharp Geometry */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <a
            href="#enroll"
            className="rr-btn w-full sm:w-auto inline-flex items-center justify-center px-10 py-4 text-xs font-medium tracking-[0.25em] uppercase border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all duration-400"
          >
            <span>Join Mastermind — $29</span>
          </a>

          <a
            href="#curriculum"
            className="rr-btn w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-light tracking-[0.25em] uppercase border border-white/20 text-white/70 hover:border-white hover:text-white transition-all duration-400"
          >
            <span>The 5 Pillars</span>
          </a>
        </div>

        {/* Rolls-Royce 4-Metric Razor Grid (Divided by razor-thin lines, 0px radius, no boxes) */}
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-b border-white/15 my-12 text-left">
          <div className="py-8 px-6 border-r border-b md:border-b-0 border-white/15">
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              30,000+
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Organic Followers
            </div>
          </div>

          <div className="py-8 px-6 border-b md:border-b-0 md:border-r border-white/15">
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              10M+
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Monthly Impressions
            </div>
          </div>

          <div className="py-8 px-6 border-r border-white/15">
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              100%
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Automated Production
            </div>
          </div>

          <div className="py-8 px-6">
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              80%+
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Loop Retention Rate
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. CREATOR VIDEO MONTAGE - ARCHITECTURAL PRESENTATION
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto border-t border-white/15">
        <div className="text-center mb-10">
          <span className="font-riviera text-xs uppercase tracking-[0.3em] text-white/50 block mb-2 font-medium">
            THE PRODUCTION PIPELINE
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.18em] text-white">
            HOW WE BUILD & SCALE DAILY
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/50 max-w-xl mx-auto mt-2 font-light tracking-wide">
            A glimpse into our automated production timeline, consistency discipline, and audience retention metrics.
          </p>
        </div>

        {/* Video Player - Zero Radius, Sharp 1px Border */}
        <div className="relative max-w-3xl mx-auto border border-white/15 bg-black p-0 rounded-none overflow-hidden rr-image-zoom">
          <video
            src="/videos/creator_montage.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full aspect-video object-cover"
          />
        </div>
      </section>

      {/* =========================================================================
         3. CURRICULUM MODULES (ROLLS-ROYCE EDITORIAL ARCHITECTURE)
         ========================================================================= */}
      <section id="curriculum" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/15">
        <div className="text-center mb-16">
          <span className="font-riviera text-xs uppercase tracking-[0.35em] text-white/50 block mb-3 font-medium">
            CURRICULUM BREAKDOWN
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.2em] text-white">
            WHAT YOU MASTER INSIDE
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/50 max-w-xl mx-auto mt-3 font-light tracking-wide">
            No boring theory. No gatekeeping. Just the exact, real-world steps to build an audience that actually cares and turn your views into real money.
          </p>
        </div>

        {/* Modules Grid - Separated by Razor Thin Lines (No Cards, No Boxes) */}
        <div className="border-t border-b border-white/15 divide-y divide-white/15">
          {modules.map((mod) => (
            <div
              key={mod.num}
              className="grid grid-cols-1 md:grid-cols-12 py-12 sm:py-16 gap-8 items-start group"
            >
              {/* Left Column: Pillar Title & Narrative */}
              <div className="md:col-span-6 pr-0 md:pr-8">
                <span className="font-riviera text-xs uppercase tracking-[0.3em] text-white/40 font-medium block mb-3">
                  PILLAR {mod.num}
                </span>
                <h3 className="font-riviera text-xl sm:text-2xl font-light uppercase tracking-[0.14em] text-white mb-2 leading-snug">
                  {mod.title}
                </h3>
                <span className="font-riviera text-[11px] uppercase tracking-[0.2em] text-white/60 font-light block mb-4">
                  {mod.tagline}
                </span>
                <p className="font-riviera text-xs sm:text-sm text-white/50 leading-relaxed font-light">
                  {mod.desc}
                </p>
              </div>

              {/* Right Column: Architectural Deliverables */}
              <div className="md:col-span-6 border-t md:border-t-0 md:border-l border-white/15 pt-6 md:pt-0 md:pl-10">
                <span className="font-riviera text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-4 font-medium">
                  CORE DELIVERABLES:
                </span>
                <div className="space-y-4">
                  {mod.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 text-xs font-light text-white/80 tracking-wide leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. ENROLLMENT & APPLICATION ($29 PRICING) - ARCHITECTURAL MINIMALISM
         ========================================================================= */}
      <section id="enroll" className="relative py-20 px-4 sm:px-8 max-w-6xl mx-auto border-t border-white/15">
        <div className="text-center mb-14">
          <span className="font-riviera text-xs uppercase tracking-[0.35em] text-white/50 block mb-3 font-medium">
            LIMITED COHORT ACCESS
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.2em] text-white">
            JOIN THE PRIVATE DISCORD
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/50 max-w-xl mx-auto mt-2 font-light tracking-wide">
            Direct access to Kabbir, live weekly account audits, our private viral swipe file, and automated batch frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: What's Included & $29 Pricing */}
          <div className="border border-white/15 bg-black p-8 sm:p-12 rounded-none">
            <span className="font-riviera text-xs uppercase tracking-[0.3em] text-white/40 block mb-2 font-medium">
              THE COMPLETE PACKAGE
            </span>
            <h3 className="font-riviera text-2xl font-light uppercase tracking-[0.16em] text-white mb-4">
              0 TO 30K MASTERMIND
            </h3>
            <p className="font-riviera text-xs text-white/60 leading-relaxed font-light mb-8">
              Full private Discord server access, complete 5-module curriculum, batch automation workflows, and weekly live account breakdowns.
            </p>

            {/* Inclusions List */}
            <div className="space-y-3 pt-6 border-t border-white/15 mb-8 font-riviera text-xs text-white/80 font-light">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>Private Discord channels with direct access to Kabbir</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>All 5 tactical creator modules from 0 to 30k</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>Our complete automated batch production workflows</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>Curated 500+ viral quote and hook swipe vault</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>Bi-weekly live account audits & script teardowns</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 bg-white/60 shrink-0 mt-1.5 rounded-none" />
                <span>DM automation templates that turn comments into sales</span>
              </div>
            </div>

            {/* Price Box - Razor Lines, No Curves */}
            <div className="border-t border-b border-white/15 py-6 text-center">
              <span className="font-riviera text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-1 font-medium">
                MEMBERSHIP ENTRY
              </span>
              <div className="font-riviera text-4xl sm:text-5xl font-light tracking-[0.05em] text-white mb-2">
                $29 <span className="text-xs uppercase tracking-[0.2em] text-white/40">/ month</span>
              </div>
              <p className="font-riviera text-[11px] text-white/50 font-light tracking-wide">
                Cancel anytime with 1 click · Instant access upon approval
              </p>
            </div>
          </div>

          {/* Right: Quick Join / Application Form */}
          <div className="border border-white/15 bg-[#0e0e0e] p-8 sm:p-12 rounded-none">
            <span className="font-riviera text-xs uppercase tracking-[0.3em] text-white/40 block mb-2 font-medium">
              DIRECT APPLICATION
            </span>
            <h3 className="font-riviera text-xl sm:text-2xl font-light uppercase tracking-[0.16em] text-white mb-2">
              REQUEST COHORT ACCESS
            </h3>
            <p className="font-riviera text-xs text-white/50 mb-8 font-light leading-relaxed">
              Enter your handle and details below. We review accounts to ensure you&apos;re serious about building.
            </p>

            {submitted ? (
              <div className="p-8 border border-white/20 bg-black text-center space-y-3">
                <span className="w-2 h-2 bg-emerald-400 block mx-auto rounded-none" />
                <h4 className="font-riviera text-sm uppercase tracking-[0.2em] text-white font-medium">
                  Application Received
                </h4>
                <p className="font-riviera text-xs text-white/60 leading-relaxed font-light">
                  We have queued your account review. You will receive an invite link directly to your email and Instagram handle within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMsg && (
                  <div className="p-3 border border-red-500/40 bg-red-950/20 text-xs text-red-300 font-light">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-1.5 font-medium">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-none border border-white/20 bg-black/60 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    placeholder="Alex Bennett"
                  />
                </div>

                <div>
                  <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-1.5 font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-none border border-white/20 bg-black/60 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-1.5 font-medium">
                    Instagram Handle
                  </label>
                  <input
                    type="text"
                    required
                    value={form.handle}
                    onChange={(e) => setForm({ ...form, handle: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-none border border-white/20 bg-black/60 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    placeholder="@yourhandle"
                  />
                </div>

                <div>
                  <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-1.5 font-medium">
                    Current Followers
                  </label>
                  <select
                    value={form.currentFollowers}
                    onChange={(e) => setForm({ ...form, currentFollowers: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-none border border-white/20 bg-black text-white focus:border-white focus:outline-none transition-colors"
                  >
                    <option value="0 - 1k">0 - 1,000 (Just starting)</option>
                    <option value="1k - 5k">1,000 - 5,000 (Early traction)</option>
                    <option value="5k - 20k">5,000 - 20,000 (Scaling phase)</option>
                    <option value="20k+">20,000+ (Looking to automate & monetize)</option>
                  </select>
                </div>

                <div>
                  <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-1.5 font-medium">
                    Primary Bottleneck / Goal
                  </label>
                  <textarea
                    rows={2}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className="w-full px-4 py-3 text-xs rounded-none border border-white/20 bg-black/60 text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                    placeholder="What is holding your page back right now?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="rr-btn w-full py-4 text-xs uppercase tracking-[0.25em] font-medium border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all cursor-pointer"
                >
                  <span>
                    {submitting ? "Submitting Application..." : "Apply For Discord Entry — $29"}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. FAQS - RAZOR ACCORDION
         ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-8 max-w-4xl mx-auto border-t border-white/15">
        <div className="text-center mb-12">
          <span className="font-riviera text-xs uppercase tracking-[0.35em] text-white/50 block mb-3 font-medium">
            CLARIFICATIONS
          </span>
          <h2 className="font-riviera text-2xl sm:text-3xl font-light uppercase tracking-[0.2em] text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="border-t border-b border-white/15 divide-y divide-white/15">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 font-riviera font-light text-xs sm:text-sm uppercase tracking-[0.18em] text-white hover:text-white/70 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-sm font-light text-white/50">
                  {openFaq === idx ? "—" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="pb-6 font-riviera text-xs text-white/60 leading-relaxed font-light tracking-wide">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         6. FOOTER - MINIMALIST EDITORIAL
         ========================================================================= */}
      <footer className="w-full border-t border-white/15 py-12 px-4 sm:px-8 text-center text-xs text-white/40 bg-black font-riviera">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium uppercase tracking-[0.25em] text-white">OurLife.Reset</span>
            <span>·</span>
            <span className="font-light uppercase tracking-[0.2em] text-white/50">Creator Mastermind</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-light uppercase tracking-[0.2em]">
            <Link href="/" className="hover:text-white transition-colors">
              The Self-Mastery Guide ($19)
            </Link>
            <Link href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </Link>
            <a href="mailto:support@ourlifereset.com" className="hover:text-white transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
