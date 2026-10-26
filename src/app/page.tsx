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
  HeartHandshake,
  Briefcase
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
      num: "01",
      title: "The Reset Principle",
      image: "/manifesto-spread-preview.png",
      description:
        "Why short-form motivation leaves you empty, and how 10 minutes of daily written inquiry builds unshakable emotional composure.",
      points: [
        "Passive motivation vs. written confrontation",
        "The 4 quiet laws of self-command",
        "Building composure without broadcasting it"
      ]
    },
    {
      num: "02",
      title: "Strategic Restraint",
      image: "/greene-spread-preview.png",
      description:
        "Field rules for remaining quiet when tested. Learn why pausing and lowering your voice disarms disrespect every time.",
      points: [
        "The 3-second delay before reacting to disrespect",
        "Saying no cleanly without guilt or over-explaining",
        "The daily ledger to audit slipped composure"
      ]
    },
    {
      num: "03",
      title: "Evening Audit",
      image: "/watts-spread-preview.png",
      description:
        "Every evening before sleep, answer 3 honest inquiries to hold yourself accountable for your focus, boundaries, and reactions.",
      points: [
        "Confront excuses before closing your eyes",
        "Pinpoint the exact trigger that derailed your attention",
        "Formatted for mobile typing or handwriting"
      ]
    },
    {
      num: "04",
      title: "The Daily Ledger",
      image: "/book-spread-preview.png",
      description:
        "A 2-page daily checkpoint: read 1 page of principles in the morning, complete 1 page of honest audit before sleep.",
      points: [
        "10 minutes daily: 3 mins reading, 7 mins writing",
        "Fillable interactive fields on iOS & Android",
        "Print-ready margins for your desk journal"
      ]
    }
  ];

  /* 8 Core Principles: Seamless Editorial Layout */
  const corePrinciples = [
    {
      num: "01",
      icon: BookOpen,
      title: "Read 1, Write 1",
      description: "A two-page daily checkpoint. 3 minutes on the law, 7 minutes on the audit."
    },
    {
      num: "02",
      icon: Clock,
      title: "The 3-Second Delay",
      description: "Field rule to pause before replying. Silence is real authority."
    },
    {
      num: "03",
      icon: Feather,
      title: "Evening Audit",
      description: "3 honest questions every night to audit where composure slipped."
    },
    {
      num: "04",
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Native in Apple Books, Files, and GoodNotes with interactive fillable fields."
    },
    {
      num: "05",
      icon: Layers,
      title: "Physical Margins",
      description: "Generous notebook margins if you prefer pen and paper on your desk."
    },
    {
      num: "06",
      icon: Shield,
      title: "Quiet Boundaries",
      description: "Say no cleanly without guilt, apology, or over-explaining."
    },
    {
      num: "07",
      icon: Zap,
      title: "Kill Reactivity",
      description: "Never lose your peace over an offhand message or comment."
    },
    {
      num: "08",
      icon: Lock,
      title: "47 Kept Promises",
      description: "47 consecutive days of verified self-mastery written down."
    }
  ];

  /* FAQs */
  const faqs = [
    {
      q: "I already consume philosophy online. How is this different?",
      a: "Watching videos gives you an intellectual high for thirty seconds, but your composure still dissolves the moment someone baits you. Every single chapter pairs a concise law on the left with an honest written audit on the right. You don't just read about calmness; you document who tested you, why your ego reacted, and what you will do differently next time."
    },
    {
      q: "How much time does this take each day?",
      a: "Ten minutes. This is deliberately not a 400-page academic tome. You spend three minutes reading the principle in the morning, and seven minutes completing the audit prompt before sleep. Doing that daily creates permanent behavioral shifts."
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
         1. HEADER: OFFICIAL LOGO + SEAMLESS BORDERLESS DESIGN
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#111d15]/95 backdrop-blur-md border-b border-[#22382b]/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Official Logo + Name */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-with-bg.png"
              alt="Our Life Reset Official Logo"
              width={32}
              height={32}
              className="rounded-md border border-[#2d4d37] shadow-xs"
              priority
            />
            <span className="text-sm font-bold tracking-tight text-white group-hover:text-[#d3e5d8] transition-colors">
              @ourlife.reset
            </span>
          </Link>

          {/* Desktop Scale-Style Nav */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-[#9eb6a6]">
            <a href="#system" className="hover:text-white transition-colors">The System</a>
            <a href="#spreads" className="hover:text-white transition-colors">Inside Pages</a>
            <a href="#community" className="hover:text-white transition-colors">30k Collective</a>
            <a href="#reviews" className="hover:text-white transition-colors">Reviews</a>
            <a href="#pricing" className="hover:text-white transition-colors">Access</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerCheckout}
              className="btn-primary py-1.5 sm:py-2 px-3 sm:px-4 text-xs font-semibold"
            >
              <span className="hidden sm:inline">Get Guide — $19</span>
              <span className="sm:hidden">Get Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="md:hidden p-1.5 text-[#a7c2b0] hover:text-white transition-colors"
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
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-sm font-medium text-[#d0e0d5] hover:text-white py-1.5 border-b border-[#1c3023]"
            >
              Claim Access ($19)
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
         2. HERO: BOLD, ELEGANT, SEAMLESS • ZERO TAGS • ZERO BOXES
         ========================================================================= */}
      <section className="relative pt-10 sm:pt-20 pb-10 sm:pb-20 px-4 sm:px-6 max-w-5xl mx-auto text-center radial-glow-olive">
        {/* Headline: Bold Editorial Display, zero tags above it */}
        <h1 className="font-display text-[29px] sm:text-5xl lg:text-7xl font-bold tracking-tight text-white max-w-4xl mx-auto leading-[1.12]">
          Reset your mind. <br />
          <span className="text-[#d8ebd9]">Control your life.</span>
        </h1>

        {/* Subtitle: Direct, human, high-agency */}
        <p className="mt-3.5 sm:mt-6 text-xs sm:text-base text-[#bfd4c6] max-w-lg mx-auto font-light leading-relaxed">
          A 112-page manual to eliminate overthinking, master emotional composure, and rebuild daily discipline. Read 1 page in the morning, write 1 page at night.
        </p>

        {/* Hero Actions: SIDE-BY-SIDE ON MOBILE */}
        <div className="mt-6 sm:mt-9 flex flex-row items-center justify-center gap-2.5 sm:gap-3 w-full max-w-xs sm:max-w-sm mx-auto">
          <button
            onClick={handleTriggerCheckout}
            className="btn-primary flex-1 py-3 px-3 sm:px-4 text-xs sm:text-sm font-semibold truncate"
          >
            <span>Claim Guide — $19</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </button>

          <a
            href="#spreads"
            className="btn-secondary flex-1 py-3 px-3 sm:px-3.5 text-xs sm:text-sm font-medium truncate"
          >
            <Eye className="w-3.5 h-3.5 text-[#a4c9b0] shrink-0" />
            <span>Look Inside</span>
          </a>
        </div>

        {/* Seamless Typographic Proof Strip: ZERO BOXES */}
        <div className="grid grid-cols-3 divide-x divide-[#233a2c]/80 mt-8 max-w-xs sm:max-w-md mx-auto pt-5 border-t border-[#233a2c]/60">
          <div className="text-center px-1 sm:px-3">
            <div className="text-xs sm:text-base font-bold text-white tracking-tight">30,000+</div>
            <div className="text-[9px] sm:text-xs text-[#8ca896] uppercase tracking-wider mt-0.5">Community</div>
          </div>
          <div className="text-center px-1 sm:px-3">
            <div className="text-xs sm:text-base font-bold text-amber-300 flex items-center justify-center gap-1 tracking-tight">
              <Star className="w-3 h-3 fill-amber-300" />
              <span>4.9</span>
            </div>
            <div className="text-[9px] sm:text-xs text-[#8ca896] uppercase tracking-wider mt-0.5">Google</div>
          </div>
          <div className="text-center px-1 sm:px-3">
            <div className="text-xs sm:text-base font-bold text-white tracking-tight">112 Pages</div>
            <div className="text-[9px] sm:text-xs text-[#8ca896] uppercase tracking-wider mt-0.5">PDF Guide</div>
          </div>
        </div>

        {/* Hero Mockup Preview: Sits cleanly on the canvas */}
        <div className="mt-10 sm:mt-14 relative max-w-3xl mx-auto border-t border-b border-[#2c4737]/70 py-4 sm:py-6">
          <Image
            src="/hero-mockup-luxury.jpg"
            alt="The Self-Mastery Guide open on iPad and iPhone"
            width={1200}
            height={675}
            className="w-full h-auto object-cover"
            priority
          />
          <div className="mt-3 flex items-center justify-between text-[11px] text-[#9eb6a6] font-light">
            <span>Daily Ledger • Section 3 Written Audit</span>
            <span className="text-emerald-400 font-medium">Apple Books, Files &amp; GoodNotes Ready</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. SECTION: CONTRASTING WARM CREAM PROOF STRIP (SEAMLESS, NO BOXES)
         ========================================================================= */}
      <section className="bg-[#f7f6f2] text-[#141a16] py-10 sm:py-14 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141a16]">
                The standard for high-agency minds.
              </h2>
              <p className="text-xs sm:text-sm text-[#4d5f53] mt-1 font-light max-w-md">
                An uncompromising daily discipline manual for emotional composure, clear thinking, and zero excuses.
              </p>
            </div>

            {/* Seamless Typographic Metrics: ZERO BOXES */}
            <div className="grid grid-cols-3 gap-6 w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 md:border-l border-[#dcd8cb] md:pl-8">
              <div>
                <div className="text-sm font-bold text-[#1d3023]">Instant Access</div>
                <div className="text-xs text-[#5e6f63] mt-0.5">1-Tap Direct Link</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1d3023]">Lifetime Updates</div>
                <div className="text-xs text-[#5e6f63] mt-0.5">No Subscriptions</div>
              </div>
              <div>
                <div className="text-sm font-bold text-[#1d3023]">Founder Credit</div>
                <div className="text-xs text-[#5e6f63] mt-0.5">$19 Credited to App</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. SECTION: THE SYSTEM (8 RULES) • SEAMLESS EDITORIAL GRID • ZERO BOXES
         ========================================================================= */}
      <section id="system" className="py-14 sm:py-24 px-4 sm:px-6 max-w-5xl mx-auto">
        <div className="mb-10 sm:mb-14">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Built for how you actually live.
          </h2>
          <p className="text-sm text-[#a8c2b1] mt-2 font-light max-w-md">
            A frictionless routine designed to build quiet self-command without overwhelming your calendar.
          </p>
        </div>

        {/* SEAMLESS EDITORIAL GRID: 2 COLUMNS ON MOBILE, 4 ON DESKTOP, ZERO BOXES */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 sm:gap-x-10 gap-y-10 border-t border-[#233a2c]/80 pt-8">
          {corePrinciples.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-[#6c8f77] pb-1 border-b border-[#233a2c]/60">
                  <span>{item.num}</span>
                  <Icon className="w-3.5 h-3.5 text-[#86bf9a]" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                  {item.title}
                </h3>
                <p className="text-xs text-[#9eb6a6] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
         5. SECTION: LOOK INSIDE THE PAGES (SEAMLESS EDITORIAL PRESENTATION)
         ========================================================================= */}
      <section id="spreads" className="bg-[#faf9f5] text-[#141a16] py-14 sm:py-24 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-[#141a16]">
              Look inside the pages.
            </h2>
            <p className="text-xs sm:text-sm text-[#54685b] mt-2 max-w-lg font-light">
              Every chapter pairs a psychological law on the left with an honest written audit on the right.
            </p>

            {/* Clean Underline Text Tabs: ZERO PILLS OR BOXES */}
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-6 pt-4 border-t border-[#e2dfd4]">
              {spreads.map((spread, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSpreadTab(idx)}
                  className={`pb-1 text-xs sm:text-sm font-semibold transition-all border-b-2 ${
                    activeSpreadTab === idx
                      ? "border-[#1c3024] text-[#141a16]"
                      : "border-transparent text-[#7e8f83] hover:text-[#141a16]"
                  }`}
                >
                  <span>{spread.num} / {spread.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Active Spread Container: Sits gracefully without card box */}
          <div className="max-w-4xl mx-auto border-t border-b border-[#e2dfd4] py-6">
            <div className="relative overflow-hidden border border-[#e2dfd4] bg-[#f5f4ee]">
              <Image
                src={spreads[activeSpreadTab].image}
                alt={spreads[activeSpreadTab].title}
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </div>

            {/* Seamless Description & Points: ZERO BOXES */}
            <div className="mt-6 pt-4 border-t border-[#e2dfd4] flex flex-col md:flex-row md:items-start justify-between gap-6">
              <div className="md:max-w-md">
                <h3 className="text-base sm:text-lg font-bold text-[#141a16]">
                  {spreads[activeSpreadTab].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4b5c51] font-light leading-relaxed mt-1">
                  {spreads[activeSpreadTab].description}
                </p>
              </div>

              <div className="space-y-1.5 md:min-w-[280px]">
                {spreads[activeSpreadTab].points.map((pt, pIdx) => (
                  <div key={pIdx} className="flex items-start gap-2 text-xs text-[#2b3a30]">
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
         6. SECTION: THE 30,000 LOCKED-IN COLLECTIVE (SEAMLESS COMMUNITY APPLICATION)
         ========================================================================= */}
      <section id="community" className="py-14 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="mb-10">
          <h2 className="font-display text-3xl sm:text-5xl font-bold text-white tracking-tight">
            The 30,000 Locked-In Collective.
          </h2>
          <p className="text-xs sm:text-sm text-[#a8c2b1] mt-2 max-w-lg font-light leading-relaxed">
            An uncompromising circle of high-agency individuals who value quiet execution, high taste, and deep discipline.
          </p>
        </div>

        {/* Community Proof Statements: ZERO BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8 border-y border-[#233a2c]/70 mb-10">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>Ventures &amp; Co-Founders</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">Companies Built Inside</h3>
            <p className="text-xs sm:text-sm text-[#9eb6a6] font-light leading-relaxed">
              Co-founders met inside our private network and launched multi-figure companies founded on shared discipline.
            </p>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-rose-300 text-xs font-mono uppercase tracking-widest">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Spouses &amp; Life Partners</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white">Partnerships Formed</h3>
            <p className="text-xs sm:text-sm text-[#9eb6a6] font-light leading-relaxed">
              Members have met spouses and life partners through aligned values and mutual emotional composure.
            </p>
          </div>
        </div>

        {/* Seamless Luxury Application Form: ZERO BOXES, UNDERLINE INPUTS */}
        <div className="max-w-2xl mx-auto pt-4">
          <div className="mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Apply for Private Discord Access
            </h3>
            <p className="text-xs text-[#9eb6a6] mt-1 font-light">
              We review every application manually to preserve the calibre of the room.
            </p>
          </div>

          {appSubmitted ? (
            <div className="py-8 text-center border-t border-b border-[#233a2c]">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2.5" />
              <h4 className="text-base font-bold text-white">Application Received</h4>
              <p className="text-xs text-[#a4bfad] mt-1 max-w-sm mx-auto font-light">
                Thank you. We review every submission manually. If approved, your private Discord invitation link will be delivered directly to your email.
              </p>
              <button
                onClick={() => setAppSubmitted(false)}
                className="btn-secondary text-xs py-2 px-4 mt-4"
              >
                Submit another response
              </button>
            </div>
          ) : (
            <form onSubmit={handleCommunitySubmit} className="space-y-5">
              {appError && (
                <div className="p-3 bg-red-950/50 border border-red-500/30 text-xs text-red-200">
                  {appError}
                </div>
              )}

              {/* Name & Email: Seamless Underlines */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#9eb6a6] block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={appForm.name}
                    onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="input-seamless"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase tracking-wider text-[#9eb6a6] block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="e.g. marcus@company.com"
                    className="input-seamless"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#9eb6a6] block mb-1">
                  Instagram or Social Handle (Optional)
                </label>
                <input
                  type="text"
                  value={appForm.handle}
                  onChange={(e) => setAppForm({ ...appForm, handle: e.target.value })}
                  placeholder="@yourusername"
                  className="input-seamless"
                />
              </div>

              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-[#9eb6a6] block mb-1">
                  Why should you be granted access into this locked-in circle? *
                </label>
                <textarea
                  required
                  rows={3}
                  value={appForm.reason}
                  onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                  placeholder="Tell us what you work on, your daily disciplines, and what standard you bring to the collective."
                  className="input-seamless resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submittingApp}
                  className="btn-primary w-full sm:w-auto py-3 px-8 text-xs sm:text-sm font-semibold justify-center"
                >
                  <span>{submittingApp ? "Submitting..." : "Submit Application for Review"}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
                <span className="text-[11px] text-[#718c7c] font-light">
                  Discord link provided via email upon acceptance.
                </span>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* =========================================================================
         7. SECTION: GOOGLE REVIEWS (SEAMLESS EDITORIAL QUOTES • ZERO BOXES)
         ========================================================================= */}
      <section id="reviews" className="bg-[#f7f6f2] text-[#141a16] py-14 sm:py-24 border-y border-[#e2dfd4]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-[#e2dfd4]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                {/* Official Google 4-Color Logo */}
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
                <span className="text-xs font-bold text-[#141a16] tracking-wide">Google Reviews</span>
                <span className="text-[#a8a395]">·</span>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#141a16]">4.9 / 5.0</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#141a16]">
                Verified Reader Reflections
              </h2>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-[#1c3024] text-white hover:bg-[#253f30] rounded-full transition-colors"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Submit a Review</span>
            </button>
          </div>

          {/* Seamless Editorial Review Quotes: ZERO BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {reviewsList.slice(0, 6).map((review) => (
              <div key={review.id} className="space-y-2 pb-6 border-b border-[#e2dfd4]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#141a16]">{review.name}</span>
                    <span className="text-xs text-[#6b7d72]">· {review.role || "Verified Reader"}</span>
                  </div>
                  <div className="flex text-amber-500">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>

                {review.highlight && (
                  <div className="text-xs font-bold text-[#1c3024]">
                    &ldquo;{review.highlight}&rdquo;
                  </div>
                )}
                <p className="text-xs sm:text-sm text-[#3b4d42] font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>

                <div className="pt-1 flex items-center justify-between text-[11px] text-[#718579]">
                  <span>{review.date}</span>
                  <span className="text-[#2b633b] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Purchase</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review Submission Modal (Clean Minimal Backdrop) */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="p-6 sm:p-8 max-w-md w-full bg-[#15251c] border border-[#2e4f38] relative shadow-2xl">
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
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white">Write a Review</h3>
                <p className="text-xs text-[#a0b8a8] font-light">
                  Share how The Self-Mastery Guide has impacted your composure and daily routine.
                </p>

                <div>
                  <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    placeholder="e.g. Marcus Vance"
                    className="input-seamless"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">Role / City (Optional)</label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="e.g. Founder, London"
                    className="input-seamless"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">Rating</label>
                  <div className="flex gap-1.5 pt-1">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReview({ ...newReview, rating: num })}
                        className={`p-1 ${
                          newReview.rating >= num ? "text-amber-400" : "text-[#394f41]"
                        }`}
                      >
                        <Star className="w-4 h-4 fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="Which chapter or prompt made the biggest difference in your daily conduct?"
                    className="input-seamless resize-none"
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
         8. SECTION: BOLD SEAMLESS $19 OFFER (ZERO BOXES)
         ========================================================================= */}
      <section id="pricing" className="py-16 sm:py-28 px-4 sm:px-6 max-w-4xl mx-auto text-center border-t border-[#233a2c]/70">
        <h2 className="font-display text-3xl sm:text-6xl font-bold text-white tracking-tight">
          One payment. Lifetime access.
        </h2>
        <div className="text-5xl sm:text-7xl font-extrabold text-white my-4">
          $19
        </div>
        <p className="text-xs sm:text-sm text-[#9eb6a6] max-w-md mx-auto font-light leading-relaxed">
          One-time payment. Immediate digital access. Your $19 purchase is 100% credited toward the upcoming Life Reset mobile app.
        </p>

        {/* Seamless Deliverables: ZERO BOXES */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-10 max-w-2xl mx-auto text-left py-8 border-y border-[#233a2c]/70 my-8 text-xs sm:text-sm text-[#d4e3d9]">
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
          className="btn-primary py-4 px-10 text-sm sm:text-base font-bold shadow-lg"
        >
          <span>Claim The Guide Now — $19</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>

        <p className="text-center text-[11px] text-[#86a38f] mt-4 font-light max-w-sm mx-auto">
          <strong className="text-white font-medium">Founder's Credit:</strong> Full $19 credited toward VIP lifetime registration for the upcoming app.
        </p>
      </section>

      {/* =========================================================================
         9. SECTION: FREQUENTLY ASKED QUESTIONS (SEAMLESS ACCORDION)
         ========================================================================= */}
      <section id="faq" className="py-14 sm:py-20 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#233a2c]/70">
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-white tracking-tight mb-8">
          Frequently Asked Questions
        </h2>

        <div className="divide-y divide-[#233a2c]/70">
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
         10. FOOTER: SEAMLESS MINIMAL FOOTER
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
          </div>

          <div className="flex items-center gap-6 text-xs">
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
