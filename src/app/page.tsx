"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  Check,
  Star,
  ShieldCheck,
  Sparkles,
  Smartphone,
  Eye,
  Lock,
  ChevronDown,
  Clock,
  Compass,
  Zap,
  Target,
  FileText,
  Layers,
  MessageSquarePlus,
  Send,
  X,
  CheckCircle2,
  BookmarkCheck
} from "lucide-react";

/* --- Live Stripe Payment Configuration --- */
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
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: ""
  });

  /* --- Fetch Reviews from Live API --- */
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

  /* --- Submit Review to Backend --- */
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

  /* --- Interactive PDF Spreads Data --- */
  const spreads = [
    {
      title: "The Reset Manifesto",
      subtitle: "Prelude • The Four Core Pillars",
      image: "/manifesto-spread-preview.png",
      description:
        "The opening declaration against involuntary digital distraction. Establishes the 4 operational pillars of private discipline, emotional control, and solitary execution.",
      highlights: [
        "Why scrolling dopamine fractures your nervous system",
        "The operational principle for each pillar",
        "Quotes from Blaise Pascal & modern behavioral neuroscience"
      ]
    },
    {
      title: "Strategic Restraint & Composure",
      subtitle: "Chapter 15 • Human Nature & Non-Reactivity",
      image: "/greene-spread-preview.png",
      description:
        "Field rules for remaining unshakeable when provoked. Teaches the Rule of Seven Words, project opacity, and tactical absence.",
      highlights: [
        "Why reacting in anger surrenders your psychological power",
        "The 3-Second Protocol before answering disrespect",
        "Ruled ledger prompts to audit where you over-shared or lost composure"
      ]
    },
    {
      title: "Solitary Discipline & Night Ledger",
      subtitle: "Chapter 22 • Deep Work & Evening Audit",
      image: "/watts-spread-preview.png",
      description:
        "The unsparing evening accountability system. Every night, force yourself to write down the undeniable physical proof of kept promises.",
      highlights: [
        "How to audit the excuses you rationalized during the day",
        "The 90-minute solitary deep work standard",
        "Ruled ledger lines formatted to type on your phone or write in a notebook"
      ]
    },
    {
      title: "The Daily Checkpoint System",
      subtitle: "Chapter 04 • The Core Operational Framework",
      image: "/book-spread-preview.png",
      description:
        "The two-page daily checkpoint architecture: read 1 page of principles in the morning, complete 1 page of honest self-inquiry before bed.",
      highlights: [
        "Zero fluff: 10 minutes maximum per day",
        "Interactive fillable form fields for phone and tablet",
        "Print-ready high-resolution typesetting"
      ]
    }
  ];

  /* --- 4 Core Pillars Data --- */
  const pillars = [
    {
      roman: "I",
      name: "The Immovable Frame",
      theme: "Emotional Composure & Non-Reactivity",
      tagline: "Silence is the ultimate flex. When you react in anger, they win.",
      items: [
        "The 3-Second Protocol: How to neutralize rage and bait before speaking",
        "Spotting psychological traps and covert disrespect without flinching",
        "Killing nighttime overthinking and ending mental replay of past arguments"
      ]
    },
    {
      roman: "II",
      name: "The Crucible of Proof",
      theme: "Solitary Discipline & Habit Execution",
      tagline: "Reels give 30 seconds of dopamine. Writing forces permanent change.",
      items: [
        "The 90-Minute Solitary Block: Eliminating fake busywork and procrastination",
        "The Nightly Accountability Ledger: Unsparing self-inquiry before sleep",
        "Rewiring daily friction: How to execute when you have zero motivation"
      ]
    },
    {
      roman: "III",
      name: "Strategic Restraint",
      theme: "Decoding Human Nature & Boundaries",
      tagline: "Never show your cards at the outset. True power moves in silence.",
      items: [
        "The Rule of Seven Words: Concise communication in high-tension rooms",
        "Saying NO cleanly without apologizing, explaining, or feeling guilty",
        "Reading true intentions beneath polite smiles and flattery"
      ]
    },
    {
      roman: "IV",
      name: "The Solitary Path",
      theme: "Autonomy & Private Standards",
      tagline: "Live by a standard that holds up even when nobody is watching.",
      items: [
        "Curing people-pleasing and external validation dependency",
        "The Stoic Mortality Filter: Using death as a clarifier for daily focus",
        "Developing private sovereignty: Complete comfort in your own solitude"
      ]
    }
  ];

  /* --- Real Human FAQs --- */
  const faqs = [
    {
      q: "I already read a lot of philosophy and watch reels. Will this actually teach me anything new?",
      a: "Most people who consume philosophy suffer from the same quiet frustration: they understand the concepts intellectually, but their composure completely dissolves the moment someone provokes them or a deadline gets tense. We didn't build this to give you quotes to recite. Every chapter bypasses the history lesson and goes straight to the psychological root—why your nervous system reacts, where your ego makes excuses, and what specific physical protocol to deploy in that exact room. Then the facing page forces you to write down your own truth. You don't just read it; you audit yourself."
    },
    {
      q: "How much time does this actually take each day? I already have an exhausting schedule.",
      a: "Ten minutes. This is not a 300-page academic book you need a free weekend to read. Each chapter is designed as a single two-page checkpoint. You spend three minutes absorbing the principle on the left, and seven minutes working through the unsparing audit prompt on the right. Doing that once a day creates more real behavioral change than binge-reading five books you'll forget by next month."
    },
    {
      q: "Can I use this directly on my phone, or do I need to print it out?",
      a: "Both. The guide is custom-formatted for mobile devices. It opens natively in Apple Books, Files, Google Drive, or GoodNotes on your iPhone or Android, and includes fillable interactive text fields so you can type your daily audits directly in bed. If you prefer physical writing, the archival PDF is designed with generous print margins so you can print it or mirror the prompts into your personal notebook."
    },
    {
      q: "Is this just another generic motivational guide with feel-good affirmations?",
      a: "No. There are no vision boards, morning mantras, or toxic positivity here. In fact, if you want something that comforts your excuses, you will dislike this manual. The prompts are deliberately uncomfortable. They force you to examine where your 'politeness' was really just cowardice, where you envied a peer's progress, and where you broke promises to yourself. It is a tool for self-command, not comfort."
    },
    {
      q: "What is the Founder's Guarantee regarding the upcoming Life Reset App?",
      a: "Our software team is currently finishing private testing on The Life Reset mobile app. Because we believe in rewarding our early core readers, every person who claims The Self-Mastery Guide today for $19 receives automatic VIP status and a full $19 credit toward lifetime access to the app when public registration opens. You get the workbook today, and your entire purchase is credited forward."
    },
    {
      q: "What happens immediately after checkout?",
      a: "The moment Stripe completes your payment, your screen redirects instantly to a private download portal with a single-tap download button. We also email a permanent backup access link to your inbox at the exact same second, so you'll always have access to your file across all your devices with no recurring fees or subscriptions."
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#06080b] text-[#f8fafc] overflow-x-hidden selection:bg-[#38bdf8] selection:text-black">
      {/* Reflect Ambient Top Glow Flare */}
      <div className="reflect-ambient-glow" />

      {/* Floating Pill Navigation Bar (Reflect Style) */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav className="reflect-nav-blur pointer-events-auto px-3.5 py-2 sm:px-6 sm:py-3 flex items-center justify-between gap-2 sm:gap-8 w-full max-w-[920px]">
          {/* Logo & Account */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-[11px] sm:text-xs tracking-tighter shadow-sm">
              R
            </div>
            <span className="text-[12px] sm:text-[13px] font-bold tracking-wider text-white group-hover:text-[#38bdf8] transition-colors">
              @ourlife.reset
            </span>
          </a>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-6 text-[13px] font-medium text-zinc-300">
            <a href="#preview" className="hover:text-white transition-colors">
              Look Inside
            </a>
            <a href="#pillars" className="hover:text-white transition-colors">
              4 Pillars
            </a>
            <a href="#daily-ritual" className="hover:text-white transition-colors">
              Daily Protocol
            </a>
            <a href="#reviews" className="hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hover:text-white transition-colors">
              FAQ
            </a>
          </div>

          {/* Quick CTA */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
              <span>$19 One-Time</span>
            </div>
            <button
              onClick={handleTriggerCheckout}
              className="reflect-btn-primary px-3 py-1.5 sm:px-5 sm:py-2 text-[11px] sm:text-[13px] font-bold flex items-center gap-1 sm:gap-1.5 cursor-pointer shadow-lg shadow-white/10 shrink-0"
            >
              <span>Get Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* Holographic Pill Badge */}
        <div className="opal-badge mb-5 sm:mb-8 text-[10px] sm:text-[11px] px-3.5 py-1.5 max-w-full">
          <Sparkles className="w-3.5 h-3.5 text-[#38bdf8] shrink-0" />
          <span className="truncate">112-PAGE PHONE WORKBOOK • VOLUME I</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-[28px] xs:text-[34px] sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.12] max-w-[960px] break-words">
          Stop consuming motivation.
          <span className="block opal-cyan-gradient-text mt-1 sm:mt-1.5">
            Start auditing your life.
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-base sm:text-xl text-zinc-300 mt-6 sm:mt-8 max-w-[740px] leading-relaxed font-light">
          A private, 112-page operational manual to kill reactivity, decode hidden motives, and build unshakeable daily discipline—designed to open and type directly on your phone every night.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-9 w-full sm:w-auto">
          <button
            onClick={handleTriggerCheckout}
            className="reflect-btn-primary w-full sm:w-auto px-8 py-4 text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2.5 cursor-pointer shadow-xl shadow-white/15"
          >
            <span>Download The Guide — $19</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <a
            href="#preview"
            className="reflect-btn-secondary w-full sm:w-auto px-7 py-4 text-[14px] font-medium flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4 text-[#38bdf8]" />
            <span>Look Inside The 112 Pages</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 mt-10 text-[12px] sm:text-[13px] text-zinc-400 font-medium">
          <div className="flex items-center gap-1.5">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="text-zinc-200 font-semibold">4.9 / 5.0 Rating</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-3.5 h-3.5 text-[#38bdf8]" />
            <span>Interactive on iPhone & iPad</span>
          </div>
          <div className="hidden sm:block w-1 h-1 rounded-full bg-zinc-700" />
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Instant One-Tap Delivery</span>
          </div>
        </div>

        {/* Hero Product Hardware Mockup */}
        <div className="relative mt-14 sm:mt-18 w-full max-w-[1020px] rounded-3xl p-2 sm:p-3 bg-gradient-to-b from-white/[0.12] via-white/[0.04] to-transparent border border-white/[0.1] device-shadow overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden aspect-[16/9] w-full bg-black">
            <Image
              src="/hero-mockup-luxury.jpg"
              alt="The Self-Mastery Guide & Workbook open on iPad and iPhone on luxury architectural desk"
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Floating Highlight Feature Pills */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-[#0a0d14]/90 backdrop-blur-md rounded-2xl mt-2 border border-white/[0.06] text-left">
            <div className="p-2 sm:p-3">
              <div className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-bold">Format</div>
              <div className="text-[13px] sm:text-[14px] font-semibold text-white mt-0.5">Phone &amp; Tablet</div>
              <div className="text-[11px] text-zinc-400 mt-1">Interactive fillable fields</div>
            </div>
            <div className="p-2 sm:p-3 border-l border-white/[0.06]">
              <div className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-bold">Daily Protocol</div>
              <div className="text-[13px] sm:text-[14px] font-semibold text-white mt-0.5">10 Mins a Day</div>
              <div className="text-[11px] text-zinc-400 mt-1">Read 1 page, write 1 page</div>
            </div>
            <div className="p-2 sm:p-3 border-l border-white/[0.06]">
              <div className="text-[11px] uppercase tracking-wider text-[#38bdf8] font-bold">Accountability</div>
              <div className="text-[13px] sm:text-[14px] font-semibold text-white mt-0.5">47 Ruled Ledgers</div>
              <div className="text-[11px] text-zinc-400 mt-1">Unsparing self-audit prompts</div>
            </div>
            <div className="p-2 sm:p-3 border-l border-white/[0.06]">
              <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-bold">Privacy</div>
              <div className="text-[13px] sm:text-[14px] font-semibold text-white mt-0.5">100% Offline</div>
              <div className="text-[11px] text-zinc-400 mt-1">Stored only on your device</div>
            </div>
          </div>
        </div>
      </section>

      {/* Opal-Style Contrast Section: The Reality Check */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1020px] mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <div className="opal-badge mb-3">THE PSYCHOLOGY GAP</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Why saving reels never changes your life.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[620px] mx-auto">
            You don't have a lack of information. You have an absence of a daily operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
          {/* The Passive Reel Trap */}
          <div className="reflect-card p-6 sm:p-8 border-red-500/20 bg-gradient-to-b from-red-950/15 via-[#0c0f17] to-[#080b10]">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-red-400">
                The Passive Consumer Loop
              </span>
              <X className="w-5 h-5 text-red-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              Saving 12 reels a week with zero execution
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-300 font-light">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Fleeting Dopamine:</strong> 30 seconds of motivation that dissolves the moment you swipe to the next video.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Reactive Living:</strong> You let one passive-aggressive comment ruin your mood for the entire day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Mental Replay:</strong> Lying awake in bed replaying conflicts, arguments, and conversations you wish you handled better.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold">•</span>
                <span><strong>Zero Record:</strong> Weeks pass by and your daily habits remain virtually identical.</span>
              </li>
            </ul>
          </div>

          {/* The Sovereign Protocol */}
          <div className="reflect-card p-6 sm:p-8 border-[#38bdf8]/30 bg-gradient-to-b from-[#38bdf8]/10 via-[#0c0f17] to-[#080b10] shadow-xl shadow-[#38bdf8]/5">
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs uppercase tracking-widest font-bold text-[#38bdf8]">
                The Self-Mastery Protocol
              </span>
              <Check className="w-5 h-5 text-[#38bdf8]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-4">
              10 minutes of unsparing daily self-audit
            </h3>
            <ul className="space-y-3.5 text-sm text-zinc-200 font-light">
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span><strong>Written Behavioral Rewiring:</strong> Putting pen to paper (or typing into your phone) forces real self-confrontation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span><strong>The 3-Second Protocol:</strong> Complete emotional silence when baited or tested. Calmness is ultimate dominance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span><strong>Strategic Restraint:</strong> Knowing how to say NO cleanly without guilt, apology, or over-explaining yourself.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold">•</span>
                <span><strong>Undeniable Evidence:</strong> 47 consecutive days of honest audits that prove your discipline to yourself.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive "Look Inside The 112 Pages" Preview Section */}
      <section id="preview" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
        <div className="text-center mb-10 sm:mb-14">
          <div className="opal-badge mb-3">PROOF OF CRAFT</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Look inside the 112 pages.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[600px] mx-auto">
            Not an AI ebook. An archival masterwork engineered with exquisite typography, psychological field rules, and ruled ledgers.
          </p>

          {/* Spread Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {spreads.map((spread, index) => (
              <button
                key={index}
                onClick={() => setActiveSpreadTab(index)}
                className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeSpreadTab === index
                    ? "bg-white text-black shadow-md shadow-white/20"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {spread.title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Spread Display */}
        <div className="reflect-card p-4 sm:p-8 border border-white/[0.12] device-shadow">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Spread High-Res Image */}
            <div className="lg:col-span-8 relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/[0.08] shadow-2xl">
              <Image
                src={spreads[activeSpreadTab].image}
                alt={spreads[activeSpreadTab].title}
                fill
                className="object-contain p-2 sm:p-4"
              />
            </div>

            {/* Spread Details & Explanation */}
            <div className="lg:col-span-4 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase tracking-widest font-mono text-[#38bdf8]">
                  {spreads[activeSpreadTab].subtitle}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">
                  {spreads[activeSpreadTab].title}
                </h3>
                <p className="text-sm text-zinc-300 mt-4 leading-relaxed font-light">
                  {spreads[activeSpreadTab].description}
                </p>

                <div className="mt-6 pt-6 border-t border-white/[0.08]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white mb-3">
                    What this chapter delivers:
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-300">
                    {spreads[activeSpreadTab].highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-white/[0.08]">
                <button
                  onClick={handleTriggerCheckout}
                  className="reflect-btn-primary w-full py-3.5 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Claim Full 112 Pages — $19</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 4 Core Pillars Bento Grid (Reflect Style) */}
      <section id="pillars" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="opal-badge mb-3">THE CORE ARCHITECTURE</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            4 Pillars. 47 Chapters. Total Command.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[640px] mx-auto">
            A comprehensive curriculum synthesizing Roman Stoicism, Eastern stillness, and strategic human nature.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="reflect-card p-6 sm:p-8 flex flex-col justify-between relative group hover:border-[#38bdf8]/40"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-white/[0.06] text-[#38bdf8] border border-white/[0.08]">
                    PILLAR {pillar.roman}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">{pillar.theme}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {pillar.name}
                </h3>
                <p className="text-sm italic text-zinc-400 mb-6 font-light">
                  "{pillar.tagline}"
                </p>

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 font-light">
                  {pillar.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400">
                <span>Includes dedicated self-audit ledgers</span>
                <span className="text-[#38bdf8] font-semibold">12 Chapters →</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lifestyle Mobile Usage Section */}
      <section id="daily-ritual" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1080px] mx-auto">
        <div className="reflect-card p-6 sm:p-12 border border-white/[0.12] overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6">
              <div className="opal-badge mb-4">THE 10-MINUTE DAILY AUDIT</div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                Designed for your phone.
                <span className="block text-[#38bdf8] mt-1">Used in 10 minutes before bed.</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-300 mt-5 leading-relaxed font-light">
                No apps to register for. No subscription fees. The Self-Mastery Guide opens seamlessly in Apple Books, Files, GoodNotes, or any PDF reader on iPhone, iPad, and Android.
              </p>

              <div className="space-y-4 mt-8">
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    01
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Morning Principle Checkpoint (3 Mins)</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Absorb 1 psychological rule before checking notifications or emails.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    02
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">In The Field (Throughout The Day)</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Deploy the 3-Second Protocol when someone tests your composure.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                    03
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">Evening Self-Audit Ledger (7 Mins)</h4>
                    <p className="text-xs text-zinc-400 mt-0.5">Answer 3 uncomfortable questions directly on your phone before sleeping.</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <button
                  onClick={handleTriggerCheckout}
                  className="reflect-btn-primary px-7 py-3.5 text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-white/10"
                >
                  <span>Start Your Daily Audit — $19</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Lifestyle Image Render */}
            <div className="lg:col-span-6 relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-white/[0.1] shadow-2xl">
              <Image
                src="/mobile-lifestyle-usage.jpg"
                alt="Hands holding iPhone running the self-mastery habit audit overlooking evening city skyline"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* The Single-Product Luxury Checkout Offer */}
      <section id="checkout" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[880px] mx-auto scroll-mt-24">
        <div className="reflect-card p-8 sm:p-12 border-2 border-white/[0.22] relative overflow-hidden shadow-2xl shadow-blue-500/[0.08]">
          {/* Top Badge */}
          <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#38bdf8] py-1.5 text-center text-black font-extrabold text-[11px] uppercase tracking-widest">
            Deluxe Archival Edition • Volume I • Instant Access
          </div>

          <div className="pt-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#38bdf8]">
                  Archival Publication
                </span>
                <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
                  The Self-Mastery Guide &amp; Workbook
                </h3>
                <p className="text-sm text-zinc-400 mt-1">
                  112 pages • 47 chapters • Interactive phone fields + Print-ready PDF
                </p>
              </div>
              <div className="text-left sm:text-right">
                <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                  $19
                </div>
                <div className="text-xs text-zinc-400 mt-0.5">One-time payment • Lifetime access</div>
              </div>
            </div>

            {/* Inclusions List */}
            <div className="py-8">
              <div className="text-xs font-bold uppercase tracking-wider text-zinc-300 mb-4">
                What you receive immediately:
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-200">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>112 Interactive Pages</strong> formatted for iPhone &amp; iPad</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>All 47 Frameworks</strong> for emotional composure &amp; focus</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>47 Ruled Daily Ledgers</strong> to audit daily discipline</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Archival Print Edition</strong> with generous margins for notebooks</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Instant One-Tap Download</strong> via Stripe</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                  <span><strong>Permanent Backup Link</strong> emailed immediately</span>
                </div>
              </div>
            </div>

            {/* Direct Checkout Button */}
            <button
              onClick={handleTriggerCheckout}
              className="reflect-btn-primary w-full py-4 sm:py-5 text-sm sm:text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-white/20"
            >
              <span>Download The Complete Manual ($19)</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            {/* Founder's VIP Guarantee & Future App Credit */}
            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/40 via-purple-950/20 to-transparent border border-[#38bdf8]/30 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#38bdf8] shrink-0 mt-0.5" />
              <div className="text-xs text-zinc-300 leading-relaxed">
                <strong className="text-white font-semibold">Founder's VIP Guarantee &amp; Future App Credit:</strong>{" "}
                Our team is currently finalizing private testing on The Life Reset mobile app. Every purchase of The Self-Mastery Guide today unlocks automatic VIP status and credits your full $19 toward lifetime access to the app when public registration opens.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Reader Reviews */}
      <section id="reviews" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1100px] mx-auto scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="opal-badge mb-3">READER TESTIMONIALS</div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Written by readers who stopped watching and started doing.
            </h2>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="reflect-btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#38bdf8]" />
            <span>Leave a Review</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviewsList.map((review) => (
            <div key={review.id} className="reflect-card p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400">{review.date}</span>
                </div>

                {review.highlight && (
                  <h4 className="text-sm font-bold text-white mb-2">"{review.highlight}"</h4>
                )}

                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
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
          <div className="reflect-card p-6 sm:p-8 max-w-[500px] w-full border border-white/20 relative">
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
                      placeholder="How has the 10-minute daily audit changed your composure or discipline?"
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

      {/* Real Human FAQs */}
      <section id="faq" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[860px] mx-auto scroll-mt-24">
        <div className="text-center mb-12 sm:mb-16">
          <div className="opal-badge mb-3">FREQUENTLY ASKED QUESTIONS</div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Honest answers. No sales fluff.
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="reflect-card p-5 sm:p-6 border border-white/[0.08] cursor-pointer"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-base sm:text-lg font-semibold text-white">{faq.q}</h4>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${
                    openFaq === index ? "rotate-180 text-[#38bdf8]" : ""
                  }`}
                />
              </div>

              {openFaq === index && (
                <p className="text-xs sm:text-sm text-zinc-300 mt-4 leading-relaxed font-light border-t border-white/[0.06] pt-4">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Minimalist Luxury Footer */}
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
        <div className="mt-6 text-zinc-400 text-[11px]">
          &copy; {new Date().getFullYear()} Our Life Reset. All rights reserved. Built for private honor and self-command.
        </div>
      </footer>
    </div>
  );
}
