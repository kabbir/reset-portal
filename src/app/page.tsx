"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  Check,
  X,
  Lock,
  Star,
  CheckCircle2,
  PenTool,
  MessageSquarePlus,
  Send,
  ChevronDown
} from "lucide-react";

/* --- Live Stripe Payment Configuration --- */
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

/* --- Official Vector Logos --- */
const AppDashboardLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect width="18" height="18" x="3" y="3" rx="3" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const PdfDocumentLogo = ({ className = "w-7 h-7" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <path d="M9 13v4" />
    <path d="M12 13v4" />
    <path d="M15 13v4" />
  </svg>
);

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

  /* --- Fetch Reviews from Live Persistence API --- */
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



  /* --- Five Internal Traps We Dismantle --- */
  const internalTraps = [
    {
      trap: "The Reactivity Trap",
      symptom:
        "Someone questions your competence or disrespects you, and within 300 milliseconds your body is flooded with biochemical heat—compelling you to fire back, defend your ego, or raise your voice.",
      solutionTitle: "The Somatic Freeze & Downward Cadence",
      solutionText:
        "Drop the shoulders, release the jaw, wait three heartbeats, and cut your speech speed by half. Starve the conflict of emotional oxygen and command the frame through immovable silence."
    },
    {
      trap: "The Shadow Trap",
      symptom:
        "Experiencing intense moral disgust toward someone else's arrogance or vanity while convincing yourself that you are thoroughly decent, harmless, and innocent.",
      solutionTitle: "The Complicity Inventory in Ink",
      solutionText:
        "Writing down where your 'kindness' was actually fear of confrontation, where you envied a peer's win, and owning your private flaws so nobody can weaponize shame against you."
    },
    {
      trap: "The Validation Trap",
      symptom:
        "Compulsively over-explaining your motives in arguments or meetings, broadcasting your moves prematurely, and bleeding authority through nervous chatter.",
      solutionTitle: "Strategic Opacity & The Rule of Seven Words",
      solutionText:
        "Speaking in concise sentences of seven words or fewer, keeping all high-leverage plans completely confidential, and letting finished results shatter the air like thunder."
    },
    {
      trap: "The Struggle Paradox",
      symptom:
        "Frantically trying to force mental peace, obsessing over outcomes outside your control, and burning your vital energy on phantom arguments in the middle of the night.",
      solutionTitle: "The 24-Hour Quarantine & Detachment",
      solutionText:
        "A mandatory 24-hour hold on sending confrontational messages, leaving undisturbed water to clear naturally, and focusing 100% of energy on input while releasing outcomes."
    },
    {
      trap: "The Theory Trap",
      symptom:
        "Hoarding philosophical quotes and books to feel enlightened, while your actual emotional standards collapse the second you face friction with real money or real people.",
      solutionTitle: "The Facing Ruled Ledger",
      solutionText:
        "A daily confrontation on ruled paper where you record cold physical facts of kept promises. You can lie to yourself in your thoughts, but you cannot lie to your own handwriting."
    }
  ];

  /* --- Real Human FAQs --- */
  const faqs = [
    {
      q: "I already read a lot of philosophy and psychology. Will this actually teach me anything new, or is it just rehashed quotes?",
      a: "Most people who read philosophy suffer from the same quiet frustration: they understand the concepts intellectually, but their composure completely dissolves the moment an arrogant person provokes them, a high-stakes deal gets tense, or their ego gets bruised. We didn't build this to give you quotes to recite at dinner. Every chapter bypasses the history lesson and goes straight to the psychological root—why your nervous system hijacks your logic, where your ego is rationalizing weakness, and what physical rules to deploy in that exact room. Then the facing page forces you to write down your own truth. You don't just read it; you diagnose yourself."
    },
    {
      q: "How much time does this actually take each day? I already have an exhausting schedule.",
      a: "Ten to fifteen minutes. This is not a 300-page book you have to carve out an entire Sunday to read, and it's definitely not a textbook with homework. Each chapter is designed as a single two-page checkpoint. You spend three minutes absorbing the psychological principle on the left, and ten minutes working through the unsparing audit prompt on the right. Doing that once a day creates more real behavioral change than binge-reading five books you'll forget by next month."
    },
    {
      q: "Is this just another generic motivational guide with feel-good affirmations?",
      a: "No. There are no vision boards, morning mantras, or toxic positivity here. In fact, if you're looking for something that validates your excuses or pats you on the back, you will probably hate this book. The prompts are deliberately uncomfortable. They force you to examine your shadow, acknowledge where your 'kindness' was really just fear of confrontation, admit where you envied a peer's success, and write down the promises you broke to yourself. It is a tool for self-command, not comfort."
    },
    {
      q: "Do I need an iPad or Apple Pencil to use this, or can I write in a normal notebook?",
      a: "You don't need a tablet at all. While the guide looks beautiful on an iPad in apps like GoodNotes or Apple Books, many readers simply open the PDF on their phone or laptop and write their answers in a physical notebook sitting on their desk. What matters is the act of putting pen to paper. You can lie to yourself in your head all day, but you cannot lie to your own handwriting."
    },
    {
      q: "How does this connect to your daily reels on @ourlife.reset?",
      a: "Our reels are the catalyst—they deliver a 60-second spark of perspective to cut through daily noise. But a reel cannot give you a permanent operating system. This guide is the complete foundation behind those videos: the full psychological frameworks, the real-world field rules, and the daily reflection ledgers needed to actually embody the philosophy rather than just consuming it as content."
    },
    {
      q: "What happens immediately after checkout?",
      a: "The moment Stripe completes your payment, your screen redirects instantly to a private download page with a single-tap download button. We also email a permanent backup access link to your inbox at the same second, so you'll always have access to your file across all your devices with no recurring fees or subscriptions."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white antialiased font-sans">
      {/* Top Glassmorphic Navigation */}
      <nav className="sticky top-0 z-50 apple-subnav-blur border-b border-white/[0.08]">
        <div className="max-w-[1080px] mx-auto px-4 sm:px-6 h-[56px] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/20 shadow-md">
              <Image
                src="/logo-without-bg.png"
                alt="@ourlife.reset logo"
                width={32}
                height={32}
                className="object-cover"
                priority
              />
            </div>
            <span className="text-[14px] font-semibold text-white tracking-tight">
              @ourlife.reset
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#who-its-for" className="hidden md:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              Who It's For
            </a>
            <a href="#traps" className="hidden md:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              The Traps
            </a>
            <a href="#reviews" className="hidden sm:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              Reviews
            </a>
            <a href="#faq" className="hidden sm:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              FAQ
            </a>
            <a
              href="#products"
              className="apple-pill-btn text-[13px] font-semibold px-4 py-1.5 bg-[#0071e3] text-white hover:bg-[#0077ed] transition-all shadow-sm"
            >
              Get Instant Access
            </a>
          </div>
        </div>
      </nav>

      {/* Main Hero Section */}
      <section className="relative z-10 pt-20 pb-16 sm:pt-28 sm:pb-22 px-4 sm:px-6 text-center">
        {/* Subtle Sapphire Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[860px] mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] text-white leading-[1.06] mb-5">
            Reset your mind. <br />
            <span className="blue-gradient-text">Control your life.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[20px] text-[#86868b] max-w-[680px] mx-auto mb-9 font-normal leading-relaxed">
            Our daily reels show you the principles. The Self-Mastery Guide gives you the complete framework to understand your blind spots, master emotional composure under pressure, and build an unshakeable standard of self-command.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#products"
              className="apple-pill-btn w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-[14px] hover:bg-[#e5e5ea] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              <span>Get Instant Access</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#who-its-for"
              className="apple-pill-btn w-full sm:w-auto px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] font-medium text-[14px] transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#2997ff]" />
              <span>Who It's For</span>
            </a>
          </div>

          {/* Clean Compatibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b] pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <PdfDocumentLogo className="w-4 h-4 text-[#2997ff]" />
              <span className="font-medium text-[13px]">Digital Guide & Ruled Journal • <span className="text-[#2997ff]">Instant Access</span></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 text-white/90">
              <PenTool className="w-3.5 h-3.5 text-zinc-300" />
              <span className="font-medium text-[13px]">iPad, Apple Pencil & Print Ready</span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 text-white/70">
              <AppDashboardLogo className="w-4 h-4 text-zinc-400" />
              <span className="font-medium text-[13px]">Life Reset App • <span className="text-zinc-400">In Final Testing</span></span>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Product Showcase */}
      <section id="products" className="relative z-10 py-16 px-4 sm:px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* PRODUCT 1: The Self-Mastery Guide (PDF Edition) - AVAILABLE NOW */}
          <div className="apple-bento-card p-8 sm:p-10 bg-gradient-to-b from-[#111827]/95 via-[#0d1117] to-[#080b10] border-2 border-white/[0.25] flex flex-col justify-between relative shadow-2xl shadow-blue-500/[0.06]">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-white text-black font-bold text-[10px] tracking-widest uppercase shadow-md flex items-center gap-1.5">
              <Star className="w-3 h-3 fill-black" />
              <span>Available Now • Instant Download</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <PdfDocumentLogo className="w-7 h-7 text-[#2997ff]" />
                  <span className="text-[13px] font-semibold text-white tracking-wide">
                    Digital Publication
                  </span>
                </div>
                <span className="text-[11px] font-mono uppercase px-3 py-1 rounded-full bg-white/[0.1] text-white border border-white/[0.15]">
                  Complete Digital Edition
                </span>
              </div>

              <div className="text-[12px] uppercase tracking-wider text-[#2997ff] font-semibold mb-1">
                The Daily Field Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                The Self-Mastery Guide & Workbook
              </h2>
              <p className="text-[14px] text-zinc-300 mt-2 leading-relaxed font-light">
                A publication-grade guide and interactive workbook that synthesizes deep human psychology with unsparing daily self-inquiry.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">$19</span>
                  <span className="text-[13px] text-[#86868b]">one-time download • instant delivery</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-200 mb-8 font-light">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> <b className="text-white">Complete 112-Page Field Manual & Ruled Workbook (PDF)</b>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Deep Essays on Human Nature, Impulse Control & Quiet Strategy
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Facing Ruled Journal Ledgers Designed to Force Radical Self-Honesty
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Real-World Crucible Challenges & 90-Day Character Audit
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Formatted for iPad, Apple Pencil, Kindle, Tablets & Print
                </li>
              </ul>
            </div>

            <button
              onClick={handleTriggerCheckout}
              className="apple-pill-btn w-full py-4 bg-white text-black hover:bg-[#e5e5ea] font-bold text-[13px] tracking-wide uppercase transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              <span>Download The Guide</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* PRODUCT 2: The Life Reset App (Custom Web Application) - FINAL TESTING */}
          <div className="apple-bento-card p-8 sm:p-10 bg-[#080b10]/90 border border-white/[0.08] flex flex-col justify-between relative opacity-90">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#1e293b] text-[#94a3b8] font-bold text-[10px] tracking-widest uppercase border border-white/[0.1] flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#94a3b8]" />
              <span>In Final Testing</span>
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <AppDashboardLogo className="w-7 h-7 text-zinc-400" />
                  <span className="text-[13px] font-semibold text-zinc-300 tracking-wide">
                    Custom Web App
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-zinc-400">
                  <span>Final Testing</span>
                </div>
              </div>

              <div className="text-[12px] uppercase tracking-wider text-zinc-400 font-semibold mb-1">
                The Daily Operating System
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-zinc-200 tracking-tight">
                The Life Reset App
              </h2>
              <p className="text-[14px] text-zinc-400 mt-2 leading-relaxed font-light">
                An interactive daily web application featuring real-time impulse delay protocols, cognitive decision frameworks, and daily self-command audits.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-zinc-400 tracking-tight">$39</span>
                  <span className="text-[13px] text-[#86868b]">final testing • includes the complete guide</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-400 mb-8 font-light">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Will Include The Self-Mastery Guide (Included Free Upon Launch)
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Interactive Impulse Delay & 10-Second Space Tools
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Real-Time Decision Matrix & Crisis Emergency Guides
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Daily Reflection & Habit Journal
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Complete Searchable Wisdom Vault
                </li>
              </ul>
            </div>

            <div>
              <button
                disabled
                className="w-full py-4 bg-white/[0.04] border border-white/[0.1] text-zinc-400 font-semibold text-[13px] tracking-wide uppercase flex items-center justify-center gap-2 cursor-not-allowed rounded-full"
              >
                <Lock className="w-4 h-4 text-zinc-400" />
                <span>In Final Testing</span>
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* WHO NEEDS THIS GUIDE VS WHO DOESN'T (Psychological & Honest) */}
      <section id="who-its-for" className="relative z-10 py-20 px-4 sm:px-6 bg-[#080b10] border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              Who Needs This Guide (And Who Doesn't)
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2 leading-relaxed">
              Be completely honest with yourself before purchasing. This is a practical field manual for self-discipline, not motivational entertainment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Column 1: Who Needs This Guide */}
            <div className="apple-bento-card p-8 sm:p-9 border border-emerald-500/20 bg-gradient-to-b from-[#0d1712]/90 to-[#080b10] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-emerald-500/15">
                  <div className="w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-400">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    This Guide Is For You If...
                  </h3>
                </div>

                <ul className="space-y-4 text-[14px] text-zinc-300 font-light leading-relaxed">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You react emotionally to disrespect, criticism, or sudden friction—and hate yourself afterwards for losing your frame.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You know what you should be doing each day, but fall victim to rationalizations, procrastination, and subtle self-deception.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You want to understand human nature, read silent motives, and practice strategic restraint instead of over-explaining yourself.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You are tired of reading self-help passively and want an uncompromising workbook that forces you to put pen to paper and audit your real behavior.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You want to cultivate genuine internal stillness and walkaway power when the people and noise around you are loud and chaotic.</span>
                  </li>
                </ul>
              </div>

            </div>

            {/* Column 2: Who Should Skip It */}
            <div className="apple-bento-card p-8 sm:p-9 border border-zinc-700/30 bg-gradient-to-b from-[#151012]/80 to-[#080b10] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2.5 mb-5 pb-4 border-b border-red-500/15">
                  <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-400">
                    <X className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-semibold text-white">
                    You Should Skip This Guide If...
                  </h3>
                </div>

                <ul className="space-y-4 text-[14px] text-zinc-400 font-light leading-relaxed">
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You want gentle affirmations or comforting excuses that validate your weaknesses instead of confronting them.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You aren't willing to sit in silence, face your own shortcomings, and write unvarnished truth on paper.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You blame bosses, partners, or market conditions for your reactions instead of taking radical responsibility for your mind.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You prefer accumulating philosophical trivia to talk about at dinner rather than practicing quiet discipline when no one is looking.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You expect someone else to fix your character for you without personal labor.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FIVE INTERNAL TRAPS WE DISMANTLE */}
      <section id="traps" className="relative z-10 py-24 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[1040px] mx-auto">
          <div className="text-center max-w-[660px] mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              Five Traps We Dismantle
            </h2>
            <p className="text-[15px] text-[#86868b] mt-3 leading-relaxed">
              Most of us deal with the same quiet friction every day. The guide replaces each instinctive mistake with a grounded, physical protocol.
            </p>
          </div>

          <div className="space-y-4">
            {internalTraps.map((item, idx) => (
              <div
                key={idx}
                className="apple-bento-card p-6 sm:p-8 border border-white/[0.08] hover:border-white/[0.18] transition-all bg-[#0a0d14]/80 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="md:w-[48%]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-red-400/90 mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                    <span>The Instinctive Trap</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white tracking-tight mb-2">
                    {item.trap}
                  </h3>
                  <p className="text-[13px] text-zinc-400 font-light leading-relaxed">
                    {item.symptom}
                  </p>
                </div>

                <div className="hidden md:block w-px self-stretch bg-white/[0.08]" />

                <div className="md:w-[48%]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#2997ff] mb-1.5 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2997ff]" />
                    <span>The Grounded Shift</span>
                  </div>
                  <h4 className="text-[16px] font-semibold text-white tracking-tight mb-2">
                    {item.solutionTitle}
                  </h4>
                  <p className="text-[13px] text-zinc-300 font-light leading-relaxed">
                    {item.solutionText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVAMPED REVIEWS SECTION: Pure White Canvas with High-End Editorial Aesthetics */}
      <section id="reviews" className="relative z-10 py-24 px-4 sm:px-6 bg-white text-[#111111] border-y border-[#e5e5ea]">
        <div className="max-w-[1040px] mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-16 text-center sm:text-left">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold text-[#111111] tracking-tight">
                Reader Reviews
              </h2>
              <p className="text-[15px] text-[#555555] mt-2">
                Honest feedback from people putting the psychology and written audits to work in real life.
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="apple-pill-btn px-6 py-3 text-[13px] font-semibold bg-[#111111] hover:bg-[#222222] text-white transition-all flex items-center gap-2 cursor-pointer shadow-md shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#0071e3]" />
              <span>Leave a Review</span>
            </button>
          </div>

          {/* Review Cards Grid (Clean White Canvas Palette with Elegant Borders) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviewsList.map((item) => (
              <div
                key={item.id}
                className="p-7 sm:p-8 rounded-2xl bg-[#ffffff] border border-[#e5e5ea] shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-[#c7c7cc] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#0071e3] text-[#0071e3]" />
                      ))}
                    </div>
                    <span className="text-[12px] font-mono text-[#86868b]">
                      {item.date}
                    </span>
                  </div>

                  {item.highlight && (
                    <div className="text-[15px] font-semibold text-[#111111] mb-2.5">
                      &ldquo;{item.highlight}&rdquo;
                    </div>
                  )}

                  <p className="text-[14px] text-[#333333] leading-relaxed font-normal mb-6">
                    &ldquo;{item.comment}&rdquo;
                  </p>
                </div>

                <div className="border-t border-[#f0f0f2] pt-4 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#111111] block text-[13px]">
                      {item.name}
                    </span>
                    {item.role && (
                      <span className="text-[#666666]">{item.role}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Leave a Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-white text-[#111111] border border-[#e5e5ea] shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-[#111111]">Thank You for Your Review</h3>
                <p className="text-[14px] text-[#666666]">Your review has been recorded and added to the ledger.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#111111]">Leave a Reader Review</h3>
                  <p className="text-[13px] text-[#666666] mt-1">Share your honest experience with The Self-Mastery Guide & Workbook.</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1.5 uppercase tracking-wider">Rating</label>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="cursor-pointer p-1"
                      >
                        <Star
                          className={`w-5 h-5 ${
                            star <= newReview.rating
                              ? "fill-[#0071e3] text-[#0071e3]"
                              : "text-zinc-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1.5 uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Marcus D."
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f5f5f7] border border-[#e5e5ea] text-[#111111] text-[13px] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1.5 uppercase tracking-wider">Your Role or Profession (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer, Designer, Operator"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f5f5f7] border border-[#e5e5ea] text-[#111111] text-[13px] focus:outline-none focus:border-[#0071e3]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#333333] mb-1.5 uppercase tracking-wider">Your Honest Review</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="What specific framework or written prompt made the biggest difference in your daily self-command?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#f5f5f7] border border-[#e5e5ea] text-[#111111] text-[13px] focus:outline-none focus:border-[#0071e3] leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs text-[#666666] hover:text-black transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="apple-pill-btn px-6 py-2.5 bg-[#111111] text-white font-semibold text-xs hover:bg-zinc-800 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{submittingReview ? "Posting..." : "Submit Review"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Comprehensive FAQ Section */}
      <section id="faq" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="apple-bento-card overflow-hidden border border-white/[0.06]">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between text-[14px] font-medium text-white hover:text-[#2997ff] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180 text-[#2997ff]" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-[13px] text-[#86868b] leading-relaxed border-t border-white/[0.04] pt-3 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="relative z-10 py-10 px-4 sm:px-6 border-t border-white/[0.08] text-center text-[12px] text-[#86868b]">
        <div className="max-w-[1000px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="relative w-5 h-5 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/logo-without-bg.png"
                alt="@ourlife.reset logo"
                width={20}
                height={20}
                className="object-cover"
              />
            </div>
            <span className="font-semibold text-white">@ourlife.reset</span>
          </div>

          <p className="text-[11px] text-[#86868b]">
            Reset your mind. Control your life. • © 2026 Reset Philosophy
          </p>

          <a
            href={STRIPE_CHECKOUT_URL}
            className="text-[12px] text-[#2997ff] hover:underline"
          >
            Instant PDF Access
          </a>
        </div>
      </footer>
    </div>
  );
}
