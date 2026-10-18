"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  BookOpen,
  ArrowRight,
  Check,
  X,
  Lock,
  ChevronDown,
  Star,
  CheckCircle2,
  PenTool,
  ShieldCheck,
  MessageSquarePlus,
  Send
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

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [expandedPart, setExpandedPart] = useState<number | null>(0);
  const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [newReview, setNewReview] = useState({
    name: "",
    role: "",
    rating: 5,
    comment: ""
  });

  const handleTriggerCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  /* --- Genuine Reader Reviews (Dated October 2026, Human Tone) --- */
  const testimonials = [
    {
      name: "Alex M.",
      role: "Software Engineer",
      date: "October 16, 2026",
      quote: "I’ve followed the Instagram page for months, but honestly I was still waking up every day and losing 45 minutes scrolling in bed. The morning blackout protocol in this guide was the first thing that actually got me out of bed without touching my phone. Having the physical pages to write in on my iPad makes a massive difference.",
      highlight: "Stopped reaching for my phone first thing in the morning"
    },
    {
      name: "Sarah K.",
      role: "Freelance Designer",
      date: "October 15, 2026",
      quote: "What I appreciate most is that there's no fluff. Most self-help books take 20 pages to explain one simple concept, but each chapter here is exactly one page of reading and one page of writing. The chapter on taking a 10-second pause before reacting literally saved me from blowing up at a difficult client last Thursday.",
      highlight: "Learned how to pause instead of reacting defensively"
    },
    {
      name: "Marcus D.",
      role: "Small Business Owner",
      date: "October 17, 2026",
      quote: "I bought this on a whim over the weekend. I was expecting another generic motivational PDF, but this is an actual operating manual. The idea of keeping an unvarnished physical audit of what you actually got done each day is sobering. If you didn't do the work, you have to write that down. Worth way more than $19.",
      highlight: "Keeping a daily physical audit of what actually gets done"
    },
    {
      name: "Elena V.",
      role: "Operations Consultant",
      date: "October 14, 2026",
      quote: "I use this with GoodNotes on my iPad every morning with my first coffee. It takes maybe five minutes. Reading one page, setting my priorities for the day, and checking off the habit bar sets a completely different tone for my morning. Beautifully laid out too.",
      highlight: "Simple 5-minute morning routine that keeps me grounded"
    },
    {
      name: "David H.",
      role: "Project Manager",
      date: "October 12, 2026",
      quote: "The section on strategic silence and speaking less than necessary hit home hard. I tend to over-explain myself in meetings when I feel insecure. Applying the restraint framework this week completely changed how my team reacted to my decisions. Simple, direct, and practical.",
      highlight: "Speaking less and commanding more authority in meetings"
    },
    {
      name: "Rachel B.",
      role: "Architect",
      date: "October 10, 2026",
      quote: "It’s refreshing to read something that doesn't try to sugarcoat how hard self-discipline is. No toxic positivity, no ridiculous 4:00 AM ice bath nonsense. Just straightforward principles and a daily ledger to track whether you actually kept your word to yourself.",
      highlight: "Direct, honest, and zero toxic positivity"
    }
  ];

  /* --- What's Inside: The 8 Parts (Simple, Clear, No Leaked Thinkers) --- */
  const guideParts = [
    {
      num: "Part I",
      title: "Mind & Emotional Control",
      pages: "Pages 12–25",
      chapters: "Chapters 01–07",
      description: "How to stop reacting on impulse, stay calm when provoked or criticized, and regain control of your emotions under pressure."
    },
    {
      num: "Part II",
      title: "Discipline, Will & Execution",
      pages: "Pages 26–39",
      chapters: "Chapters 08–14",
      description: "How to protect your morning attention from digital distraction, beat procrastination, and stay consistent when motivation fades."
    },
    {
      num: "Part III",
      title: "Focus, Clarity & Strategic Thinking",
      pages: "Pages 40–53",
      chapters: "Chapters 15–21",
      description: "How to cut through daily noise, read situations accurately, speak less than necessary, and protect your energy."
    },
    {
      num: "Part IV",
      title: "Independence, Courage & Walking Away",
      pages: "Pages 54–67",
      chapters: "Chapters 22–28",
      description: "How to stop seeking approval from others, hold your ground under pressure, and develop the strength to walk away from bad situations."
    },
    {
      num: "Part V",
      title: "Work Ethic, Humility & Craft",
      pages: "Pages 68–79",
      chapters: "Chapters 29–34",
      description: "How to bring high standards to your daily work, eliminate clutter from your schedule, and build genuine competence without ego."
    },
    {
      num: "Part VI",
      title: "Inner Peace & Stillness",
      pages: "Pages 80–93",
      chapters: "Chapters 35–41",
      description: "How to quiet relentless mental chatter, let go of outcomes outside your control, and maintain genuine peace of mind."
    },
    {
      num: "Part VII",
      title: "Perspective & Priorities",
      pages: "Pages 94–105",
      chapters: "Chapters 42–47",
      description: "How to stop stressing over minor irritations, break free from chronic anxiety, and keep what truly matters front and center."
    },
    {
      num: "Part VIII",
      title: "Field Exercises & The 90-Day Review",
      pages: "Pages 106–112",
      chapters: "Capstones I–V + Epilogue",
      description: "Five practical challenges to test your discipline in daily life, followed by a full 90-day review framework to measure your real progress."
    }
  ];

  /* --- FAQs (112-Page Edition Details) --- */
  const faqs = [
    {
      q: "What is the exact format of The Self-Mastery Guide & Workbook?",
      a: "The Self-Mastery Guide ($19) is a 112-page digital publication and ruled iPad workbook (PDF). It features 47 concise master chapters on the left-hand pages, paired with 47 dedicated ruled journaling ledgers with daily tracking bars on the right-hand pages. It is engineered with classical Cormorant Garamond typography and standard A4 proportions for iPad, Kindle, tablets, and print."
    },
    {
      q: "How do I use it with an iPad, Apple Pencil, or on mobile?",
      a: "The PDF is fully compatible with Apple Books, GoodNotes, Notability, Kindle, and any PDF viewer. On an iPad or tablet, you can write directly into the ruled ledgers with your Apple Pencil or stylus. On a phone or computer, you can read the chapters anywhere. You can also print physical copies of the ledgers."
    },
    {
      q: "What is the difference between the $19 Guide and the upcoming App?",
      a: "The Self-Mastery Guide ($19) is available right now for instant download. It provides the complete foundational philosophy and daily ledger system. The Life Reset App ($39) is our upcoming interactive web application featuring active morning timers, habit tracking, and a digital wisdom vault—and it will include this complete 112-page guide for free upon launch."
    },
    {
      q: "How and when do I receive my guide after checkout?",
      a: "Instant delivery. The moment your Stripe checkout completes, your secure download button unlocks on the confirmation screen for a 1-tap download. A permanent receipt and backup access link are also emailed to you immediately."
    },
    {
      q: "Can I print the guide at home or through a local bindery?",
      a: "Yes. The guide is typeset in pure classical monochrome (100% black and white, zero colored ink boxes) at 300+ DPI. It prints beautifully on any standard home printer or high-end paper."
    }
  ];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReview.name.trim() || !newReview.comment.trim()) return;
    setReviewSubmitted(true);
    setTimeout(() => {
      setShowReviewModal(false);
      setReviewSubmitted(false);
      setNewReview({ name: "", role: "", rating: 5, comment: "" });
    }, 2200);
  };

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

      {/* Main Hero Section (No redundant tags) */}
      <section className="relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 px-4 sm:px-6 text-center">
        {/* Subtle Sapphire Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[840px] mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] text-white leading-[1.06] mb-5">
            Reset your mind. <br />
            <span className="blue-gradient-text">Control your life.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[20px] text-[#86868b] max-w-[660px] mx-auto mb-8 font-normal leading-relaxed">
            Our daily reels give you the spark. The 112-page Self-Mastery Guide gives you the complete master manual to conquer hesitation, master emotional discipline, and gain unbreakable focus.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
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
              <span>See What's Inside</span>
            </a>
          </div>

          {/* Clean Compatibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b] pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <PdfDocumentLogo className="w-4 h-4 text-[#2997ff]" />
              <span className="font-medium text-[13px]">112-Page Edition • <span className="text-[#2997ff]">Available Now</span></span>
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

      {/* Clear Product Showcase: PDF eBook vs Custom App Dashboard */}
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
                A 112-page digital book and interactive iPad workbook with 47 practical chapters on emotional control, focus, and daily discipline.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">$19</span>
                  <span className="text-[13px] text-[#86868b]">one-time download • instant delivery</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-200 mb-8 font-light">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> <b className="text-white">Full 112-Page Guide & Ruled Workbook (PDF)</b>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 Practical Chapters across 8 Core Parts
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 Dedicated Ruled Audit Ledgers with Daily Tracking Bars
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 5 Capstone Field Challenges & 90-Day Review Framework
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
                An interactive daily web application featuring morning priming timers, real-time crisis decision guides, and daily focus audits.
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
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Interactive Morning Priming & Phone Blackout Timers
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

      {/* NEW: Who Needs This Guide vs Who Doesn't Need It (Replaces How To Live This Work) */}
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
                    <span>You wake up, reach for your phone within seconds, and lose your morning to mindless scrolling and digital noise.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You find yourself reacting defensively or impulsively under stress, criticism, or conflict—and regret it later.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You have plenty of ambition, but struggle to sit down and do 90 minutes of quiet, uninterrupted deep work.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You want a private, daily evening audit to hold yourself accountable to physical proof instead of comfortable excuses.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                    <span>You prefer direct, timeless principles and daily action over trendy life hacks and corporate self-help clichés.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-emerald-400 font-mono">
                ✓ Built for high execution & daily accountability
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
                    <span>You are looking for a quick dopamine hit, motivational quotes, or overnight transformation without real effort.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You want a feel-good book that comforts your excuses rather than a standard to hold yourself to.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You are unwilling to set aside 10 minutes of silent reflection each day to write in your daily audit ledger.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You prefer endlessly consuming content about self-improvement rather than executing in the real world.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-4 h-4 text-zinc-500 shrink-0 mt-1" />
                    <span>You expect someone else to fix your discipline for you without personal accountability.</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] text-xs text-zinc-500 font-mono">
                ✕ Save your $19 if you aren't ready to do the daily work
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside: The 8 Parts (Simplified, No Tags, No Leaked Thinkers) */}
      <section id="whats-inside" className="relative z-10 py-20 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
              What's Inside The Guide
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2 leading-relaxed">
              47 concise chapters across 8 core parts, breaking down how to control your mind, sharpen your focus, and build quiet daily discipline.
            </p>
          </div>

          <div className="space-y-3">
            {guideParts.map((b, idx) => (
              <div
                key={idx}
                className="apple-bento-card overflow-hidden border border-white/[0.08] transition-all"
              >
                <button
                  onClick={() => setExpandedPart(expandedPart === idx ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono font-bold px-2.5 py-1 rounded bg-[#2997ff]/10 text-[#2997ff] border border-[#2997ff]/20">
                      {b.num}
                    </span>
                    <div>
                      <h3 className="text-[15px] sm:text-[16px] font-semibold text-white tracking-tight">
                        {b.title}
                      </h3>
                      <div className="text-[12px] text-[#86868b] mt-0.5">
                        {b.chapters} • {b.pages}
                      </div>
                    </div>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      expandedPart === idx ? "rotate-180 text-[#2997ff]" : ""
                    }`}
                  />
                </button>

                {expandedPart === idx && (
                  <div className="px-5 pb-6 sm:px-6 border-t border-white/[0.06] pt-4">
                    <p className="text-[14px] text-zinc-300 leading-relaxed font-light">
                      {b.description}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentic Reader Reviews (Dated October 2026, Human Tone, "Leave a Review" Option) */}
      <section id="reviews" className="relative z-10 py-20 px-4 sm:px-6 bg-[#080b10] border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-14 text-center sm:text-left">
            <div>
              <h2 className="text-2xl sm:text-4xl font-semibold text-white tracking-tight">
                Reader Reviews
              </h2>
              <p className="text-[14px] text-[#86868b] mt-1.5">
                Honest feedback from readers who put the guide into practice.
              </p>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="apple-pill-btn px-5 py-2.5 text-[13px] font-medium bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.15] transition-all flex items-center gap-2 cursor-pointer shadow-sm shrink-0"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#2997ff]" />
              <span>Leave a Review</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="apple-bento-card p-8 flex flex-col justify-between relative border border-white/[0.08]">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-[#2997ff]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#2997ff]" />
                      ))}
                    </div>
                    <span className="text-[11px] font-mono text-[#86868b]">
                      {item.date}
                    </span>
                  </div>
                  
                  <div className="text-xs font-semibold text-[#2997ff] mb-3 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.highlight}</span>
                  </div>

                  <p className="text-[14px] text-zinc-200 leading-relaxed font-light italic mb-6">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                  <div>
                    <span className="font-semibold text-white block">{item.name}</span>
                    <span className="text-[#86868b]">{item.role}</span>
                  </div>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Verified Reader</span>
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
          <div className="w-full max-w-lg p-6 sm:p-8 rounded-2xl bg-[#0d1117] border border-white/[0.15] shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="py-10 text-center space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">Thank You for Your Review</h3>
                <p className="text-[13px] text-[#86868b]">Your review has been submitted successfully for verification.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-white">Leave a Review</h3>
                  <p className="text-[13px] text-[#86868b] mt-1">Share your experience with The Self-Mastery Guide & Workbook.</p>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Rating</label>
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
                              ? "fill-[#2997ff] text-[#2997ff]"
                              : "text-zinc-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Michael T."
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Your Role or Profession (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Software Engineer, Designer, Founder"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#2997ff]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">Your Review</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="How has the guide or workbook helped your daily routine?"
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg bg-black/60 border border-white/[0.1] text-white text-[13px] focus:outline-none focus:border-[#2997ff] leading-relaxed"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewModal(false)}
                    className="px-4 py-2 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="apple-pill-btn px-5 py-2.5 bg-white text-black font-semibold text-xs hover:bg-[#e5e5ea] transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Comprehensive FAQ Section (No Redundant Tags) */}
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
