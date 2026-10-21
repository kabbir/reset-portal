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
  CheckCircle2
} from "lucide-react";

/* --- Live Stripe Payment Link --- */
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
      title: "The Reset Framework",
      image: "/manifesto-spread-preview.png",
      description:
        "The opening principle: why scrolling gives you a temporary high that leaves you exhausted, and how to replace digital noise with private daily discipline.",
      points: [
        "Why watching motivation never changes how you act",
        "The 4 operational rules of self-command",
        "How to build private discipline without announcing it"
      ]
    },
    {
      title: "Strategic Restraint",
      image: "/greene-spread-preview.png",
      description:
        "Field rules for remaining unshakeable when someone tests your patience. Learn why staying silent and unbothered wins every time.",
      points: [
        "The 3-second pause before responding to disrespect",
        "How to say no without guilt, apologies, or over-explaining",
        "Daily ledgers to audit where you lost composure"
      ]
    },
    {
      title: "Evening Accountability",
      image: "/watts-spread-preview.png",
      description:
        "The evening ledger. Every night before sleep, answer 3 honest questions to hold yourself accountable for your focus and conduct.",
      points: [
        "Audit the excuses you made during the day",
        "Protect 90 minutes of solitary deep work",
        "Ruled lines formatted to type on your phone or write in a notebook"
      ]
    },
    {
      title: "The Daily Habit Audit",
      image: "/book-spread-preview.png",
      description:
        "The two-page daily system: read 1 page of principles in the morning, complete 1 page of honest self-inquiry before bed.",
      points: [
        "10 minutes a day: zero fluff, pure discipline",
        "Fillable text fields formatted for phone and tablet",
        "Print-ready layout for physical notebooks"
      ]
    }
  ];

  /* The 4 Core Struggles (from user approved copy) */
  const struggles = [
    {
      trigger: "If you procrastinate and make excuses:",
      solution: "Guided daily prompts that force you to be honest with yourself and take action today."
    },
    {
      trigger: "If you get guilt-tripped or used:",
      solution: "Read hidden motives beneath polite smiles and learn to say no without guilt."
    },
    {
      trigger: "If you lose your temper and regret it:",
      solution: "Learn to stay silent and unbothered when someone tests your composure."
    },
    {
      trigger: "If you overthink and seek approval:",
      solution: "Stop explaining yourself to people, kill people-pleasing, and protect your peace."
    }
  ];

  /* FAQs */
  const faqs = [
    {
      q: "I already read a lot of philosophy and watch reels. Will this actually teach me anything new?",
      a: "Most people who consume philosophy understand the concepts intellectually, but their composure completely dissolves the moment someone provokes them or a deadline gets tense. We didn't build this to give you quotes to recite. Every chapter goes straight to the psychological root: why your nervous system reacts, where your ego makes excuses, and what specific rule to deploy in that exact room. Then the facing page forces you to write down your own truth. You don't just read it; you audit yourself."
    },
    {
      q: "How much time does this actually take each day? I already have an exhausting schedule.",
      a: "Ten minutes. This is not a 300-page academic book you need a free weekend to read. Each chapter is designed as a single two-page checkpoint. You spend three minutes absorbing the principle on the left, and seven minutes working through the unsparing audit prompt on the right. Doing that once a day creates more real behavioral change than binge-reading five books you'll forget by next month."
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
    <div className="relative min-h-screen bg-[#06080b] text-[#f8fafc] overflow-x-hidden selection:bg-[#38bdf8] selection:text-black">
      {/* Ambient Top Glow */}
      <div className="reflect-ambient-glow" />

      {/* Seamless Navigation Bar */}
      <header className="fixed top-3 sm:top-5 left-0 right-0 z-50 flex justify-center px-3 sm:px-4 pointer-events-none">
        <nav className="reflect-nav-blur pointer-events-auto px-4 py-2 sm:px-6 sm:py-3 flex items-center justify-between gap-3 sm:gap-8 w-full max-w-[920px]">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white text-black font-extrabold flex items-center justify-center text-[11px] sm:text-xs tracking-tighter">
              R
            </div>
            <span className="text-[13px] font-bold tracking-wider text-white group-hover:text-[#38bdf8] transition-colors">
              @ourlife.reset
            </span>
          </a>

          {/* Links */}
          <div className="hidden md:flex items-center gap-7 text-[13px] font-medium text-zinc-300">
            <a href="#preview" className="hover:text-white transition-colors">
              Look Inside
            </a>
            <a href="#struggles" className="hover:text-white transition-colors">
              What's Inside
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

          {/* CTA */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-semibold text-zinc-300">
              <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-pulse"></span>
              <span>$19 One-Time</span>
            </div>
            <button
              onClick={handleTriggerCheckout}
              className="reflect-btn-primary px-3.5 py-1.5 sm:px-5 sm:py-2 text-[12px] sm:text-[13px] font-bold flex items-center gap-1.5 cursor-pointer shadow-lg shadow-white/10 shrink-0"
            >
              <span>Get The Guide</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section — Bold & Seamless */}
      <section className="relative z-10 pt-32 sm:pt-44 pb-16 sm:pb-24 px-4 sm:px-6 max-w-[1100px] mx-auto text-center flex flex-col items-center">
        {/* ONE Single Clear Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-[-0.035em] text-white leading-[1.08] max-w-[880px]">
          Reset your mind.
          <span className="block opal-cyan-gradient-text mt-1.5">
            Control your life.
          </span>
        </h1>

        {/* Clear, Human Subtext */}
        <p className="text-base sm:text-xl text-zinc-300 mt-6 sm:mt-7 max-w-[680px] leading-relaxed font-light">
          A 112-page guided manual to confront your blind spots, kill reactivity, and rebuild daily discipline. 10 minutes a day on your phone or in your notebook. Read 1 page, write 1 page.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mt-8 w-full sm:w-auto">
          <button
            onClick={handleTriggerCheckout}
            className="reflect-btn-primary w-full sm:w-auto px-8 py-4 text-[14px] sm:text-[15px] font-bold flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-white/15"
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
          <span>Interactive on iPhone &amp; iPad</span>
          <span className="text-zinc-600 hidden sm:inline">•</span>
          <span className="text-emerald-400">Instant One-Tap Download</span>
        </div>

        {/* Hero Product Hardware Mockup — Seamless without a boxed card container */}
        <div className="relative mt-12 sm:mt-16 w-full max-w-[1020px] rounded-2xl overflow-hidden aspect-[16/9] bg-black border border-white/[0.1] shadow-2xl">
          <Image
            src="/hero-mockup-luxury.jpg"
            alt="The Self-Mastery Guide & Workbook open on iPad and iPhone on luxury dark desk"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Seamless Contrast Section: Watching Reels vs. The Daily Audit */}
      <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1000px] mx-auto border-t border-white/[0.08]">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Why watching reels never changes your life.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[580px] mx-auto font-light">
            Watching videos gives you 30 seconds of motivation. Writing forces real change.
          </p>
        </div>

        {/* Bold Seamless 2-Column Comparison (No ugly floating cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
          {/* Watching Reels */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-red-400 flex items-center gap-2">
              <span>Watching Reels</span>
            </h3>
            <ul className="space-y-4 text-sm text-zinc-300 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Fleeting Motivation:</strong> 30 seconds of energy that disappears the moment you swipe to the next video.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Reactive Living:</strong> One passive-aggressive comment ruins your entire mood for the day.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Overthinking at Night:</strong> Lying awake at 2 AM replaying arguments and conflicts in your head.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Zero Record:</strong> Weeks pass by and your daily habits stay the exact same.</span>
              </li>
            </ul>
          </div>

          {/* The Daily Audit */}
          <div className="space-y-4 md:border-l md:border-white/[0.1] md:pl-10">
            <h3 className="text-xl font-bold text-[#38bdf8] flex items-center gap-2">
              <span>The Daily Audit</span>
            </h3>
            <ul className="space-y-4 text-sm text-zinc-200 font-light leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Written Honesty:</strong> 10 minutes of honest self-inquiry on your phone before sleep forces real confrontation.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>The 3-Second Pause:</strong> Complete emotional calm when baited or tested. Calmness is real power.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Strategic Boundaries:</strong> Saying no cleanly without guilt, apology, or over-explaining yourself.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#38bdf8] font-bold shrink-0 mt-0.5">•</span>
                <span><strong>Undeniable Proof:</strong> 47 consecutive days of kept promises to yourself.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What You Actually Fix — The 4 Core Struggles (Seamless) */}
      <section id="struggles" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1000px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Built for what actually tests you.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[600px] mx-auto font-light">
            Real-world protocols for the exact moments your discipline usually breaks down.
          </p>
        </div>

        {/* Seamless 4-Point Breakdown — No Boxed Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-10">
          {struggles.map((item, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <div className="w-2 h-2 rounded-full bg-[#38bdf8] shrink-0 mt-2" />
              <div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  {item.trigger}
                </h3>
                <p className="text-sm sm:text-base text-zinc-300 mt-2 font-light leading-relaxed">
                  {item.solution}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Look Inside The 112 Pages (Seamless) */}
      <section id="preview" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1100px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Look inside the pages.
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-3 max-w-[620px] mx-auto font-light">
            Clean typography, psychological rules, and daily reflection ledgers you can type directly on your phone or write in a notebook.
          </p>

          {/* Seamless Spread Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {spreads.map((spread, index) => (
              <button
                key={index}
                onClick={() => setActiveSpreadTab(index)}
                className={`px-4 py-2 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeSpreadTab === index
                    ? "bg-white text-black shadow-md shadow-white/20"
                    : "bg-white/[0.05] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.08]"
                }`}
              >
                {spread.title}
              </button>
            ))}
          </div>
        </div>

        {/* Seamless Active Spread View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Spread Preview Image */}
          <div className="lg:col-span-8 relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-white/5 border border-white/[0.1] shadow-2xl">
            <Image
              src={spreads[activeSpreadTab].image}
              alt={spreads[activeSpreadTab].title}
              fill
              className="object-contain p-2 sm:p-4"
            />
          </div>

          {/* Spread Explanation */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
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
            </div>

            <div className="pt-2">
              <button
                onClick={handleTriggerCheckout}
                className="reflect-btn-primary w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-white/10"
              >
                <span>Get The Guide — $19</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* The 10-Minute Daily Ritual (Seamless) */}
      <section id="daily-ritual" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1080px] mx-auto border-t border-white/[0.08]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6">
            {/* ONE Single Clear Heading */}
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              10 minutes before bed.
            </h2>
            <p className="text-sm sm:text-base text-zinc-300 mt-4 leading-relaxed font-light">
              No apps to set up. No monthly subscriptions. Open the PDF in Apple Books, Files, or GoodNotes on your phone, or keep a notebook on your desk.
            </p>

            <div className="space-y-5 mt-8">
              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  01
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Morning Principle (3 Mins)</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Read 1 rule before checking social media, messages, or emails.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  02
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">In The Field</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Use the 3-second pause whenever someone tests your temper or patience.</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-8 h-8 rounded-full bg-white/[0.08] text-[#38bdf8] font-bold flex items-center justify-center shrink-0 text-xs font-mono">
                  03
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Evening Audit (7 Mins)</h4>
                  <p className="text-xs text-zinc-400 mt-0.5">Answer 3 honest questions directly on your phone before you go to sleep.</p>
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
              alt="Hands holding iPhone running the self-mastery audit overlooking evening city skyline"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Direct Download Section ($19 Seamless) */}
      <section id="checkout" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[880px] mx-auto border-t border-white/[0.08] scroll-mt-24">
        {/* ONE Single Clear Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Get The Self-Mastery Guide.
          </h2>
          <p className="text-sm sm:text-base text-zinc-400 mt-2 font-light">
            112 pages • Instant download • Lifetime access
          </p>
        </div>

        <div className="border-y border-white/[0.1] py-10 sm:py-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-white/[0.08]">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white">
                The Self-Mastery Guide &amp; Workbook
              </h3>
              <p className="text-sm text-zinc-400 mt-1">
                Interactive fields for phone and tablet + print-ready PDF
              </p>
            </div>
            <div className="text-left sm:text-right">
              <div className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                $19
              </div>
              <div className="text-xs text-zinc-400 mt-0.5">One-time payment • Lifetime access</div>
            </div>
          </div>

          {/* Inclusions */}
          <div className="py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-zinc-200">
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span><strong>112 Interactive Pages</strong> formatted for iPhone &amp; iPad</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span><strong>All 47 Frameworks</strong> for composure and focus</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="w-4 h-4 text-[#38bdf8] shrink-0 mt-0.5" />
                <span><strong>47 Ruled Daily Ledgers</strong> to audit your conduct</span>
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
            className="reflect-btn-primary w-full py-4 sm:py-5 text-sm sm:text-base font-extrabold uppercase tracking-wider flex items-center justify-center gap-3 cursor-pointer shadow-xl shadow-white/20"
          >
            <span>Download The Guide ($19)</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Founder's VIP Guarantee Note */}
          <p className="text-xs text-zinc-400 text-center mt-5 leading-relaxed font-light">
            <strong className="text-white font-medium">Founder's Credit:</strong> Every purchase today credits your full $19 toward lifetime access to the upcoming Life Reset mobile app when registration opens.
          </p>
        </div>
      </section>

      {/* Reader Reviews (Seamless) */}
      <section id="reviews" className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 max-w-[1000px] mx-auto border-t border-white/[0.08] scroll-mt-24">
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

        {/* Seamless Grid — No Boxed Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          {reviewsList.map((review) => (
            <div key={review.id} className="flex flex-col justify-between border-t border-white/[0.08] pt-6">
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
          <div className="p-6 sm:p-8 max-w-[500px] w-full bg-[#0d1117] rounded-3xl border border-white/20 relative">
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

      {/* Frequently Asked Questions (Seamless Line-Divided Accordion) */}
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
