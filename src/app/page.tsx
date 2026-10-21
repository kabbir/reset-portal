"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Check,
  Star,
  Eye,
  ChevronDown,
  MessageSquarePlus,
  Send,
  X,
  CheckCircle2,
  Sparkles,
  Shield,
  Smartphone,
  Flame,
  Moon,
  Clock,
  Compass
} from "lucide-react";

/* --- Live Stripe Checkout Link --- */
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

interface ReviewItem {
  id: string;
  name: string;
  role?: string;
  date: string;
  rating: number;
  highlight?: string;
  comment: string;
}

export default function HomePage() {
  const [activeSpreadTab, setActiveSpreadTab] = useState<number>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [submittingReview, setSubmittingReview] = useState<boolean>(false);
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]);
  const [activeComparisonView, setActiveComparisonView] = useState<"both" | "scrolling" | "audit">("both");
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: ""
  });

  /* Fetch live reviews */
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await fetch("/api/reviews");
        if (res.ok) {
          const data = await res.json();
          setReviewsList(data);
        }
      } catch (err) {
        console.error("Could not load reviews:", err);
      }
    }
    loadReviews();
  }, []);

  const handleTriggerCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;

    setSubmittingReview(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newReview)
      });

      if (res.ok) {
        const result = await res.json();
        setReviewsList((prev) => [result.review, ...prev]);
        setReviewSubmitted(true);
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewSubmitted(false);
          setNewReview({ name: "", role: "", rating: 5, comment: "" });
        }, 2000);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmittingReview(false);
    }
  };

  /* Interactive PDF Spreads Data */
  const spreads = [
    {
      title: "The Reset Principle",
      image: "/manifesto-spread-preview.png",
      tag: "Foundations",
      description:
        "The opening law: why watching short-form motivation gives you a temporary spike that leaves you exhausted, and how writing for 10 minutes creates real composure.",
      points: [
        "Why passive motivation never changes how you act under stress",
        "The 4 private rules of daily self-command",
        "How to build quiet discipline without broadcasting it to anyone"
      ]
    },
    {
      title: "Strategic Restraint",
      image: "/greene-spread-preview.png",
      tag: "Composure",
      description:
        "Field rules for remaining completely unbothered when someone tests your patience. Learn why staying silent and lowering your voice wins every time.",
      points: [
        "The 3-second delay before responding to disrespect or criticism",
        "How to say no cleanly without guilt, apology, or over-explaining",
        "Daily ledgers to audit the exact moments you lost composure"
      ]
    },
    {
      title: "Evening Accountability",
      image: "/watts-spread-preview.png",
      tag: "Night Ritual",
      description:
        "The evening ledger. Every night before sleep, answer 3 honest questions to hold yourself accountable for your focus, boundaries, and reactions.",
      points: [
        "Confront the excuses you made during the day without sugarcoating",
        "Audit where your attention slipped and what triggered the slip",
        "Ruled lines formatted to type on your phone or write in a notebook"
      ]
    },
    {
      title: "The Daily Habit Audit",
      image: "/book-spread-preview.png",
      tag: "Daily Practice",
      description:
        "The two-page daily practice: read 1 page of principles in the morning, complete 1 page of honest self-inquiry before bed.",
      points: [
        "10 minutes a day: read 1 page in the morning, write 1 page at night",
        "Fillable interactive text fields on iPhone, iPad, and Android",
        "Generous print margins if you prefer using a physical notebook"
      ]
    }
  ];

  /* The 4 Core Struggles (Grounded, Concrete Human Scenarios) */
  const struggles = [
    {
      icon: Clock,
      trigger: "If you procrastinate and make excuses:",
      solution: "Daily guided prompts that force you to write down your own rationalizations and take real action today."
    },
    {
      icon: Shield,
      trigger: "If you get guilt-tripped or manipulated:",
      solution: "Read hidden motives beneath polite smiles and learn to say no without guilt, apology, or over-explaining."
    },
    {
      icon: Flame,
      trigger: "If you lose your temper and regret it:",
      solution: "Practice the 3-second pause to remain completely silent and unbothered when someone tries to provoke you."
    },
    {
      icon: Moon,
      trigger: "If you overthink and seek approval:",
      solution: "Stop explaining yourself to people, drop people-pleasing, and protect your private peace."
    }
  ];

  /* FAQs */
  const faqs = [
    {
      q: "I already watch a lot of philosophy and self-improvement videos. Will this actually teach me anything new?",
      a: "Watching videos gives you an intellectual dopamine high for thirty seconds, but your composure still dissolves the moment someone baits you or a deadline gets tense. We built this guide to break that loop. Every single chapter pairs a short psychological principle on the left with an honest written audit on the right. You don't just read about calmness; you write down who tested you, why your ego reacted, and what you will do differently next time."
    },
    {
      q: "How much time does this actually take each day? I already have an exhausting schedule.",
      a: "Ten minutes. This is deliberately not a 300-page academic book you need hours to read. Each chapter is designed as a single two-page checkpoint. You spend three minutes absorbing the principle in the morning, and seven minutes filling out the reflection prompt before you sleep. Doing that once a day creates more real behavioral change than binge-reading five books you'll forget by next month."
    },
    {
      q: "Can I use this directly on my phone, or do I need to print it out?",
      a: "Both. The guide is custom-formatted for mobile devices. It opens natively in Apple Books, Files, Google Drive, or GoodNotes on your iPhone or Android, and includes fillable interactive text fields so you can type your daily audits directly in bed. If you prefer physical writing, the PDF is designed with generous margins so you can print it or mirror the prompts into your personal notebook."
    },
    {
      q: "Is this just another generic motivational guide with feel-good affirmations?",
      a: "No. There are no vision boards, morning mantras, or toxic positivity here. In fact, if you want something that comforts your excuses, you will dislike this book. The prompts are deliberately uncomfortable. They force you to examine where your 'politeness' was really just fear of confrontation, where you envied a peer's progress, and where you broke promises to yourself. It is a tool for self-command, not comfort."
    },
    {
      q: "What is the Founder's Guarantee regarding the upcoming Life Reset App?",
      a: "Our team is currently finishing private testing on The Life Reset mobile app. Because we believe in rewarding our early core readers, every person who claims The Self-Mastery Guide today for $19 receives automatic VIP status and a full $19 credit toward lifetime access to the app when public registration opens. You get the workbook today, and your entire purchase is credited forward."
    },
    {
      q: "What happens immediately after checkout?",
      a: "The moment Stripe completes your payment, your screen redirects instantly to a private download page with a single-tap download button. We also email a permanent backup access link to your inbox at the exact same second, so you'll always have access to your file across all your devices with no recurring fees or subscriptions."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#06080b] text-[#f8fafc] overflow-x-clip selection:bg-[#38bdf8] selection:text-black">
      {/* Clipped Dynamic Ambient Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="reflect-ambient-glow" />
        <div className="opal-secondary-glow" />
        <div className="opal-tertiary-glow" />
      </div>

      {/* Floating Navigation Bar (Strictly Single Line, Zero Wrapping) */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav className="reflect-nav-blur pointer-events-auto px-4 py-2 sm:px-6 sm:py-2.5 flex items-center justify-between gap-4 w-full max-w-[880px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-[11px] sm:text-xs tracking-tighter">
              R
            </div>
            <span className="text-[13px] font-bold tracking-wider text-white group-hover:text-[#38bdf8] transition-colors whitespace-nowrap">
              @ourlife.reset
            </span>
          </a>

          {/* Links — Distinct, Concise, Single Line */}
          <div className="hidden md:flex items-center gap-5 lg:gap-7 text-[13px] font-medium text-zinc-300 shrink-0">
            <a href="#preview" className="whitespace-nowrap hover:text-white transition-colors">
              Preview
            </a>
            <a href="#contrast" className="whitespace-nowrap hover:text-white transition-colors">
              Why It Works
            </a>
            <a href="#protocol" className="whitespace-nowrap hover:text-white transition-colors">
              Protocol
            </a>
            <a href="#reviews" className="whitespace-nowrap hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#faq" className="whitespace-nowrap hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          {/* CTA & Price Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-zinc-300 shrink-0 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
              <span>$19 One-Time</span>
            </div>
            <button
              onClick={handleTriggerCheckout}
              className="reflect-btn-primary px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-bold flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-lg shadow-white/10 shrink-0 whitespace-nowrap"
            >
              <span className="inline sm:hidden">Get Guide</span>
              <span className="hidden sm:inline">Get The Guide</span>
              <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section — Rich Atmosphere & Motion */}
      <section className="relative z-10 pt-28 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* Subtle Opal Status Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full bg-white/[0.05] border border-white/[0.12] text-[11px] sm:text-xs font-medium text-zinc-300 mb-6 backdrop-blur-md max-w-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping shrink-0" />
          <span className="text-zinc-200 truncate">10 Minutes a Day • Self-Command</span>
        </div>

        {/* ONE Single Bold Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] max-w-[880px]">
          Reset your mind.
          <span className="block opal-cyan-gradient-text mt-1.5">
            Control your life.
          </span>
        </h1>

        {/* Grounded, Human Copy */}
        <p className="text-base sm:text-xl text-zinc-300 mt-6 sm:mt-7 max-w-[680px] leading-relaxed font-light">
          A 112-page guided manual to stop overthinking, master emotional composure, and rebuild daily discipline. 10 minutes a day on your phone or in your notebook. Read 1 page, write 1 page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
          <button
            onClick={handleTriggerCheckout}
            className="reflect-btn-primary shimmer-button w-full sm:w-auto px-8 py-4 text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-white/15"
          >
            <span>Get The Guide — $19</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#preview"
            className="reflect-btn-secondary w-full sm:w-auto px-7 py-4 text-[14px] font-medium flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-[#38bdf8]" />
            <span>Look Inside The Pages</span>
          </a>
        </div>

        {/* Social Proof Line */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-8 text-xs sm:text-[13px] text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5 text-zinc-200">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold">4.9 / 5.0 Rating</span>
          </div>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span>Interactive on iPhone, iPad &amp; Android</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-emerald-400">Instant One-Tap Access</span>
        </div>

        {/* Hero Product Hardware Mockup with Animated Border Beam & Floating Physics */}
        <div className="relative mt-12 sm:mt-16 w-full max-w-[1040px]">
          <div className="border-beam-container device-floating device-shadow">
            <div className="border-beam-inner aspect-[16/9] overflow-hidden rounded-[1.2rem] relative">
              <Image
                src="/hero-mockup-luxury.jpg"
                alt="The Self-Mastery Guide & Workbook open on iPad and iPhone on luxury dark desk"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Contrast Section: Scrolling Reels vs. The Daily Audit */}
      <section id="contrast" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1040px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why watching reels never changes your life.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[580px] mx-auto font-light">
            Watching short videos gives you 30 seconds of motivation. Writing forces real confrontation.
          </p>

          {/* Interactive Mode Filter */}
          <div className="inline-flex items-center p-1 rounded-full bg-white/[0.06] border border-white/[0.1] mt-8 gap-1">
            <button
              onClick={() => setActiveComparisonView("both")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeComparisonView === "both"
                  ? "bg-white text-black shadow-md shadow-white/20"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Side-by-Side
            </button>
            <button
              onClick={() => setActiveComparisonView("scrolling")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeComparisonView === "scrolling"
                  ? "bg-red-500/20 text-red-300 border border-red-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Passive Scrolling
            </button>
            <button
              onClick={() => setActiveComparisonView("audit")}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                activeComparisonView === "audit"
                  ? "bg-cyan-500/20 text-[#38bdf8] border border-cyan-500/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              The Daily Audit
            </button>
          </div>
        </div>

        {/* Dynamic Opal-Style Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* Watching Reels Card */}
          {(activeComparisonView === "both" || activeComparisonView === "scrolling") && (
            <div className="opal-glass-card p-6 sm:p-8 flex flex-col justify-between border-red-500/20 hover:border-red-500/40">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                    <h3 className="text-lg sm:text-xl font-bold text-red-400">
                      Passive Scrolling
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-red-500/10 text-red-400 border border-red-500/20">
                    Average: ~3.5 hrs / day
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                      Fleeting Motivation
                    </div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      30 seconds of artificial energy that vanishes the exact instant you swipe to the next video.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                      Reactive Living
                    </div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      One passive-aggressive comment or work message ruins your entire mood for the afternoon.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                      2 AM Overthinking
                    </div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      Lying awake in bed replaying old conflicts, feeling guilty about unkept promises to yourself.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                    <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                      Zero Record
                    </div>
                    <p className="text-sm text-zinc-300 font-light leading-relaxed">
                      Weeks and months slip by, yet your daily habits and emotional triggers stay the exact same.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-zinc-400 flex items-center justify-between">
                <span>Result: Unconscious Reactivity</span>
                <span className="text-red-400 font-semibold">Zero Progress</span>
              </div>
            </div>
          )}

          {/* The Daily Audit Card */}
          {(activeComparisonView === "both" || activeComparisonView === "audit") && (
            <div className="opal-glass-card p-6 sm:p-8 flex flex-col justify-between border-[#38bdf8]/30 hover:border-[#38bdf8]/60 shadow-[0_0_35px_rgba(56,189,248,0.1)]">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8] animate-pulse" />
                    <h3 className="text-lg sm:text-xl font-bold text-[#38bdf8]">
                      The Daily Audit
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono bg-cyan-500/10 text-[#38bdf8] border border-cyan-500/20">
                    Committed: 10 mins / day
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                      Written Honesty
                    </div>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed">
                      10 minutes of honest self-inquiry on your phone before sleep forces real confrontation with your excuses.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                      The 3-Second Pause
                    </div>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed">
                      Complete emotional calm when baited or tested. Silence and lowered voice is true authority.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                      Strategic Boundaries
                    </div>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed">
                      Saying no cleanly without guilt, apology, or over-explaining yourself to people.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/[0.03] border border-cyan-500/20">
                    <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                      Undeniable Proof
                    </div>
                    <p className="text-sm text-zinc-200 font-light leading-relaxed">
                      47 consecutive days of kept promises to yourself written down in black and white.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-zinc-300 flex items-center justify-between">
                <span>Result: Unshakeable Composure</span>
                <span className="text-[#38bdf8] font-semibold">Self-Command</span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* What You Actually Fix — The 4 Core Struggles */}
      <section id="struggles" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1040px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for what actually tests you.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[600px] mx-auto font-light">
            Real-world rules for the exact moments your composure and discipline break down.
          </p>
        </div>

        {/* 4 Interactive Glass Items with Hover Illumination */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {struggles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="opal-glass-card p-6 sm:p-7 flex items-start gap-4 group hover:border-[#38bdf8]/40"
              >
                <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-[#38bdf8] flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-[#38bdf8]/10 transition-all duration-300">
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white leading-snug group-hover:text-[#38bdf8] transition-colors">
                    {item.trigger}
                  </h3>
                  <p className="text-sm text-zinc-300 mt-2 font-light leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Interactive Look Inside The 112 Pages (With Border Beam & Ambient Motion) */}
      <section id="preview" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1100px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Look inside the pages.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[620px] mx-auto font-light">
            Clean typography, psychological rules, and daily reflection ledgers you can type directly on your phone or write in a notebook.
          </p>

          {/* Interactive Spread Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8">
            {spreads.map((spread, index) => (
              <button
                key={index}
                onClick={() => setActiveSpreadTab(index)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                  activeSpreadTab === index
                    ? "bg-white text-black shadow-lg shadow-white/20 scale-[1.03]"
                    : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                <span>{spread.title}</span>
                {activeSpreadTab === index && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Spread View with Border Beam Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Spread Preview Image */}
          <div className="lg:col-span-8">
            <div className="border-beam-container shadow-2xl">
              <div className="border-beam-inner aspect-[16/11] relative overflow-hidden rounded-[1.2rem] bg-[#0c1017]">
                <Image
                  src={spreads[activeSpreadTab].image}
                  alt={spreads[activeSpreadTab].title}
                  fill
                  className="object-contain p-2 sm:p-5 transition-all duration-500"
                />
              </div>
            </div>
          </div>

          {/* Spread Explanation */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="opal-glass-card p-6 sm:p-7">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#38bdf8]/10 border border-[#38bdf8]/20 text-[11px] font-mono text-[#38bdf8] mb-3">
                <Sparkles className="w-3 h-3" />
                <span>{spreads[activeSpreadTab].tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                {spreads[activeSpreadTab].title}
              </h3>
              <p className="text-sm text-zinc-300 mt-3 leading-relaxed font-light">
                {spreads[activeSpreadTab].description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {spreads[activeSpreadTab].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={handleTriggerCheckout}
                  className="reflect-btn-primary shimmer-button w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <span>Get The Guide — $19</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 10-Minute Daily Protocol (Flowing Light Conduit) */}
      <section id="protocol" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1080px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            {/* ONE Single Clear Heading */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              10 minutes before bed.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed font-light">
              No complex apps to configure. No subscriptions. Open the PDF in Apple Books, Files, or GoodNotes on your phone, or keep a notebook beside your bed.
            </p>

            {/* Glowing Flowing Conduit Steps */}
            <div className="relative space-y-6 mt-8 pl-4 border-l-2 border-cyan-500/30">
              <div className="relative group">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#06080b] border-2 border-[#38bdf8] group-hover:scale-125 transition-transform" />
                <h4 className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                  01. Morning Principle (3 Mins)
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Read 1 rule first thing in the morning before checking social media, group chats, or emails.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#06080b] border-2 border-[#38bdf8] group-hover:scale-125 transition-transform" />
                <h4 className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                  02. In The Field
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Deploy the 3-second pause whenever someone tests your patience, insults your work, or tries to bait your ego.
                </p>
              </div>

              <div className="relative group">
                <div className="absolute -left-[23px] top-1 w-3.5 h-3.5 rounded-full bg-[#06080b] border-2 border-[#38bdf8] group-hover:scale-125 transition-transform" />
                <h4 className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                  03. Evening Audit (7 Mins)
                </h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Type 3 honest answers directly into your phone before turning off the lights to account for your day.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={handleTriggerCheckout}
                className="reflect-btn-primary shimmer-button px-7 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
              >
                <span>Start Your Daily Audit — $19</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Lifestyle Image Render with Floating Atmosphere */}
          <div className="lg:col-span-6">
            <div className="border-beam-container device-shadow">
              <div className="border-beam-inner aspect-[4/3] relative overflow-hidden rounded-[1.2rem]">
                <Image
                  src="/mobile-lifestyle-usage.jpg"
                  alt="Hands holding iPhone running the self-mastery audit overlooking evening city skyline"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Direct Download Section ($19 Seamless Card with Border Beam) */}
      <section id="checkout" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[880px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get The Self-Mastery Guide.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 font-light">
            112 pages • Instant one-tap access • Lifetime ownership
          </p>
        </div>

        <div className="border-beam-container shadow-2xl">
          <div className="border-beam-inner p-6 sm:p-10 rounded-[1.2rem]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white">
                  The Self-Mastery Guide &amp; Workbook
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  Interactive fields on mobile &amp; tablet + print-ready layout
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  $19
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">One-time payment • No subscriptions</div>
              </div>
            </div>

            {/* Inclusions */}
            <div className="py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-200">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>112 Interactive Pages</strong> formatted for iPhone, iPad &amp; Android</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>All 47 Frameworks</strong> for composure, boundaries, and focus</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>47 Ruled Daily Ledgers</strong> to audit your reactions and habits</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Print-Ready PDF</strong> with generous margins for notebooks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Instant Download</strong> immediately after Stripe checkout</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Permanent Backup Link</strong> emailed to your inbox</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleTriggerCheckout}
              className="reflect-btn-primary shimmer-button w-full py-4 sm:py-5 text-sm sm:text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-white/20"
            >
              <span>Download The Guide ($19)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Founder's VIP Guarantee Note */}
            <p className="text-xs text-zinc-400 text-center mt-5 leading-relaxed font-light">
              <strong className="text-white font-medium">Founder's Credit:</strong> Every purchase today credits your full $19 toward lifetime access to the upcoming Life Reset mobile app when registration opens.
            </p>
          </div>
        </div>
      </section>

      {/* Reader Reviews (Glass Cards with Verified Indicators) */}
      <section id="reviews" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1040px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
              What readers are saying.
            </h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 font-light">
              From readers who stopped just watching and started doing the work.
            </p>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="reflect-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#38bdf8]" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="opal-glass-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-500">{review.date}</span>
                </div>

                {review.highlight && (
                  <h4 className="text-base font-bold text-white mb-2 leading-snug">"{review.highlight}"</h4>
                )}

                <p className="text-sm text-zinc-300 leading-relaxed font-light">
                  "{review.comment}"
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-white">{review.name}</div>
                  {review.role && (
                    <div className="text-[11px] text-zinc-400">{review.role}</div>
                  )}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="p-6 sm:p-8 max-w-[500px] w-full bg-[#0d1117] rounded-3xl border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold text-white">Review Submitted</h3>
                <p className="text-xs text-zinc-400 mt-1">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                <h3 className="text-xl font-bold text-white mb-1">Leave a Review</h3>
                <p className="text-xs text-zinc-400 mb-5">
                  Share how The Self-Mastery Guide has impacted your daily conduct.
                </p>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      placeholder="e.g. Marcus V."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Occupation / City (Optional)</label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="e.g. Software Engineer, London"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <button
                          type="button"
                          key={num}
                          onClick={() => setNewReview({ ...newReview, rating: num })}
                          className={`p-2 rounded-lg ${
                            newReview.rating >= num ? "text-amber-400" : "text-zinc-600"
                          }`}
                        >
                          <Star className="w-5 h-5 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Your Review</label>
                    <textarea
                      required
                      rows={4}
                      value={newReview.comment}
                      onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                      placeholder="What specific framework or prompt made the biggest difference in your daily composure?"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#38bdf8]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="reflect-btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>{submittingReview ? "Submitting..." : "Post Review"}</span>
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Frequently Asked Questions (Clean Accordion) */}
      <section id="faq" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[800px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-white/[0.08]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-5 cursor-pointer group"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-[#38bdf8] transition-colors">{faq.q}</h4>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${
                    openFaq === index ? "rotate-180 text-[#38bdf8]" : ""
                  }`}
                />
              </div>

              {openFaq === index && (
                <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-light pt-2">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-12 px-4 sm:px-6 border-t border-white/[0.08] text-center text-xs text-zinc-400">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">@ourlife.reset</span>
            <span>• The Self-Mastery Guide &amp; Workbook</span>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com/ourlife.reset"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a href="/refund-policy" className="hover:text-white transition-colors">
              Refund Policy
            </a>
            <a href="#checkout" className="text-[#38bdf8] font-semibold hover:underline">
              Download Guide ($19)
            </a>
          </div>
        </div>
        <div className="mt-6 text-zinc-500 text-[11px]">
          &copy; {new Date().getFullYear()} Our Life Reset. Reset your mind. Control your life.
        </div>
      </footer>
    </div>
  );
}
