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
  BookOpen,
  Clock,
  Shield,
  Smartphone,
  Feather,
  Zap,
  Lock,
  Layers
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
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
        "The opening law: why watching short-form motivation gives you a temporary high that leaves you exhausted, and how writing for 10 minutes creates real composure.",
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

  /* Reflect 8-Card Bento Features */
  const features = [
    {
      icon: BookOpen,
      title: "Read 1 Page, Write 1 Page",
      description: "A two-page daily checkpoint. 3 minutes on the principle, 7 minutes on the written audit."
    },
    {
      icon: Clock,
      title: "The 3-Second Delay",
      description: "Field rules to pause before reacting. Silence and lowered voice when tested."
    },
    {
      icon: Feather,
      title: "Evening Accountability",
      description: "Answer 3 honest questions every night to audit where your composure slipped."
    },
    {
      icon: Smartphone,
      title: "Mobile & Tablet Ready",
      description: "Opens natively in Apple Books, Files, and GoodNotes with interactive fillable fields."
    },
    {
      icon: Layers,
      title: "Notebook Margins",
      description: "Generous print margins if you prefer handwriting in a physical journal on your desk."
    },
    {
      icon: Shield,
      title: "Strategic Boundaries",
      description: "Learn to say no cleanly without guilt, apology, or over-explaining yourself to people."
    },
    {
      icon: Zap,
      title: "Kill Reactivity",
      description: "Break the cycle of losing your mood over one offhand comment or message."
    },
    {
      icon: Lock,
      title: "47 Kept Promises",
      description: "47 consecutive days of honest self-mastery written down in black and white."
    }
  ];

  /* FAQs */
  const faqs = [
    {
      q: "I already consume a lot of philosophy and self-improvement content. Will this actually teach me anything new?",
      a: "Watching videos gives you an intellectual high for thirty seconds, but your composure still dissolves the moment someone baits you or a deadline gets tense. We built this guide to break that loop. Every single chapter pairs a short psychological principle on the left with an honest written audit on the right. You don't just read about calmness; you write down who tested you, why your ego reacted, and what you will do differently next time."
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
    <div className="relative min-h-screen w-full max-w-full bg-[#030014] text-white overflow-x-clip selection:bg-[#9382ff]/50 selection:text-white">
      {/* =========================================================================
         REFLECT EXACT HEADER
         ========================================================================= */}
      <header className="header">
        <div className="container-lg">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#9382ff] to-[#e59cff] flex items-center justify-center text-black font-extrabold text-sm shadow-[0_0_15px_rgba(147,130,255,0.4)]">
              R
            </div>
            <span className="text-[15px] font-medium tracking-tight text-white">
              @ourlife.reset
            </span>
          </a>

          {/* Reflect Floating Pill Nav in dead center on desktop */}
          <ul className="header-nav">
            <li><a href="#preview" className="header-nav-link">Preview</a></li>
            <li><a href="#features" className="header-nav-link">System</a></li>
            <li><a href="#principles" className="header-nav-link">Principles</a></li>
            <li><a href="#pricing" className="header-nav-link">Pricing</a></li>
            <li><a href="#testimonials" className="header-nav-link">Reviews</a></li>
            <li><a href="#faq" className="header-nav-link">FAQ</a></li>
          </ul>

          {/* Header Actions */}
          <div className="header-actions flex items-center gap-2">
            <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-medium text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ba9cff] animate-pulse" />
              <span>$19 One-Time</span>
            </div>
            <button onClick={handleTriggerCheckout} className="button button-primary py-2 px-3 sm:px-4 text-xs sm:text-sm">
              <span className="hidden sm:inline">Get The Guide</span>
              <span className="sm:hidden">Get Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
              <div className="button-border" />
            </button>

            {/* Mobile Animated Hamburger Toggle */}
            <button
              type="button"
              className={`header-toggle ${mobileMenuOpen ? "header-toggle-active" : ""}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              <div />
              <div />
              <div />
            </button>
          </div>
        </div>

        {/* Reflect Mobile Slide-Down Drawer */}
        <div className={`header-mobile-drawer ${mobileMenuOpen ? "header-mobile-drawer-open" : ""}`}>
          <div className="flex flex-col gap-5 text-base font-medium">
            <a
              href="#preview"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              Preview The Pages
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              The 8-Rule System
            </a>
            <a
              href="#principles"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              Why Writing Beats Reels
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              Lifetime Pricing ($19)
            </a>
            <a
              href="#testimonials"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              Reader Reviews
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-200 hover:text-white transition-colors py-2 border-b border-white/[0.08]"
            >
              Frequently Asked Questions
            </a>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.1] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleTriggerCheckout();
              }}
              className="button button-primary w-full justify-center py-3.5 text-sm"
            >
              <span>Claim The Guide — $19</span>
              <ArrowRight className="w-4 h-4 ml-1" />
              <div className="button-border" />
            </button>
            <div className="text-center text-xs text-zinc-400">
              112 Pages • One-Time Payment • Instant Download
            </div>
          </div>
        </div>
      </header>

      {/* =========================================================================
         REFLECT EXACT HERO & BLACK HOLE ORBITS
         ========================================================================= */}
      <section className="hero">
        <div className="hero-content">
          {/* Reflect Iridescent Hero Badge */}
          <a href="#preview" className="hero-badge">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z" fill="url(#paint_hero_badge)" />
              <defs>
                <linearGradient id="paint_hero_badge" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#E59CFF" />
                  <stop offset="0.5" stopColor="#BA9CFF" />
                  <stop offset="1" stopColor="#9CB2FF" />
                </linearGradient>
              </defs>
            </svg>
            <span className="hero-badge-text">The Self-Mastery Guide &amp; Workbook</span>
          </a>

          {/* Reflect Signature Heading */}
          <h1 className="hero-title">
            <span>Reset your mind.</span>
            <span>Control your life.</span>
          </h1>

          {/* Reflect Subdescription */}
          <p className="hero-subdescription">
            A 112-page guided manual to stop overthinking, master emotional composure, and rebuild daily discipline. 10 minutes a day on your phone or in your notebook. Read 1 page, write 1 page.
          </p>

          {/* Reflect Actions */}
          <div className="hero-actions">
            <button onClick={handleTriggerCheckout} className="button button-primary text-[15px] py-3.5 px-7">
              <span>Claim The Guide — $19</span>
              <ArrowRight className="w-4 h-4 ml-1" />
              <div className="button-border" />
            </button>
            <a href="#preview" className="button button-secondary text-[15px] py-3.5 px-6">
              <Eye className="w-4 h-4 text-[#ba9cff] mr-1.5" />
              <span>Look Inside The Pages</span>
              <div className="button-border" />
            </a>
          </div>

          {/* Reflect Social Proof Note */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-6 text-xs text-[#efedfd99]">
            <div className="flex items-center gap-1.5 text-white">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-semibold">4.9 / 5.0 Rating</span>
            </div>
            <span>•</span>
            <span>Interactive on iPhone, iPad &amp; Android</span>
            <span>•</span>
            <span className="text-emerald-400">Instant One-Tap Access</span>
          </div>
        </div>

        {/* Reflect Exact Black Hole Orbital Circles & Twinkling Starfield */}
        <div className="hero-black-hole">
          <div className="hero-black-hole-circles">
            <div>
              <div className="hero-black-hole-circle-0">
                {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-[#ba9cff] shadow-[0_0_8px_#ba9cff]"
                    style={{
                      left: `${50 + 50 * Math.cos((i * 2 * Math.PI) / 8)}%`,
                      top: `${50 + 50 * Math.sin((i * 2 * Math.PI) / 8)}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  />
                ))}
              </div>
            </div>
            <div>
              <div className="hero-black-hole-circle-1">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="absolute w-1.5 h-1.5 rounded-full bg-[#9cb2ff] shadow-[0_0_6px_#9cb2ff]"
                    style={{
                      left: `${50 + 50 * Math.cos((i * 2 * Math.PI) / 6)}%`,
                      top: `${50 + 50 * Math.sin((i * 2 * Math.PI) / 6)}%`,
                      transform: "translate(-50%, -50%)"
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Twinkling Starfield */}
          <div className="hero-black-hole-stars">
            {[...Array(35)].map((_, i) => (
              <div
                key={i}
                style={{
                  left: `${(i * 37) % 100}%`,
                  top: `${(i * 53) % 100}%`,
                  animationDelay: `${(i * 0.2) % 3}s`
                }}
              />
            ))}
          </div>
        </div>

        {/* Reflect Centerpiece Luxury Mockup Frame */}
        <div className="hero-video">
          <div className="hero-video-preview">
            <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden">
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

      {/* =========================================================================
         REFLECT EXACT 8-BENTO ARCHITECTURAL FEATURES GRID
         ========================================================================= */}
      <section id="features" className="features">
        <div className="text-center mb-16">
          <div className="hero-badge">
            <Sparkles className="w-4 h-4 text-[#ba9cff] mr-2" />
            <span className="hero-badge-text">The Daily Operating System</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Built for how you actually live.
          </h2>
          <p className="text-[#efedfd99] text-base mt-3 max-w-[540px] mx-auto">
            A frictionless routine designed to hold you accountable without overwhelming your schedule.
          </p>
        </div>

        <div className="features-cards">
          {/* Reflect Architectural Gridlines */}
          <div className="features-gridlines">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>

          <div className="features-grid">
            {features.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="features-card">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/[0.08] text-[#ba9cff] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="features-card-title">{feat.title}</h3>
                  <p className="features-card-description">{feat.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         LOOK INSIDE THE 112 PAGES (INTERACTIVE SPREAD SHOWCASE)
         ========================================================================= */}
      <section id="preview" className="relative py-24 px-4 sm:px-6 max-w-[1200px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        <div className="text-center mb-14">
          <div className="hero-badge">
            <Eye className="w-4 h-4 text-[#ba9cff] mr-2" />
            <span className="hero-badge-text">Interactive Page Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Look inside the pages.
          </h2>
          <p className="text-[#efedfd99] text-base mt-3 max-w-[580px] mx-auto">
            Every chapter pairs a psychological law on the left with an honest written audit on the right.
          </p>

          {/* Spread Tabs in Reflect Pill Style */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {spreads.map((spread, index) => (
              <button
                key={index}
                onClick={() => setActiveSpreadTab(index)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${
                  activeSpreadTab === index
                    ? "bg-white text-black shadow-lg shadow-white/20 font-semibold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white border border-white/[0.08]"
                }`}
              >
                <span>{spread.title}</span>
                {activeSpreadTab === index && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#9382ff]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Active Spread Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="hero-video-preview">
              <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-[#07051a]">
                <Image
                  src={spreads[activeSpreadTab].image}
                  alt={spreads[activeSpreadTab].title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-contain p-3 sm:p-6 transition-all duration-300"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#9382ff]/10 border border-[#9382ff]/20 text-xs font-mono text-[#ba9cff] mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{spreads[activeSpreadTab].tag}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium text-white">
                {spreads[activeSpreadTab].title}
              </h3>
              <p className="text-sm text-[#efedfdb3] mt-3 leading-relaxed">
                {spreads[activeSpreadTab].description}
              </p>

              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                  {spreads[activeSpreadTab].points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.08]">
                <button
                  onClick={handleTriggerCheckout}
                  className="button button-primary w-full py-3.5 text-sm"
                >
                  <span>Claim The Guide — $19</span>
                  <ArrowRight className="w-4 h-4" />
                  <div className="button-border" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         REFLECT PRINCIPLES & COMPARISON MATRIX
         ========================================================================= */}
      <section id="principles" className="relative py-24 px-4 sm:px-6 max-w-[1100px] mx-auto border-t border-white/[0.08]">
        <div className="text-center mb-16">
          <div className="hero-badge">
            <Shield className="w-4 h-4 text-[#ba9cff] mr-2" />
            <span className="hero-badge-text">Why Writing Works</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Why watching reels never changes your life.
          </h2>
          <p className="text-[#efedfd99] text-base mt-3 max-w-[580px] mx-auto">
            Watching short videos gives you 30 seconds of motivation. Writing forces real confrontation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* The Passive Trap */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-red-500/20 backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
                  <h3 className="text-xl font-medium text-red-400">Passive Scrolling</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-red-500/10 text-red-300 border border-red-500/20">
                  ~3.5 hrs / day
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                    Fleeting Motivation
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    30 seconds of artificial energy that vanishes the exact instant you swipe to the next video.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                    Reactive Living
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    One passive-aggressive comment or work message ruins your entire mood for the afternoon.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="text-xs font-bold uppercase tracking-wider text-red-400/80 mb-1">
                    2 AM Overthinking
                  </div>
                  <p className="text-sm text-zinc-300 font-light leading-relaxed">
                    Lying awake in bed replaying old conflicts, feeling guilty about unkept promises to yourself.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-zinc-400 flex items-center justify-between">
              <span>Result: Unconscious Reactivity</span>
              <span className="text-red-400 font-semibold">Zero Progress</span>
            </div>
          </div>

          {/* The Daily Audit */}
          <div className="p-8 rounded-2xl bg-white/[0.02] border border-[#ba9cff]/30 shadow-[0_0_40px_rgba(186,156,255,0.08)] backdrop-blur-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#ba9cff] animate-pulse" />
                  <h3 className="text-xl font-medium text-[#ba9cff]">The Daily Audit</h3>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-[#ba9cff]/10 text-[#ba9cff] border border-[#ba9cff]/20">
                  10 mins / day
                </span>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-[#ba9cff]/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#ba9cff] mb-1">
                    Written Honesty
                  </div>
                  <p className="text-sm text-zinc-200 font-light leading-relaxed">
                    10 minutes of honest self-inquiry on your phone before sleep forces real confrontation with your excuses.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-[#ba9cff]/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#ba9cff] mb-1">
                    The 3-Second Pause
                  </div>
                  <p className="text-sm text-zinc-200 font-light leading-relaxed">
                    Complete emotional calm when baited or tested. Silence and lowered voice is true authority.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-[#ba9cff]/20">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#ba9cff] mb-1">
                    Strategic Boundaries
                  </div>
                  <p className="text-sm text-zinc-200 font-light leading-relaxed">
                    Saying no cleanly without guilt, apology, or over-explaining yourself to people.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-zinc-300 flex items-center justify-between">
              <span>Result: Unshakeable Composure</span>
              <span className="text-[#ba9cff] font-semibold">Self-Command</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         REFLECT EXACT PRICING SECTION
         ========================================================================= */}
      <section id="pricing" className="pricing">
        <div className="text-center mb-12">
          <div className="hero-badge">
            <span className="hero-badge-text">Simple Lifetime Pricing</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-medium tracking-tight text-white">
            One payment. Lifetime access.
          </h2>
          <p className="text-[#efedfd99] text-base mt-3 max-w-[500px] mx-auto">
            No subscriptions. Claim the 112-page workbook today and get credited toward the upcoming app.
          </p>
        </div>

        <div className="pricing-plans">
          <div className="pricing-plan">
            <div className="p-8 sm:p-12 rounded-3xl bg-white/[0.02] border border-white/[0.1] shadow-[0_20px_70px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <div className="text-center">
                <div className="text-xs uppercase tracking-widest text-[#ba9cff] font-semibold mb-2">
                  The Self-Mastery Guide &amp; Workbook
                </div>
                <div className="pricing-amount">
                  $19
                </div>
                <div className="text-sm text-[#efedfd99] mt-2">
                  One-time payment • Instant access • Lifetime updates
                </div>
              </div>

              {/* Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 text-sm text-zinc-200">
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>112 Interactive Pages</strong> for iPhone, iPad &amp; Android</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>All 47 Frameworks</strong> for composure and boundaries</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>47 Ruled Daily Ledgers</strong> to audit daily conduct</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>Print-Ready PDF</strong> with generous margins for notebooks</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>Instant Download</strong> immediately after Stripe checkout</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-[#ba9cff] shrink-0 mt-0.5" />
                  <span><strong>Permanent Backup Link</strong> emailed to your inbox</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleTriggerCheckout}
                className="button button-primary w-full py-4 text-base font-semibold"
              >
                <span>Download The Guide ($19)</span>
                <ArrowRight className="w-4 h-4" />
                <div className="button-border" />
              </button>

              {/* Founder's VIP Guarantee Note */}
              <p className="text-xs text-[#efedfd99] text-center mt-6 leading-relaxed">
                <strong className="text-white font-medium">Founder's Credit:</strong> Every purchase today credits your full $19 toward lifetime access to the upcoming Life Reset mobile app when registration opens.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         REFLECT EXACT TESTIMONIALS SLIDING MARQUEE
         ========================================================================= */}
      <section id="testimonials" className="testimonials">
        <div className="text-center mb-16 px-4">
          <div className="hero-badge">
            <span className="hero-badge-text">Reader Testimonials</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Loved by thinkers and builders.
          </h2>
          <p className="text-[#efedfd99] text-base mt-3 max-w-[500px] mx-auto">
            From readers who stopped just watching and started doing the work.
          </p>

          <button
            onClick={() => setShowReviewModal(true)}
            className="button button-secondary mt-6"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#ba9cff] mr-2" />
            <span>Leave a Review</span>
            <div className="button-border" />
          </button>
        </div>

        {/* Reflect Sliding Marquee */}
        <div className="testimonials-items">
          <div className="testimonials-row">
            {reviewsList.map((review) => (
              <div key={review.id} className="testimonials-card">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#9382ff]/30 to-[#e59cff]/30 border border-[#ba9cff]/30 flex items-center justify-center font-bold text-xs text-white">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-white">{review.name}</div>
                      <div className="text-xs text-[#efedfd99]">{review.role || "Verified Reader"}</div>
                    </div>
                  </div>
                  <div className="flex text-amber-400">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                {review.highlight && (
                  <h4 className="text-sm font-semibold text-white mb-2">"{review.highlight}"</h4>
                )}
                <p className="text-sm text-[#efedfdb3] leading-relaxed font-light">
                  "{review.comment}"
                </p>

                <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-[#efedfd99]">
                  <span>{review.date}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="p-6 sm:p-8 max-w-[500px] w-full bg-[#0a071e] rounded-3xl border border-white/20 relative shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-zinc-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-8">
                <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
                <h3 className="text-xl font-medium text-white">Review Submitted</h3>
                <p className="text-xs text-zinc-400 mt-1">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit}>
                <h3 className="text-xl font-medium text-white mb-1">Leave a Review</h3>
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#ba9cff]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-zinc-300 block mb-1">Occupation / City (Optional)</label>
                    <input
                      type="text"
                      value={newReview.role}
                      onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                      placeholder="e.g. Software Engineer, London"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#ba9cff]"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-[#ba9cff]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="button button-primary w-full py-3 mt-2"
                  >
                    <span>{submittingReview ? "Submitting..." : "Post Review"}</span>
                    <Send className="w-4 h-4 ml-1" />
                    <div className="button-border" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         REFLECT EXACT FAQ ACCORDION
         ========================================================================= */}
      <section id="faq" className="relative py-24 px-4 sm:px-6 max-w-[840px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        <div className="text-center mb-16">
          <div className="hero-badge">
            <span className="hero-badge-text">Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-white">
            Everything you need to know.
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
                <h4 className="text-base sm:text-lg font-medium text-white group-hover:text-[#ba9cff] transition-colors">{faq.q}</h4>
                <ChevronDown
                  className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${
                    openFaq === index ? "rotate-180 text-[#ba9cff]" : ""
                  }`}
                />
              </div>

              {openFaq === index && (
                <p className="text-sm text-[#efedfdb3] mt-4 leading-relaxed font-light pt-2">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         REFLECT EXACT FOOTER
         ========================================================================= */}
      <footer className="relative py-14 px-4 sm:px-6 border-t border-white/[0.08] text-center text-xs text-[#efedfd99]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#9382ff] to-[#e59cff] flex items-center justify-center text-black font-extrabold text-[10px]">
              R
            </div>
            <span className="font-semibold text-white">@ourlife.reset</span>
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
            <a href="#pricing" className="text-[#ba9cff] font-medium hover:underline">
              Download Guide ($19)
            </a>
          </div>
        </div>
        <div className="mt-8 text-zinc-600 text-[11px]">
          &copy; {new Date().getFullYear()} Our Life Reset. Reset your mind. Control your life.
        </div>
      </footer>
    </div>
  );
}
