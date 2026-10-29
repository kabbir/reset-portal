"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  DiscordLogo,
  StripeLogo,
  InstagramLogo
} from "@/components/BrandLogos";

export default function DiscordLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Discord Claim & Checkout Form State */
  const [form, setForm] = useState({
    name: "",
    email: "",
    handle: "",
    currentFollowers: "0 - 1k",
    challenge: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setErrorMsg("Please fill out your name and email.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/claim-discord", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          handle: form.handle,
          currentFollowers: form.currentFollowers,
          challenge: form.challenge
        })
      });

      const data = await res.json();
      if (res.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setErrorMsg(data.error || "Unable to initiate checkout. Please try again.");
        setSubmitting(false);
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
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
      title: "Weekly Live Account Reviews with Me",
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
      a: "No. The entire system is built so that anyone can follow our step-by-step templates and automated workflows. You don't need complex software or high-end gear."
    },
    {
      q: "Do I have to show my face on camera?",
      a: "Not at all. OurLife.Reset was grown to over 30,000 followers and millions of monthly impressions completely faceless. We teach both faceless page growth and personal brand scaling."
    },
    {
      q: "What happens after I join the Discord?",
      a: "You get immediate access to all 5 video modules, our private quote vault, dedicated feedback channels for weekly account reviews with me, and daily discussions with fellow creators."
    },
    {
      q: "Can I cancel my membership at any time?",
      a: "Yes. There are zero contracts or lock-ins. You can cancel your membership anytime with one click directly inside your billing portal."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#0a0a0a] text-white font-riviera overflow-x-clip selection:bg-white selection:text-black">
      {/* Top Navigation */}
      <Navbar activePage="discord" />

      {/* =========================================================================
         1. HERO SECTION: SEAMLESS OPEN EDITORIAL LUXURY (ZERO BOXES OR GRID LINES)
         ========================================================================= */}
      <section className="relative pt-20 sm:pt-32 pb-16 px-4 sm:px-8 max-w-5xl mx-auto text-center">
        {/* Eyebrow Kicker with Official Discord Mark (No Box Frame) */}
        <div className="inline-flex items-center justify-center gap-2 mb-6 text-white/60">
          <DiscordLogo className="w-4 h-4 opacity-80" />
          <span className="font-riviera text-[11px] uppercase tracking-[0.3em] font-medium text-white/60">
            PRIVATE CREATOR COMMUNITY · CONTENT & MONETIZATION
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-riviera text-3xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.16em] leading-[1.12] text-white mb-6">
          GROW FROM 0 TO 30K.
          <span className="block font-light italic tracking-[0.12em] text-white/70 mt-2">
            THE 30K BLUEPRINT
          </span>
        </h1>

        {/* Subhead - Clean, Grounded, Real */}
        <p className="font-riviera text-sm sm:text-base text-white/60 max-w-2xl mx-auto font-light leading-relaxed tracking-wide mb-12">
          The exact hook formulas, video formats, batch creation setup, and monetization steps behind OurLife.Reset. Everything you need to grow your account to 30,000+ followers and make real income.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#enroll"
            className="rr-btn w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 py-4 text-xs font-medium tracking-[0.25em] uppercase border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all duration-400"
          >
            <DiscordLogo className="w-4 h-4" />
            <span>Claim Discord Access — $29</span>
          </a>

          <a
            href="#curriculum"
            className="rr-btn w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 text-xs font-light tracking-[0.25em] uppercase border border-white/20 text-white/70 hover:border-white hover:text-white transition-all duration-400"
          >
            <span>What You Learn</span>
          </a>
        </div>

        {/* Seamless 4-Metric Open Row — Zero Grid Lines or Boxes */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 pt-4 text-center">
          <div>
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              30,000+
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Organic Followers
            </div>
          </div>

          <div>
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              10M+
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Monthly Impressions
            </div>
          </div>

          <div>
            <div className="font-riviera text-3xl sm:text-4xl font-light tracking-[0.08em] text-white">
              100%
            </div>
            <div className="font-riviera text-[11px] uppercase tracking-[0.25em] text-white/40 mt-2 font-light">
              Automated Production
            </div>
          </div>

          <div>
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
         2. REELS MONTAGE & HOOK: OVERWHELMED BY SOCIAL MEDIA NOISE?
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            THE SOCIAL MEDIA TRAP
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.14em] text-white max-w-3xl mx-auto leading-tight">
            Do you constantly get these types of reels on your page, but they always leave you feeling overwhelmed?
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/50 max-w-2xl mx-auto mt-4 font-light leading-relaxed tracking-wide">
            Your feed is flooded with aesthetic videos, cinematic footage, and endless advice — but none of them show you the actual structure behind the growth. Inside our private Discord, we cut out the noise with a clear, step-by-step system: clean layouts, repeatable batching, and monetization.
          </p>
        </div>

        {/* Vertical Reel Video Montage (Frameless, Seamless) */}
        <div className="relative max-w-[320px] sm:max-w-[360px] mx-auto bg-black overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)]">
          {/* Video Player (9:16 Vertical Reel Ratio - Continuous Autoplay) */}
          <div className="relative aspect-[9/16] w-full bg-black">
            <video
              src="/overwhelmed-montage.mp4"
              poster="/overwhelmed-montage-poster.jpg"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover pointer-events-none"
            />

            {/* Big Floating White Center Blob */}
            <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-5 pointer-events-none z-10">
              <div className="bg-white text-black px-5 py-5 sm:px-6 sm:py-6 rounded-[28px] sm:rounded-[36px] shadow-[0_25px_60px_rgba(0,0,0,0.9)] text-center max-w-[270px] sm:max-w-[290px]">
                <p className="font-riviera font-black text-xs sm:text-[13px] uppercase tracking-wider leading-[1.38] text-black">
                  SO MUCH INFO AVAILABLE TODAY BUT NONE OF THESE GUYS PERSONALLY HELP YOU BUILD ANY OF IT FROM START TO FINISH
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Callout below video */}
        <div className="mt-10 text-center">
          <a
            href="#curriculum"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/55 hover:text-white transition-colors"
          >
            <span>See how we turn this into a simple 5-step blueprint</span>
            <span className="text-white/40">↓</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
         3. CURRICULUM MODULES (SEAMLESS OPEN EDITORIAL FLOW — NO LINES OR BOXES)
         ========================================================================= */}
      <section id="curriculum" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            COURSE BREAKDOWN
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.18em] text-white mb-4">
            WHAT YOU LEARN INSIDE
          </h2>
          <p className="font-riviera text-sm sm:text-base text-white/55 max-w-2xl font-light leading-relaxed tracking-wide">
            No boring theory. No gatekeeping. Just the exact, real-world steps to build an audience that actually cares and turn your views into real money.
          </p>
        </div>

        {/* Seamless Flowing Modules List — Zero Divider Lines, Zero Box Borders */}
        <div className="space-y-16 sm:space-y-24">
          {modules.map((mod) => (
            <div
              key={mod.num}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start"
            >
              {/* Left Column: Module Title & Narrative */}
              <div className="md:col-span-6">
                <span className="font-riviera text-xs uppercase tracking-[0.3em] text-white/35 font-medium block mb-3">
                  PART {mod.num}
                </span>
                <h3 className="font-riviera text-xl sm:text-2xl font-light uppercase tracking-[0.14em] text-white mb-2 leading-snug">
                  {mod.title}
                </h3>
                <span className="font-riviera text-[11px] uppercase tracking-[0.2em] text-white/55 font-light block mb-4">
                  {mod.tagline}
                </span>
                <p className="font-riviera text-xs sm:text-sm text-white/55 leading-relaxed font-light">
                  {mod.desc}
                </p>
              </div>

              {/* Right Column: Deliverables (Open Layout, No Border Lines) */}
              <div className="md:col-span-6 md:pt-7">
                <span className="font-riviera text-[10px] uppercase tracking-[0.3em] text-white/35 block mb-4 font-medium">
                  WHAT YOU GET
                </span>
                <div className="space-y-4">
                  {mod.highlights.map((h, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3.5 text-xs sm:text-sm font-light text-white/80 tracking-wide leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 bg-white/50 shrink-0 mt-2 rounded-none" />
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
         4. ENROLLMENT ($29 PRICING) — SEAMLESS OPEN FORM (NO OUTER BOX FRAME)
         ========================================================================= */}
      <section id="enroll" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            INSTANT MEMBERSHIP
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.18em] text-white mb-3">
            CLAIM DISCORD ACCESS
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/55 max-w-xl mx-auto font-light leading-relaxed tracking-wide">
            Direct access to me, live weekly account reviews, our private viral quote vault, and simple batch creation templates.
          </p>
        </div>

        {/* Seamless Open Enrollment Flow — No Box Border */}
        <div>
          <div className="flex items-baseline justify-between mb-10">
            <div>
              <span className="font-riviera text-[10px] uppercase tracking-[0.3em] text-white/40 block mb-1 font-medium">
                MONTHLY MEMBERSHIP
              </span>
              <div className="font-riviera text-3xl sm:text-4xl font-light text-white">
                $29 <span className="text-xs uppercase tracking-[0.2em] text-white/40">/ month</span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-riviera text-[11px] uppercase tracking-[0.2em] text-white/60 block font-light">
                Cancel Anytime
              </span>
              <div className="flex items-center gap-1.5 justify-end mt-1 text-[10px] text-white/40">
                <StripeLogo className="h-2.5 w-auto opacity-70" />
                <span>Secured by Stripe</span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {errorMsg && (
              <div className="p-3 bg-red-950/30 text-xs text-red-300 font-light">
                {errorMsg}
              </div>
            )}

            <div>
              <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-2 font-medium">
                Full Name
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-white/[0.03] text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="Alex Bennett"
              />
            </div>

            <div>
              <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-2 font-medium">
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-white/[0.03] text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="alex@example.com"
              />
            </div>

            <div>
              <div className="flex items-center gap-1.5 mb-2">
                <InstagramLogo className="w-3 h-3 opacity-60" />
                <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 font-medium">
                  Instagram Handle <span className="text-white/40 normal-case tracking-normal">(Optional)</span>
                </label>
              </div>
              <input
                type="text"
                value={form.handle}
                onChange={(e) => setForm({ ...form, handle: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-white/[0.03] text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="@yourhandle"
              />
            </div>

            <div>
              <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-2 font-medium">
                Current Followers
              </label>
              <select
                value={form.currentFollowers}
                onChange={(e) => setForm({ ...form, currentFollowers: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-[#0a0a0a] text-white focus:border-white focus:outline-none transition-colors"
              >
                <option value="0 - 1k">0 - 1,000 (Just starting)</option>
                <option value="1k - 5k">1,000 - 5,000 (Early traction)</option>
                <option value="5k - 20k">5,000 - 20,000 (Scaling phase)</option>
                <option value="20k+">20,000+ (Looking to automate & monetize)</option>
              </select>
            </div>

            <div>
              <label className="font-riviera text-[10px] uppercase tracking-[0.25em] text-white/60 block mb-2 font-medium">
                What is your main goal right now?
              </label>
              <textarea
                rows={2}
                value={form.challenge}
                onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-white/[0.03] text-white placeholder-white/30 focus:border-white focus:outline-none transition-colors"
                placeholder="Scale to 30k, automate daily reels, or monetize views?"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="rr-btn flex items-center justify-center gap-2.5 w-full py-4 text-xs uppercase tracking-[0.25em] font-medium border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all cursor-pointer mt-2"
            >
              <DiscordLogo className="w-3.5 h-3.5" />
              <span>
                {submitting ? "Redirecting to Checkout..." : "Claim Discord Access — $29/mo"}
              </span>
            </button>

            <div className="flex items-center justify-center gap-2 pt-2 text-[10px] uppercase tracking-[0.2em] text-white/40">
              <StripeLogo className="h-2.5 w-auto opacity-70" />
              <span>Secured by Stripe · Instant Access · Cancel Anytime</span>
            </div>
          </form>
        </div>
      </section>

      {/* =========================================================================
         5. FAQS - SEAMLESS OPEN ACCORDION (NO LINES)
         ========================================================================= */}
      <section className="relative py-20 sm:py-24 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            QUESTIONS
          </span>
          <h2 className="font-riviera text-2xl sm:text-3xl font-light uppercase tracking-[0.2em] text-white">
            FREQUENTLY ASKED QUESTIONS
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 text-left flex items-center justify-between gap-4 font-riviera font-light text-xs sm:text-sm uppercase tracking-[0.18em] text-white hover:text-white/70 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <span className="text-sm font-light text-white/50">
                  {openFaq === idx ? "—" : "+"}
                </span>
              </button>
              {openFaq === idx && (
                <div className="pb-5 font-riviera text-xs sm:text-sm text-white/60 leading-relaxed font-light tracking-wide">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         6. FOOTER - SEAMLESS EDITORIAL FOOTER (NO TOP BORDER LINE)
         ========================================================================= */}
      <footer className="w-full py-12 px-4 sm:px-8 text-center text-xs text-white/40 bg-[#0a0a0a] font-riviera">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium uppercase tracking-[0.25em] text-white">OurLife.Reset</span>
            <span>·</span>
            <span className="font-light uppercase tracking-[0.2em] text-white/50">Creator Discord</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-[11px] font-light uppercase tracking-[0.2em]">
            <a
              href="https://instagram.com/ourlife.reset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <InstagramLogo className="w-3.5 h-3.5 opacity-70" />
              <span>@ourlife.reset</span>
            </a>
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
