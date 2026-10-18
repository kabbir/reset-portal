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
  Compass,
  Eye,
  Shield,
  Feather,
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

  /* --- The 5 Core Psychological Engines of the 112 Pages --- */
  const psychologicalEngines = [
    {
      icon: Eye,
      title: "Deconstructing Reactivity & The 10-Second Space",
      subtitle: "Short-circuiting the biochemical impulse to retaliate, explain, or lose composure",
      psychology:
        "When an insult, disrespect, or crisis strikes, your amygdala triggers an immediate fight-or-flight surge within 300 milliseconds. We unpack the neuroscience of emotional hijacking and ego-threat: showing why your immediate urge to defend yourself is not strength, but psychological fragility handing control directly to whoever provoked you.",
      actionableInsight:
        "The Somatic Freeze & Downward Cadence: The microsecond you sense defensiveness, deliberately unclench your jaw, drop your shoulders, and wait three heartbeats before speaking. Cut your vocal cadence in half and reply using seven words or fewer to starve conflict of oxygen.",
      writtenConfrontation:
        "The facing written ledger corners you to write down the exact recurring trigger or individual that provoked your last outburst. You are forced to trace the hidden insecurity you were defending, write down your complicity in the escalation, and script the exact monosyllabic response you will deploy next time. You cannot lie to your own handwriting."
    },
    {
      icon: Shield,
      title: "The Shadow & The Anatomy of Self-Deception",
      subtitle: "Unearthing the unconscious bitterness, vanity, and fear you project onto other people",
      psychology:
        "Carl Jung shattered the comfortable illusion of the 'harmless' person: every human psyche carries a shadow packed with repressed aggression, envy, and cowardice. When you feel visceral disgust toward someone else's arrogance or ambition, you are almost always gazing into your own disowned reflection. Unintegrated darkness inevitably leaks out as toxic passive-aggression and self-sabotage.",
      actionableInsight:
        "Controlled Formidability: Abandon harmlessness. Virtue is not being incapable of inflicting damage; it is knowing your destructive capacities and consciously choosing discipline. Replace cowardly compliance with non-negotiable boundaries, and direct dark energy into relentless creative output.",
      writtenConfrontation:
        "The Shadow Integration Audit removes the word 'victim' from your vocabulary. You sit with pen in hand and answer prompts that leave no room for diplomatic excuses: writing where your apparent kindness was actually fear of conflict, where you secretly envied someone's win, and what unvarnished truth you have been avoiding in the mirror."
    },
    {
      icon: Compass,
      title: "Primate Status, Human Nature & Quiet Strategy",
      subtitle: "Reading hidden motives, practicing emotional opacity, and winning without fighting",
      psychology:
        "The world is not governed by naive idealism; it is ruled by ancient laws of status competition, mimetic desire, and insecurity. People do not evaluate your secret good intentions; they judge the boundaries, scarcity, and emotional self-containment you project. Frantic over-explaining and public venting strip you of all leverage.",
      actionableInsight:
        "Tactical Empathy & The Golden Bridge: Never attack head-on. Map your counterparty's secret terrors and status drivers, build them a face-saving exit that lets them claim cosmetic victory while conceding strategic terrain, and enforce absolute project opacity until your results shatter the air like thunder.",
      writtenConfrontation:
        "The Strategic Restraint Audit forces you to conduct a forensic inventory of your recent speech and alliances. You write down exactly where you gave away leverage by seeking premature validation, where you failed to walk away, and what non-negotiable standards you are instituting in secret."
    },
    {
      icon: Feather,
      title: "The Backward Law & The Art of Psychological Stillness",
      subtitle: "Breaking the cycle of compulsive overthinking and desperate outcome-chasing",
      psychology:
        "The psychological paradox of effort: the more frantically you pursue peace or certainty, the more internal panic you generate. Just as muddy water can only be cleared by leaving it alone, mental clarity returns only when you stop fighting your internal states and release obsession with things outside your control.",
      actionableInsight:
        "The 24-Hour Quarantine & Radical Acceptance: When indignation or anxiety strikes, enforce a mandatory 24-hour quarantine before sending any message or making any major pivot. Separate cold physical facts from the tragic narrative your mind invented about those facts.",
      writtenConfrontation:
        "The Evening Reckoning Ledger demands cold physical proof. Instead of abstract journaling, you record three verified facts of kept promises, audit where you wasted emotional energy on things you cannot control, and write down the exact mental loops you are releasing before sleep."
    },
    {
      icon: BookOpen,
      title: "Field Crucibles & The 90-Day Character Review",
      subtitle: "Taking philosophy out of the intellect and proving it through embodied behavioral friction",
      psychology:
        "Accumulating philosophical ideas without behavioral execution is merely intellectual vanity. If your principles collapse the moment money, ego, or conflict is tested in real conditions, you do not possess a philosophy—you have an ornament. Character is forged exclusively through voluntary friction.",
      actionableInsight:
        "Five Non-Negotiable Crucibles: Practical tests embedded into your everyday environment: 72 hours of voluntary discomfort, extended tactical silence in contentious meetings, uncredited anonymous labor, and ruthless boundary enforcement.",
      writtenConfrontation:
        "The 90-Day Character Review is a quarterly forensic audit. You sit down with your historical entries and evaluate your behavioral consistency across 90 days with clinical detachment. Your own handwriting becomes the mirror that proves whether your standards held firm."
    }
  ];

  /* --- FAQs (112-Page Edition Details) --- */
  const faqs = [
    {
      q: "What is the exact format of The Self-Mastery Guide & Workbook?",
      a: "The Self-Mastery Guide ($19) is an archival 112-page digital book and interactive iPad workbook (PDF). It features 47 dense psychological chapters on the left-hand pages, paired with 47 dedicated ruled journaling ledgers with daily tracking bars on the right-hand pages. It is engineered with classical Cormorant Garamond typography and standard A4 proportions for iPad, Kindle, tablets, and print."
    },
    {
      q: "How do I write in the workbook on an iPad or tablet?",
      a: "The PDF is fully compatible with Apple Books, GoodNotes, Notability, Kindle, and any standard tablet PDF annotation app. You can write directly into the ruled audit ledgers with your Apple Pencil or stylus, or print physical copies of the ledgers for daily handwriting."
    },
    {
      q: "What is the difference between the $19 Guide and the upcoming App?",
      a: "The Self-Mastery Guide ($19) is available right now for instant download. It provides the complete 112-page foundation of psychology, actionable field protocols, and written audit ledgers. The Life Reset App ($39) is our upcoming interactive web application featuring real-time impulse delay protocols, cognitive decision guides, and a searchable wisdom vault—and it will include this complete 112-page guide for free upon launch."
    },
    {
      q: "How and when do I receive my guide after checkout?",
      a: "Instant delivery. The moment your Stripe checkout completes, your secure download button unlocks on the confirmation screen for a 1-tap download. A permanent receipt and backup access link are also emailed to you immediately."
    },
    {
      q: "Can I print the guide at home or through a local bindery?",
      a: "Yes. The guide is typeset in pure classical monochrome (100% black and white, zero colored ink boxes) at 300+ DPI. It prints cleanly on any standard home printer or high-end paper."
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
            <a href="#whats-inside" className="hidden md:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              What's Inside
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
              Get Instant Access ($19)
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
            Our daily reels show you the principles. The 112-page Self-Mastery Guide gives you the complete blueprint to understand your psychological blind spots, master emotional composure under pressure, and build an unshakeable standard of self-command.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-12">
            <a
              href="#products"
              className="apple-pill-btn w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-[14px] hover:bg-[#e5e5ea] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              <span>Get Instant Download ($19)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#whats-inside"
              className="apple-pill-btn w-full sm:w-auto px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] font-medium text-[14px] transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#2997ff]" />
              <span>Explore The 112 Pages</span>
            </a>
          </div>

          {/* Clean Compatibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b] pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <PdfDocumentLogo className="w-4 h-4 text-[#2997ff]" />
              <span className="font-medium text-[13px]">112-Page Field Manual • <span className="text-[#2997ff]">Available Now</span></span>
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
          
          {/* PRODUCT 1: The Self-Mastery Guide (112-Page PDF) - AVAILABLE NOW */}
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
                  112-Page Edition
                </span>
              </div>

              <div className="text-[12px] uppercase tracking-wider text-[#2997ff] font-semibold mb-1">
                The Daily Field Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                The Self-Mastery Guide & Workbook
              </h2>
              <p className="text-[14px] text-zinc-300 mt-2 leading-relaxed font-light">
                A 112-page publication-grade guide and interactive iPad workbook that synthesizes deep human psychology with brutal daily self-inquiry.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">$19</span>
                  <span className="text-[13px] text-[#86868b]">one-time download • instant delivery</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-200 mb-8 font-light">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> <b className="text-white">Full 112-Page Field Manual & Ruled Workbook (PDF)</b>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 Dense Excerpt Chapters on Psychology, Power & Human Nature
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 Facing Ruled Ledgers Designed to Force Radical Self-Honesty
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 5 Capstone Crucible Challenges & 90-Day Character Review
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
              <span>Get Instant Download ($19)</span>
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
                  <span className="text-[13px] text-[#86868b]">final testing • will include $19 guide</span>
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

              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-emerald-400 font-mono">
                ✓ Built for psychological depth & real-world accountability
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

              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-zinc-500 font-mono">
                ✕ Save your $19 if you aren't ready to face yourself in writing
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S INSIDE: Deep Psychology, Real-World Action & The Written Audit */}
      <section id="whats-inside" className="relative z-10 py-24 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[1060px] mx-auto">
          <div className="text-center max-w-[720px] mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-semibold text-white tracking-tight">
              The Architecture of the 112 Pages
            </h2>
            <p className="text-[15px] text-[#86868b] mt-3 leading-relaxed">
              Every chapter is engineered as an unsparing two-page engine: ruthless depth psychology and field protocols on the left, and a facing written audit on the right that forces you to confront yourself on paper.
            </p>
          </div>

          <div className="space-y-8">
            {psychologicalEngines.map((engine, idx) => {
              const Icon = engine.icon;
              return (
                <div
                  key={idx}
                  className="apple-bento-card p-6 sm:p-9 border border-white/[0.08] hover:border-white/[0.16] transition-all bg-[#0a0d14]/90"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-[#2997ff]/10 text-[#2997ff] flex items-center justify-center shrink-0 border border-[#2997ff]/20">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white tracking-tight">
                          {engine.title}
                        </h3>
                        <div className="text-[13px] text-[#86868b] mt-0.5">
                          {engine.subtitle}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Pillar 1: Depth Psychology */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-[#2997ff] mb-2.5 flex items-center gap-1.5">
                          <span>1. Depth Psychology</span>
                        </div>
                        <p className="text-[13px] text-zinc-300 leading-relaxed font-light">
                          {engine.psychology}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 font-mono">
                        Deconstructing The Internal Hijack
                      </div>
                    </div>

                    {/* Pillar 2: Real-Life Action Protocol */}
                    <div className="p-5 rounded-xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2.5 flex items-center gap-1.5">
                          <span>2. Real-Life Field Protocol</span>
                        </div>
                        <p className="text-[13px] text-zinc-300 leading-relaxed font-light">
                          {engine.actionableInsight}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-zinc-500 font-mono">
                        Execution In Real-World Friction
                      </div>
                    </div>

                    {/* Pillar 3: The Forced Written Audit */}
                    <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08] flex flex-col justify-between">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-wider text-amber-300/90 mb-2.5 flex items-center gap-1.5">
                          <PenTool className="w-3.5 h-3.5 text-amber-300" />
                          <span>3. The Facing Written Audit</span>
                        </div>
                        <p className="text-[13px] text-zinc-200 leading-relaxed font-light">
                          {engine.writtenConfrontation}
                        </p>
                      </div>
                      <div className="mt-4 pt-3 border-t border-white/[0.04] text-[11px] text-zinc-400 font-mono">
                        You Cannot Lie To Your Own Handwriting
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
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
            Instant PDF Access ($19)
          </a>
        </div>
      </footer>
    </div>
  );
}
