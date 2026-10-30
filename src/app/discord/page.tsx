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

  /* Mentorship Pillars - Authentic, Grounded, Why Mentorship > Figuring It Out Alone */
  const modules = [
    {
      num: "01",
      title: "Direct Eyes on Your Page Every Week",
      tagline: "Stop Guessing Why Your Videos Are Stuck",
      desc: "An online tool or a free YouTube tutorial can never look at your profile and tell you what you're doing wrong. When you try to figure this out alone, you can waste months making the same small mistake without realizing it. Inside the Discord, you drop your account link and your latest reels, and I personally tell you what looks off, why people are scrolling past, and what to fix immediately.",
      highlights: [
        "Personal reviews of your profile, hooks, layouts, and captions",
        "Real-time answers whenever you hit a wall or your views dip",
        "Skip months of blind trial and error by having someone check your work"
      ]
    },
    {
      num: "02",
      title: "The Psychology Behind Why People Repost",
      tagline: "Make Viewers Grow Your Page for You",
      desc: "Most beginners post whatever sounds good to them and wonder why their reels stay stuck at 200 views. People don't repost a video to help you out—they repost it to their story because it makes them look smart, self-aware, or ahead of the curve to their own friends. I'll show you how to consistently find and frame ideas that trigger that exact instinct so your audience shares your page every day.",
      highlights: [
        "How to spot quotes and angles that people want on their story",
        "Access to our private vault of proven, high-repost concepts",
        "Writing captions that make people save your post and check your bio"
      ]
    },
    {
      num: "03",
      title: "Clean Visuals Without Complicated Editing",
      tagline: "What Actually Makes People Stop Scrolling",
      desc: "If you search online, everyone tells you to learn complex editing software, add flashy transitions, and spend three hours on a ten-second clip. None of that is what makes a page grow. I'll hand you the exact clean typography, spacing, and subtle audio setup we use so your reels look sharp, hold attention to the end, and loop naturally.",
      highlights: [
        "The exact font sizing, margins, and pacing that keep people reading",
        "How to pair subtle background audio so viewers watch twice",
        "No cameras, no showing your face, and no exhausting editing timelines"
      ]
    },
    {
      num: "04",
      title: "A Batch System You Can Actually Stick To",
      tagline: "Stop Burning Out After Two Weeks",
      desc: "The real reason most people quit isn't lack of ambition—it's waking up every day stressed about what to post next. Trying to stitch together five different online tools by yourself gets messy fast. I'll walk you through our exact start-to-finish workflow so you can sit down for one afternoon and have weeks of content ready and scheduled.",
      highlights: [
        "Step-by-step walkthrough of how we build and schedule in batches",
        "How to organize your ideas so you never stare at a blank screen",
        "Keep your page growing steadily even when you're busy with life or work"
      ]
    },
    {
      num: "05",
      title: "Turning Your Views Into Real Income",
      tagline: "Build Something That Actually Pays You",
      desc: "Growing a page is great, but views alone don't pay your bills. Most creators have no idea how to turn attention into money without looking spammy. I'll help you build a real digital product your audience actually wants to buy, set up automatic comment DMs, and connect a clean Stripe checkout so your page brings in sales around the clock.",
      highlights: [
        "How to create a digital product your followers genuinely value",
        "Setting up automatic DMs that turn comments into buyers naturally",
        "Building a real brand and income stream that keeps growing long-term"
      ]
    }
  ];

  const faqs = [
    {
      q: "Why join this instead of just using free tutorials and online tools?",
      a: "Free videos and online tools give you scattered pieces of information, often from people contradicting each other. None of them look at your actual page, tell you why your last five posts flopped, or help you connect content to a real product that sells. Having direct guidance saves you months of guessing in the dark."
    },
    {
      q: "Do I have to show my face or already have a following?",
      a: "Not at all. OurLife.Reset was built completely faceless from zero. Whether you are starting a brand-new account today or trying to fix an existing page that has stalled, we walk you through every step."
    },
    {
      q: "What happens right after I join the Discord?",
      a: "You get an instant single-use invite link to enter the private server. Inside, you get immediate access to all step-by-step breakdowns, our quote and template vault, and the review channels where you can drop your page and talk directly with me and the community."
    },
    {
      q: "Can I cancel my membership whenever I want?",
      a: "Yes. There are no lock-ins or long contracts. You can cancel anytime with one click through your billing portal."
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
            PRIVATE CREATOR DISCORD · DIRECT MENTORSHIP
          </span>
        </div>

        {/* Main Headline */}
        <h1 className="font-riviera text-3xl sm:text-6xl md:text-7xl font-light uppercase tracking-[0.14em] leading-[1.12] text-white mb-6">
          STOP TRYING TO FIGURE IT ALL OUT ALONE.
          <span className="block font-light italic tracking-[0.12em] text-white/70 mt-3 text-2xl sm:text-4xl md:text-5xl">
            BUILD A PAGE THAT KEEPS GROWING AND PAYS YOU
          </span>
        </h1>

        {/* Subhead - Clean, Grounded, Real */}
        <p className="font-riviera text-sm sm:text-base text-white/65 max-w-2xl mx-auto font-light leading-relaxed tracking-wide mb-12">
          Anyone can find free tutorials and online tools—yet most people still quit after three weeks because a tool can&apos;t tell you what you&apos;re doing wrong. Inside our private Discord, I personally help you build your page, fix your content, and turn your views into real income from start to finish.
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
            <span>How We Build Together</span>
          </a>
        </div>

        {/* 3 Core Mentorship Advantage Pillars — Open Editorial Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 sm:gap-12 pt-4 text-left max-w-4xl mx-auto">
          <div>
            <div className="font-riviera text-sm sm:text-base uppercase tracking-[0.18em] text-white font-medium mb-2">
              Skip Blind Trial & Error
            </div>
            <p className="font-riviera text-xs text-white/50 font-light leading-relaxed">
              Stop wasting months testing random advice from strangers online. Get the exact working workflow handed to you on day one.
            </p>
          </div>

          <div>
            <div className="font-riviera text-sm sm:text-base uppercase tracking-[0.18em] text-white font-medium mb-2">
              Direct Eyes On Your Page
            </div>
            <p className="font-riviera text-xs text-white/50 font-light leading-relaxed">
              Online tools can&apos;t tell you why a video flopped. Here, you get real feedback on your hooks, visuals, and profile every single week.
            </p>
          </div>

          <div>
            <div className="font-riviera text-sm sm:text-base uppercase tracking-[0.18em] text-white font-medium mb-2">
              Built To Scale Long-Term
            </div>
            <p className="font-riviera text-xs text-white/50 font-light leading-relaxed">
              Don&apos;t just chase one lucky viral reel. Build a real audience and a digital product system that keeps growing month after month.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. REELS MONTAGE & HOOK: OVERWHELMED BY SOCIAL MEDIA NOISE?
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            WHY DOING IT ALONE FAILS
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.14em] text-white max-w-3xl mx-auto leading-tight">
            Do you constantly get these types of reels on your page, but they always leave you feeling overwhelmed?
          </h2>
          <p className="font-riviera text-xs sm:text-sm text-white/55 max-w-2xl mx-auto mt-4 font-light leading-relaxed tracking-wide">
            You save dozens of videos, bookmark new AI tools, and watch endless advice—yet when you sit down to build your own page, you still feel stuck. Free clips and software tools only give you tiny pieces of the puzzle and leave you to figure out the rest on your own.
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
            <span>See how we build this with you step by step</span>
            <span className="text-white/40">↓</span>
          </a>
        </div>
      </section>

      {/* =========================================================================
         3. MENTORSHIP MODULES (SEAMLESS OPEN EDITORIAL FLOW — NO LINES OR BOXES)
         ========================================================================= */}
      <section id="curriculum" className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="mb-16 sm:mb-20">
          <span className="font-riviera text-[11px] uppercase tracking-[0.35em] text-white/40 block mb-3 font-medium">
            DIRECT MENTORSHIP VS. ONLINE TOOLS
          </span>
          <h2 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.18em] text-white mb-4">
            WHY YOU GROW FASTER WHEN YOU DON&apos;T DO IT ALONE
          </h2>
          <p className="font-riviera text-sm sm:text-base text-white/55 max-w-2xl font-light leading-relaxed tracking-wide">
            When you try to figure everything out by yourself, every small mistake costs you weeks of wasted effort. Here is how we actually build your page and income stream together inside the Discord:
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
                Where are you starting from?
              </label>
              <select
                value={form.currentFollowers}
                onChange={(e) => setForm({ ...form, currentFollowers: e.target.value })}
                className="w-full px-4 py-3.5 text-xs rounded-none border border-white/15 bg-[#0a0a0a] text-white focus:border-white focus:outline-none transition-colors"
              >
                <option value="0 - 1k">Starting from scratch (0 - 1,000 followers)</option>
                <option value="1k - 5k">Early traction, trying to stay consistent</option>
                <option value="5k - 20k">Growing, ready to scale faster</option>
                <option value="20k+">Established page, ready to monetize properly</option>
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
                placeholder="Stop guessing with my content, grow consistently, or start making real income from my page?"
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
