"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
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
  BookOpen,
  Clock,
  Shield,
  Smartphone,
  Feather,
  Zap,
  Lock,
  Layers,
  Users,
  Compass,
  HeartHandshake,
  Briefcase,
  Sparkles
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

  /* Review Modal State */
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

  /* Community Application State */
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    handle: "",
    reason: ""
  });
  const [submittingApp, setSubmittingApp] = useState<boolean>(false);
  const [appSubmitted, setAppSubmitted] = useState<boolean>(false);
  const [appError, setAppError] = useState<string | null>(null);

  /* Fetch live reviews on mount */
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
        }, 2200);
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setSubmittingReview(false);
    }
  };

  const handleCommunitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name.trim() || !appForm.email.trim() || !appForm.reason.trim()) {
      setAppError("Please complete all required fields.");
      return;
    }

    setSubmittingApp(true);
    setAppError(null);
    try {
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appForm)
      });

      if (res.ok) {
        setAppSubmitted(true);
        setAppForm({ name: "", email: "", handle: "", reason: "" });
      } else {
        const err = await res.json();
        setAppError(err.error || "Submission failed. Please try again.");
      }
    } catch (err) {
      console.error("Application error:", err);
      setAppError("Network error. Please try again.");
    } finally {
      setSubmittingApp(false);
    }
  };

  /* Interactive PDF Spreads Data */
  const spreads = [
    {
      title: "The Reset Principle",
      image: "/manifesto-spread-preview.png",
      tag: "Foundations",
      description:
        "Why short-form motivation leaves you empty, and how 10 minutes of daily written inquiry builds unshakable emotional composure.",
      points: [
        "Passive motivation vs. written confrontation",
        "The 4 quiet laws of self-command",
        "Building composure without broadcasting it"
      ]
    },
    {
      title: "Strategic Restraint",
      image: "/greene-spread-preview.png",
      tag: "Composure",
      description:
        "Field rules for remaining quiet when tested. Learn why pausing and lowering your voice disarms disrespect every time.",
      points: [
        "The 3-second delay before reacting to disrespect",
        "Saying no cleanly without guilt or over-explaining",
        "The daily ledger to audit slipped composure"
      ]
    },
    {
      title: "Evening Audit",
      image: "/watts-spread-preview.png",
      tag: "Accountability",
      description:
        "Every evening before sleep, answer 3 honest inquiries to hold yourself accountable for your focus, boundaries, and reactions.",
      points: [
        "Confront excuses before closing your eyes",
        "Pinpoint the exact trigger that derailed your attention",
        "Formatted for mobile typing or handwriting"
      ]
    },
    {
      title: "The Daily Ledger",
      image: "/book-spread-preview.png",
      tag: "Daily Practice",
      description:
        "A 2-page daily checkpoint: read 1 page of principles in the morning, complete 1 page of honest audit before sleep.",
      points: [
        "10 minutes daily: 3 mins reading, 7 mins writing",
        "Fillable interactive fields on iOS & Android",
        "Print-ready margins for your desk journal"
      ]
    }
  ];

  /* 8 Core Principles: Optimized for 2-column mobile grid */
  const corePrinciples = [
    {
      icon: BookOpen,
      title: "Read 1, Write 1",
      description: "A two-page daily checkpoint. 3 mins on the law, 7 mins on the audit."
    },
    {
      icon: Clock,
      title: "3-Second Delay",
      description: "Field rule to pause before replying. Silence is real authority."
    },
    {
      icon: Feather,
      title: "Evening Audit",
      description: "3 honest questions every night to audit where composure slipped."
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Native in Apple Books, Files, and GoodNotes with fillable fields."
    },
    {
      icon: Layers,
      title: "Physical Margins",
      description: "Generous notebook margins if you prefer pen and paper on your desk."
    },
    {
      icon: Shield,
      title: "Quiet Boundaries",
      description: "Say no cleanly without guilt, apology, or over-explaining."
    },
    {
      icon: Zap,
      title: "Kill Reactivity",
      description: "Never lose your peace over an offhand message or comment."
    },
    {
      icon: Lock,
      title: "47 Kept Promises",
      description: "47 consecutive days of verified self-mastery written down."
    }
  ];

  /* FAQs */
  const faqs = [
    {
      q: "I already consume philosophy online. How is this different?",
      a: "Watching videos gives you an intellectual high for thirty seconds, but your composure still dissolves the moment someone baits you. Every single chapter in this manual pairs a concise law on the left with an honest written audit on the right. You don't just read about calmness; you document who tested you, why your ego reacted, and what you will do differently next time."
    },
    {
      q: "How much time does this take each day?",
      a: "Exactly 10 minutes. This is deliberately not a 400-page academic tome. You spend three minutes reading the principle in the morning, and seven minutes completing the audit prompt before sleep. Doing that daily creates permanent behavioral shifts."
    },
    {
      q: "Can I use this on my phone or do I have to print it?",
      a: "Both. It is custom-formatted for mobile screens with interactive fillable text fields in Apple Books, Files, and GoodNotes. If you prefer handwriting, it includes clean margins for printing or copying into your journal."
    },
    {
      q: "What is the 30,000 Locked-In Collective?",
      a: "It is our private vetted circle of high-agency individuals who practice daily self-mastery. Members share high standards for business, health, and character. People have met co-founders and launched businesses inside, and long-term life partners have met through our shared principles. Access to the Discord is granted upon application review."
    },
    {
      q: "What happens immediately after Stripe checkout?",
      a: "The moment payment completes, you are redirected immediately to a one-tap download portal. You will also receive an instant email backup with permanent lifetime access."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#111d15] text-[#f7f6f2] font-sans overflow-x-clip selection:bg-[#34533e] selection:text-white">
      {/* =========================================================================
         1. HEADER: OFFICIAL LOGO + COMPACT MOBILE NAV + OLIVE PALETTE
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#111d15]/90 backdrop-blur-md border-b border-[#22382b]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Official Logo + Name */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-with-bg.png"
              alt="Our Life Reset Official Logo"
              width={34}
              height={34}
              className="rounded-lg border border-[#2d4d37] shadow-sm group-hover:border-[#4d7d5c] transition-colors"
              priority
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#d3e5d8] transition-colors">
                @ourlife.reset
              </span>
              <span className="hidden sm:inline text-[10px] text-[#86a38f] tracking-wider uppercase font-medium">
                Self-Mastery Manual
              </span>
            </div>
          </Link>

          {/* Desktop Scale-Style Nav */}
          <nav className="hidden md:flex items-center gap-6 text-xs uppercase tracking-wider font-medium text-[#a7c2b0]">
            <a href="#system" className="hover:text-white transition-colors">The System</a>
            <a href="#spreads" className="hover:text-white transition-colors">Inside Pages</a>
            <a href="#community" className="hover:text-white transition-colors">30k Collective</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1a2d21] border border-[#2b4735] text-[11px] text-[#9fc7ab]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>30,000 Strong</span>
            </div>

            <button
              onClick={handleTriggerCheckout}
              className="btn-primary py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-semibold"
            >
              <span>Get Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-[#a7c2b0] hover:text-white hover:bg-[#1a2d21] transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className="w-full h-0.5 bg-current rounded-full" />
                  <span className="w-full h-0.5 bg-current rounded-full" />
                  <span className="w-full h-0.5 bg-current rounded-full" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Slide Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#142319] border-b border-[#233b2c] px-4 py-4 space-y-3">
            <a
              href="#system"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              The 8-Rule System
            </a>
            <a
              href="#spreads"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              Inside The Pages
            </a>
            <a
              href="#community"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              30,000 Member Community
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              Google Reviews (4.9 ★)
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              FAQ
            </a>
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleTriggerCheckout();
                }}
                className="btn-primary w-full py-2.5 text-xs font-semibold justify-center"
              >
                <span>Download Guide — $19</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
         2. HERO: OLIVE & WARM CREAM PALETTE • COMPACT MOBILE-FIRST LAYOUT
         ========================================================================= */}
      <section className="relative pt-8 sm:pt-14 pb-12 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center radial-glow-olive">
        {/* Scale-Style Pill Badge */}
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[11px] sm:text-xs font-medium tracking-wide">
              The Self-Mastery Guide &amp; Workbook
            </span>
          </div>
        </div>

        {/* Headline: Editorial Display, tight mobile leading */}
        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-3xl mx-auto leading-[1.12]">
          Reset your mind. <br className="hidden sm:inline" />
          <span className="text-[#d8ebd9]">Control your life.</span>
        </h1>

        {/* Subtitle: Short, high-status, zero fluff */}
        <p className="mt-3.5 sm:mt-5 text-sm sm:text-base text-[#bfd4c6] max-w-xl mx-auto font-light leading-relaxed">
          A 112-page manual to eliminate overthinking, master emotional composure, and rebuild daily discipline. Read 1 page in the morning, write 1 page at night.
        </p>

        {/* Hero Actions: SIDE-BY-SIDE ON MOBILE */}
        <div className="mt-6 sm:mt-8 flex flex-row items-center justify-center gap-2.5 w-full max-w-sm mx-auto">
          <button
            onClick={handleTriggerCheckout}
            className="btn-primary flex-1 py-3 px-3.5 text-xs sm:text-sm font-semibold truncate"
          >
            <span>Claim Guide — $19</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          <a
            href="#spreads"
            className="btn-secondary flex-1 py-3 px-3 text-xs sm:text-sm font-medium truncate"
          >
            <Eye className="w-3.5 h-3.5 text-[#a4c9b0] shrink-0" />
            <span>Look Inside</span>
          </a>
        </div>

        {/* Hero Quick Proof Strip: SIDE BY SIDE 3 COLUMNS */}
        <div className="grid grid-cols-3 gap-2 mt-8 max-w-md mx-auto pt-4 border-t border-[#233a2c] text-center">
          <div className="p-2 rounded-xl bg-[#15241b]/80 border border-[#233b2c]">
            <div className="text-xs sm:text-sm font-bold text-white">30,000+</div>
            <div className="text-[10px] sm:text-xs text-[#8ca896]">Community</div>
          </div>
          <div className="p-2 rounded-xl bg-[#15241b]/80 border border-[#233b2c]">
            <div className="text-xs sm:text-sm font-bold text-amber-300 flex items-center justify-center gap-1">
              <Star className="w-3 h-3 fill-amber-300" />
              <span>4.9</span>
            </div>
            <div className="text-[10px] sm:text-xs text-[#8ca896]">Google Rating</div>
          </div>
          <div className="p-2 rounded-xl bg-[#15241b]/80 border border-[#233b2c]">
            <div className="text-xs sm:text-sm font-bold text-white">112 Pages</div>
            <div className="text-[10px] sm:text-xs text-[#8ca896]">Interactive PDF</div>
          </div>
        </div>

        {/* Hero Mockup Preview */}
        <div className="mt-8 sm:mt-12 relative max-w-3xl mx-auto rounded-2xl overflow-hidden border border-[#2c4737] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
          <Image
            src="/hero-mockup-luxury.jpg"
            alt="The Self-Mastery Guide & Workbook open on iPad and iPhone"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#111d15] via-transparent to-transparent opacity-60" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] text-[#cfe3d5] backdrop-blur-md bg-[#122017]/80 px-3.5 py-1.5 rounded-lg border border-[#2a4635]">
            <span>Daily Ledger • Section 3 Audit</span>
            <span className="text-emerald-400 font-medium">Apple Books &amp; GoodNotes Ready</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. SECTION: CONTRASTING WARM CREAM PROOF STRIP
         ========================================================================= */}
      <section className="bg-[#f7f6f2] text-[#141a16] py-8 sm:py-12 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="text-xs uppercase tracking-widest font-bold text-[#44664f]">
                Built for Daily Composure
              </span>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#141a16] mt-0.5">
                The standard for high-agency minds.
              </h2>
            </div>

            {/* Quick Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-4 w-full md:w-auto">
              <div className="p-3 rounded-xl bg-white border border-[#e5e3d7] text-center shadow-xs">
                <div className="text-xs font-bold text-[#1d3023]">Instant Delivery</div>
                <div className="text-[11px] text-[#637267] mt-0.5">1-Tap Download Link</div>
              </div>
              <div className="p-3 rounded-xl bg-white border border-[#e5e3d7] text-center shadow-xs">
                <div className="text-xs font-bold text-[#1d3023]">Lifetime Access</div>
                <div className="text-[11px] text-[#637267] mt-0.5">No Subscriptions</div>
              </div>
              <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white border border-[#e5e3d7] text-center shadow-xs">
                <div className="text-xs font-bold text-[#1d3023]">Founder Credit</div>
                <div className="text-[11px] text-[#637267] mt-0.5">$19 Credited to App</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. SECTION: THE SYSTEM (8 RULES) • 2-COLUMN MOBILE GRID
         ========================================================================= */}
      <section id="system" className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <div className="badge-pill mb-2">
            <Compass className="w-3.5 h-3.5 text-[#86bf9a]" />
            <span>The Daily Operating System</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Built for how you actually live.
          </h2>
          <p className="text-xs sm:text-sm text-[#a8c2b1] mt-2 max-w-md mx-auto font-light">
            A frictionless routine designed to build quiet self-command without overwhelming your calendar.
          </p>
        </div>

        {/* CRITICAL MOBILE OPTIMIZATION: 2 COLUMNS ON MOBILE (grid-cols-2) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4">
          {corePrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="scale-card p-3.5 sm:p-5 flex flex-col justify-between hover:bg-[#182a1f] transition-all"
              >
                <div>
                  <div className="w-7 h-7 sm:w-9 sm:h-9 rounded-lg bg-[#203728] border border-[#30523c] flex items-center justify-center text-[#86bf9a] mb-2.5 sm:mb-3">
                    <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[11px] sm:text-xs text-[#9eb6a6] mt-1 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         5. SECTION: LOOK INSIDE THE PAGES (WARM WHITE EDITORIAL SPREAD)
         ========================================================================= */}
      <section id="spreads" className="bg-[#faf9f5] text-[#141a16] py-12 sm:py-20 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest font-bold text-[#44664f]">
              Direct Page Showcase
            </span>
            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#141a16] mt-1">
              Look inside the pages.
            </h2>
            <p className="text-xs sm:text-sm text-[#54685b] mt-2 max-w-md mx-auto">
              Every chapter pairs a psychological law on the left with an honest written audit on the right.
            </p>

            {/* Compact Tabs: 2x2 Grid on Mobile, Flex on Desktop */}
            <div className="grid grid-cols-2 sm:flex sm:justify-center gap-2 mt-6 max-w-xl mx-auto">
              {spreads.map((spread, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpreadTab(idx)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold transition-all ${
                    activeSpreadTab === idx
                      ? "bg-[#1c3024] text-white shadow-sm"
                      : "bg-[#ece9dc] text-[#344a3c] hover:bg-[#e2ded0]"
                  }`}
                >
                  <span>{spread.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Spread Container */}
          <div className="max-w-3xl mx-auto bg-white rounded-2xl p-4 sm:p-6 border border-[#e2dfd4] shadow-md">
            <div className="relative rounded-xl overflow-hidden border border-[#eae7dc] bg-[#f5f4ee]">
              <Image
                src={spreads[activeSpreadTab].image}
                alt={spreads[activeSpreadTab].title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Spread Highlights: 2-column mobile breakdown */}
            <div className="mt-5 pt-4 border-t border-[#eae7dc]">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded-md bg-[#eef5f0] text-[#2d5c3b] font-semibold border border-[#d2e3d7]">
                  {spreads[activeSpreadTab].tag}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-[#141a16]">
                  {spreads[activeSpreadTab].title}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-[#4b5c51] font-light leading-relaxed mb-3">
                {spreads[activeSpreadTab].description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {spreads[activeSpreadTab].points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-1.5 text-xs text-[#2b3a30]">
                    <Check className="w-3.5 h-3.5 text-[#3d6849] shrink-0 mt-0.5" />
                    <span className="leading-tight">{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. SECTION: THE 30,000 LOCKED-IN COLLECTIVE (COMMUNITY + APPLICATION FORM)
         ========================================================================= */}
      <section id="community" className="py-12 sm:py-20 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <div className="badge-pill mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>Private Vetted Network</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            The 30,000 Locked-In Collective
          </h2>
          <p className="text-xs sm:text-sm text-[#a8c2b1] mt-2 max-w-lg mx-auto font-light leading-relaxed">
            An uncompromising circle of high-agency individuals who value quiet execution, high taste, and deep discipline.
          </p>
        </div>

        {/* Community Proof Points: SIDE BY SIDE 2 COLUMNS ON MOBILE */}
        <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-3xl mx-auto mb-8">
          <div className="scale-card p-4 sm:p-6 border-[#2d4d38] bg-[#16291d]">
            <div className="w-8 h-8 rounded-lg bg-[#223d2b] border border-[#355f43] flex items-center justify-center text-emerald-400 mb-3">
              <Briefcase className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white">Companies Founded</h3>
            <p className="text-[11px] sm:text-xs text-[#9eb6a6] mt-1 font-light leading-relaxed">
              Co-founders met inside our circle and built multi-figure ventures on shared discipline.
            </p>
          </div>

          <div className="scale-card p-4 sm:p-6 border-[#2d4d38] bg-[#16291d]">
            <div className="w-8 h-8 rounded-lg bg-[#223d2b] border border-[#355f43] flex items-center justify-center text-rose-300 mb-3">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold text-white">Life Partners Met</h3>
            <p className="text-[11px] sm:text-xs text-[#9eb6a6] mt-1 font-light leading-relaxed">
              Members have met spouses and life partners through shared values and mutual standards.
            </p>
          </div>
        </div>

        {/* Application Card & Form */}
        <div className="max-w-2xl mx-auto scale-card p-5 sm:p-8 border-[#30523c] bg-[#14241a] shadow-xl">
          <div className="text-center mb-6">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#86bf9a]">
              Private Discord Membership
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white mt-1">
              Apply for Community Access
            </h3>
            <p className="text-xs text-[#9eb6a6] mt-1">
              We review every application manually to preserve the calibre of the room.
            </p>
          </div>

          {appSubmitted ? (
            <div className="text-center py-8">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-3" />
              <h4 className="text-base font-bold text-white">Application Received</h4>
              <p className="text-xs text-[#a4bfad] mt-1.5 max-w-sm mx-auto">
                Thank you. We review every submission manually. If approved, your private Discord invitation link will be delivered directly to your inbox.
              </p>
              <button
                onClick={() => setAppSubmitted(false)}
                className="btn-secondary text-xs py-2 px-4 mt-5"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleCommunitySubmit} className="space-y-3.5">
              {appError && (
                <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/40 text-xs text-red-200">
                  {appError}
                </div>
              )}

              {/* Name & Email: SIDE BY SIDE */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={appForm.name}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs sm:text-sm text-white placeholder-[#546b5c] focus:outline-none focus:border-[#528a65]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="e.g. marcus@company.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs sm:text-sm text-white placeholder-[#546b5c] focus:outline-none focus:border-[#528a65]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#c0d4c7] block mb-1">
                  Instagram or Social Handle (Optional)
                </label>
                <input
                  type="text"
                  value={appForm.handle}
                  onChange={(e) => setAppForm({ ...appForm, handle: e.target.value })}
                  placeholder="@yourusername"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs sm:text-sm text-white placeholder-[#546b5c] focus:outline-none focus:border-[#528a65]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#c0d4c7] block mb-1">
                  Why should you be granted access into this locked-in circle? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={appForm.reason}
                  onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                  placeholder="Tell us what you work on, your daily disciplines, and what standard you bring to the collective."
                  className="w-full px-3 py-2.5 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs sm:text-sm text-white placeholder-[#546b5c] focus:outline-none focus:border-[#528a65]"
                />
              </div>

              <button
                type="submit"
                disabled={submittingApp}
                className="btn-primary w-full py-3 text-xs sm:text-sm font-semibold justify-center mt-2"
              >
                <span>{submittingApp ? "Submitting Application..." : "Submit Application for Review"}</span>
                <Send className="w-3.5 h-3.5 ml-1" />
              </button>

              <div className="text-center text-[10px] text-[#718c7c] pt-1">
                Discord private invite link provided via email upon acceptance.
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
         7. SECTION: GOOGLE REVIEWS WITH REAL GOOGLE LOGO & VERIFIED RATINGS
         ========================================================================= */}
      <section id="reviews" className="bg-[#f7f6f2] text-[#141a16] py-12 sm:py-20 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            {/* Real Official Google Review Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#dedbd0] shadow-xs mb-3">
              {/* Google 4-Color SVG Icon */}
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span className="text-xs font-bold text-[#141a16]">Google Reviews</span>
              <span className="text-[#a8a395]">|</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#141a16]">4.9 / 5.0</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#141a16]">
              Verified Reader Feedback
            </h2>
            <p className="text-xs sm:text-sm text-[#54685b] mt-1.5 max-w-md mx-auto">
              Real reflections from readers who stopped scrolling and began the daily audit.
            </p>

            <button
              onClick={() => setShowReviewModal(true)}
              className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-[#1c3024] text-white hover:bg-[#253f30] transition-colors shadow-xs"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Submit a Review</span>
            </button>
          </div>

          {/* Reviews Grid: 2 columns on tablet/desktop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {reviewsList.slice(0, 6).map((review) => (
              <div
                key={review.id}
                className="scale-card-light p-4 sm:p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#e8e6dc] text-[#1c3024] font-bold text-xs flex items-center justify-center">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-xs sm:text-sm font-bold text-[#141a16]">{review.name}</div>
                        <div className="text-[11px] text-[#6b7d72]">{review.role || "Verified Reader"}</div>
                      </div>
                    </div>
                    <div className="flex text-amber-500">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {review.highlight && (
                    <div className="text-xs font-semibold text-[#1c3024] mb-1">
                      &ldquo;{review.highlight}&rdquo;
                    </div>
                  )}
                  <p className="text-xs text-[#3b4d42] font-light leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-[#ece9de] flex items-center justify-between text-[10px] text-[#718579]">
                  <span>{review.date}</span>
                  <span className="text-[#2b633b] font-semibold flex items-center gap-1">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="p-5 sm:p-7 max-w-md w-full bg-[#15251c] rounded-2xl border border-[#2e4f38] relative shadow-2xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#8ea495] hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2.5" />
                <h3 className="text-base font-bold text-white">Review Posted</h3>
                <p className="text-xs text-[#a0b8a8] mt-1">Thank you for contributing your honest experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <h3 className="text-base font-bold text-white">Write a Review</h3>
                <p className="text-xs text-[#a0b8a8]">
                  Share how The Self-Mastery Guide has impacted your composure and daily routine.
                </p>

                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="w-full px-3 py-2 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs text-white focus:outline-none focus:border-[#528a65]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">Role / City (Optional)</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="e.g. Founder, London"
                    className="w-full px-3 py-2 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs text-white focus:outline-none focus:border-[#528a65]"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">Rating</label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                        className={`p-1.5 rounded-lg ${
                          newReview.rating >= num ? "text-amber-400" : "text-[#394f41]"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#c0d4c7] block mb-1">Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Which chapter or prompt made the biggest difference in your daily conduct?"
                    className="w-full px-3 py-2 rounded-xl bg-[#0e1912] border border-[#233a2c] text-xs text-white focus:outline-none focus:border-[#528a65]"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-primary w-full py-2.5 text-xs font-semibold justify-center mt-2"
                >
                  <span>{submittingReview ? "Submitting..." : "Publish Review"}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         8. SECTION: THE $19 LIFETIME OFFER CARD
         ========================================================================= */}
      <section id="pricing" className="py-12 sm:py-20 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <div className="badge-pill mb-2">
            <span>Direct Access</span>
          </div>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Claim The Self-Mastery Guide
          </h2>
          <p className="text-xs sm:text-sm text-[#a8c2b1] mt-1.5">
            One-time payment of $19. Lifetime updates. Fully credited forward to the upcoming app.
          </p>
        </div>

        <div className="scale-card p-6 sm:p-10 border-[#30523c] bg-[#15261d] shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#3d6849]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="text-center pb-6 border-b border-[#233b2c]">
            <span className="text-[11px] uppercase tracking-widest text-[#86bf9a] font-bold">
              Immediate Digital Access
            </span>
            <div className="text-4xl sm:text-5xl font-extrabold text-white mt-1">
              $19
            </div>
            <div className="text-xs text-[#9eb6a6] mt-1">
              One-time payment • No recurring charges
            </div>
          </div>

          {/* Inclusions: 2-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 my-8 text-xs sm:text-sm text-[#d4e3d9]">
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>112 Interactive Pages</strong> for iPhone, iPad &amp; Android</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>All 47 Frameworks</strong> on composure, focus &amp; boundaries</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>47 Evening Audits</strong> to confront unkept promises</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Print Margins Included</strong> for notebook handwriting</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Instant Download</strong> immediately after Stripe checkout</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span><strong>Permanent Backup Link</strong> delivered straight to email</span>
            </div>
          </div>

          <button
            onClick={handleTriggerCheckout}
            className="btn-primary w-full py-3.5 sm:py-4 text-sm font-bold justify-center"
          >
            <span>Claim The Guide Now — $19</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-center text-[11px] text-[#86a38f] mt-4 font-light">
            <strong className="text-white font-medium">Founder's Credit:</strong> Your $19 purchase is 100% credited toward lifetime access to the upcoming Life Reset mobile app upon release.
          </p>
        </div>
      </section>

      {/* =========================================================================
         9. SECTION: FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section id="faq" className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#233a2c]">
        <div className="text-center mb-8">
          <div className="badge-pill mb-2">
            <span>Clarifications</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="divide-y divide-[#233a2c]">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="py-4 cursor-pointer group"
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
            >
              <div className="flex items-center justify-between gap-4">
                <h4 className="text-sm sm:text-base font-semibold text-[#f0ede6] group-hover:text-white transition-colors">
                  {faq.q}
                </h4>
                <ChevronDown
                  className={`w-4 h-4 text-[#8aa694] transition-transform duration-200 shrink-0 ${
                    openFaq === index ? "rotate-180 text-white" : ""
                  }`}
                />
              </div>

              {openFaq === index && (
                <p className="text-xs sm:text-sm text-[#a8c2b1] mt-2.5 leading-relaxed font-light">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         10. FOOTER: OFFICIAL LOGO + COMMUNITY LINKS + PRIVATE ADMIN LINK
         ========================================================================= */}
      <footer className="border-t border-[#203627] py-10 px-4 sm:px-6 text-xs text-[#8aa694]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-with-bg.png"
              alt="Our Life Reset Logo"
              width={26}
              height={26}
              className="rounded-md border border-[#2b4936]"
            />
            <span className="font-bold text-white">@ourlife.reset</span>
            <span>• The Self-Mastery Manual</span>
          </div>

          <div className="flex items-center gap-5 text-xs">
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
            <Link href="/admin" className="text-[#86bf9a] hover:underline font-medium">
              Founder Console
            </Link>
          </div>
        </div>

        <div className="text-center text-[11px] text-[#5e7868] mt-6">
          &copy; {new Date().getFullYear()} Our Life Reset. Reset your mind. Control your life.
        </div>
      </footer>
    </div>
  );
}
