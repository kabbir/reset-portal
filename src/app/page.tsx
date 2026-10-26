"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  Send,
  CheckCircle2,
  BookOpen,
  Sparkles,
  TrendingUp,
  Eye,
  RefreshCw,
  MessageSquarePlus,
  X
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Interactive Questionnaire State */
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    primaryFocus?: string;
    financialStanding?: string;
    executionStyle?: string;
  }>({});
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [allocatedTrack, setAllocatedTrack] = useState<"self_mastery" | "creator_growth" | null>(null);

  /* Community Application Form State */
  const [appForm, setAppForm] = useState({
    name: "",
    email: "",
    handle: "",
    niche: "",
    reason: ""
  });
  const [submittingApp, setSubmittingApp] = useState<boolean>(false);
  const [appSubmitted, setAppSubmitted] = useState<boolean>(false);
  const [appError, setAppError] = useState<string | null>(null);

  /* Reviews Modal State */
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

  /* Step 1 Choice */
  const handleAnswerStep1 = (val: string) => {
    setAnswers((prev) => ({ ...prev, primaryFocus: val }));
    setCurrentStep(1);
  };

  /* Step 2 Choice (Core Financial Fork) */
  const handleAnswerStep2 = (val: string) => {
    setAnswers((prev) => ({ ...prev, financialStanding: val }));
    setCurrentStep(2);
  };

  /* Step 3 Choice (Determines Final Allocation) */
  const handleAnswerStep3 = (val: string) => {
    const updated = { ...answers, executionStyle: val };
    setAnswers(updated);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      // If financially not stable or focused on making money -> Creator Growth Community
      if (
        updated.financialStanding === "need_income" ||
        updated.primaryFocus === "build_income" ||
        val === "creator_growth"
      ) {
        setAllocatedTrack("creator_growth");
      } else {
        setAllocatedTrack("self_mastery");
      }
      setCurrentStep(3);
    }, 1100);
  };

  const handleResetDiagnostic = () => {
    setCurrentStep(0);
    setAnswers({});
    setAllocatedTrack(null);
    setAppSubmitted(false);
  };

  const handleCommunitySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!appForm.name.trim() || !appForm.email.trim() || !appForm.reason.trim()) {
      setAppError("Please fill out all required fields.");
      return;
    }

    setSubmittingApp(true);
    setAppError(null);
    try {
      const combinedReason = `[Niche/Account: ${appForm.niche || "Not specified"}] ${appForm.reason}`;
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: appForm.name,
          email: appForm.email,
          handle: appForm.handle,
          reason: combinedReason,
          track: "creator_community"
        })
      });

      if (res.ok) {
        setAppSubmitted(true);
        setAppForm({ name: "", email: "", handle: "", niche: "", reason: "" });
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

  /* FAQs */
  const faqs = [
    {
      q: "Why do I need to take the 3-question diagnostic?",
      a: "Because self-mastery is contextual. If you are already financially stable, consuming more business advice won't fix your emotional reactivity or lack of peace—you need internal discipline and written audits. Conversely, if you lack income, quiet reflection alone won't pay your bills—you need to build high-income leverage, master viral reach, and monetize audience attention."
    },
    {
      q: "What is inside The Self-Mastery Guide ($19)?",
      a: "A 112-page interactive manual custom-built for iPhone, iPad, and notebook use. It pairs 47 psychological frameworks on emotional composure, boundaries, and focus with facing evening audit ledgers to hold yourself accountable before you sleep."
    },
    {
      q: "What is the Creator & Growth Circle community?",
      a: "A private, invite-only community where our team personally teaches you the exact blueprint @ourlife.reset used to gain 30,000+ followers and millions of monthly impressions. We break down viral hook formulas, algorithm pacing, and how to convert viral views into digital product and community revenue."
    },
    {
      q: "How does the Instagram DM automation work with the keyword START?",
      a: "When you comment 'START' on our Instagram reels, our automated system instantly DMs you the direct diagnostic link to this assessment. You complete the 3 questions and receive your allocated track immediately."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#111d15] text-[#f7f6f2] font-sans overflow-x-clip selection:bg-[#34533e] selection:text-white">
      {/* =========================================================================
         1. TOP NAVIGATION: CLEAN, OFFICIAL LOGO, SEAMLESS
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#111d15]/95 backdrop-blur-md border-b border-[#22382b]/70">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
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

          <div className="flex items-center gap-3">
            {allocatedTrack === "self_mastery" && (
              <button
                onClick={handleTriggerCheckout}
                className="btn-primary py-1.5 px-3 sm:px-4 text-xs font-semibold"
              >
                <span>Get Guide — $19</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep > 0 && (
              <button
                onClick={handleResetDiagnostic}
                className="inline-flex items-center gap-1.5 text-xs text-[#8ca896] hover:text-white transition-colors"
                title="Restart Diagnostic"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Restart</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
         2. CORE REVAMP: THE INTERACTIVE DIAGNOSTIC (ABOVE THE FOLD)
         ========================================================================= */}
      <main className="relative pt-8 sm:pt-16 pb-16 sm:pb-24 px-4 sm:px-6 max-w-3xl mx-auto">
        {/* Title & Status */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white max-w-2xl mx-auto leading-[1.12]">
            Reset your mind. <br />
            <span className="text-[#d8ebd9]">Control your life.</span>
          </h1>

          <p className="mt-3.5 sm:mt-5 text-xs sm:text-sm text-[#bfd4c6] max-w-md mx-auto font-light leading-relaxed">
            Answer 3 quick questions to diagnose your exact leverage point and get routed to your personal action track.
          </p>

          {/* Progress Indicator */}
          {currentStep < 3 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {[0, 1, 2].map((stepIdx) => (
                <div
                  key={stepIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    stepIdx === currentStep
                      ? "w-8 bg-[#86bf9a]"
                      : stepIdx < currentStep
                      ? "w-4 bg-[#345941]"
                      : "w-3 bg-[#1e3425]"
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono text-[#8ca896] uppercase ml-2">
                Step {currentStep + 1} of 3
              </span>
            </div>
          )}
        </div>

        {/* =========================================================================
           QUESTION 1: PRIMARY BOTTLENECK
           ========================================================================= */}
        {currentStep === 0 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center mb-6 px-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86bf9a]">
                Question 01
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white mt-1 leading-snug max-w-md mx-auto">
                Where is your attention most divided right now?
              </h2>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleAnswerStep1("mental_mastery")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    Internal Chaos &amp; Overthinking
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    I struggle with emotional reactivity, staying consistent with daily discipline, and breaking promises to myself.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleAnswerStep1("build_income")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    Financial Freedom &amp; Income Growth
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    I want to build cashflow, grow an audience fast, and learn how to generate income online through high-reach content.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           QUESTION 2: FINANCIAL STANDING (THE KEY FORK)
           ========================================================================= */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center mb-6 px-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86bf9a]">
                Question 02
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white mt-1 leading-snug max-w-md mx-auto">
                What is your honest financial standing today?
              </h2>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleAnswerStep2("stable")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    I am already financially stable / comfortable
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    My finances are fine. My real problem is mental clarity, stopping 2 AM overthinking, and building quiet self-mastery.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleAnswerStep2("need_income")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    I am not financially stable yet / I want to make money
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    I need to generate income. I want to learn how to grow an account, gain massive views, and monetize my attention.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           QUESTION 3: 90-DAY EXECUTION PREFERENCE
           ========================================================================= */}
        {currentStep === 2 && !isAnalyzing && (
          <div className="space-y-4 animate-in fade-in duration-300">
            <div className="text-center mb-6 px-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86bf9a]">
                Question 03
              </span>
              <h2 className="text-base sm:text-xl font-bold text-white mt-1 leading-snug max-w-md mx-auto">
                How do you want to execute over the next 90 days?
              </h2>
            </div>

            <div className="space-y-2.5">
              <button
                onClick={() => handleAnswerStep3("self_mastery")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    10 Minutes Daily of Quiet Written Audit &amp; Frameworks
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    Read 1 page of principles every morning, complete 1 page of honest self-inquiry before sleep on my phone or notebook.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => handleAnswerStep3("creator_growth")}
                className="w-full text-left p-3.5 sm:p-5 rounded-none border-b border-[#284433] hover:border-[#86bf9a] hover:bg-[#15251b] transition-all group flex items-start justify-between gap-3"
              >
                <div>
                  <div className="text-sm sm:text-base font-bold text-white group-hover:text-[#d3ebd9]">
                    Mentorship &amp; Private Community for Viral Account Growth
                  </div>
                  <div className="text-xs text-[#9eb6a6] font-light mt-1 leading-relaxed">
                    Learn the exact hooks, posting cadence, and algorithm strategies to get millions of views and make money from content.
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-[#63876e] group-hover:text-white shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           ANALYZING STATE (1.1s PULSE)
           ========================================================================= */}
        {isAnalyzing && (
          <div className="py-16 text-center space-y-4 animate-pulse">
            <div className="w-10 h-10 border-2 border-[#86bf9a] border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-base font-bold text-white">Analyzing Diagnostic Answers...</h3>
            <p className="text-xs text-[#8ca896]">Mapping your profile to the highest-leverage allocation.</p>
          </div>
        )}

        {/* =========================================================================
           ALLOCATION OUTCOME A: THE SELF-MASTERY TRACK ($19 GUIDE)
           ========================================================================= */}
        {currentStep === 3 && allocatedTrack === "self_mastery" && (
          <div className="space-y-8 animate-in fade-in duration-500 pt-2">
            {/* Allocation Header */}
            <div className="border-b border-[#243b2c] pb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Allocation Confirmed • Track 01
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
                Internal Self-Command &amp; Composure
              </h2>
              <p className="text-xs sm:text-sm text-[#bfd4c6] mt-2 font-light leading-relaxed">
                You already possess financial stability. Chasing more noise will not solve 2 AM overthinking or emotional reactivity under stress. Your highest leverage point is daily written self-command.
              </p>
            </div>

            {/* The Guide Deliverables: Seamless Editorial Presentation */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#86bf9a]" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  The 112-Page Self-Mastery Guide &amp; Workbook
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#d0e0d5]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>The 3-Second Delay:</strong> Field rules to pause and disarm disrespect with silence.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Evening Accountability:</strong> 3 nightly questions to audit slipped composure.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>47 Frameworks:</strong> Clear boundary setting without guilt or apology.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mobile &amp; iPad Ready:</strong> Native fillable fields in Apple Books &amp; GoodNotes.</span>
                </div>
              </div>

              {/* Product Preview Mockup */}
              <div className="border-t border-b border-[#233a2c] py-4 my-4">
                <Image
                  src="/hero-mockup-luxury.jpg"
                  alt="The Self-Mastery Guide on iPad"
                  width={900}
                  height={500}
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Direct Purchase CTA */}
              <div className="pt-2 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white">$19 <span className="text-xs text-[#8ca896] font-normal font-sans">One-time payment</span></div>
                  <div className="text-[11px] text-[#86a38f] mt-0.5">100% credited toward the upcoming Life Reset mobile app</div>
                </div>

                <button
                  onClick={handleTriggerCheckout}
                  className="btn-primary w-full sm:w-auto py-3.5 px-8 text-sm font-bold justify-center"
                >
                  <span>Claim The Guide — $19</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Switch Track Option */}
              <div className="pt-6 border-t border-[#233a2c]/60 flex items-center justify-between text-xs text-[#8ca896]">
                <button
                  onClick={handleResetDiagnostic}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={() => setAllocatedTrack("creator_growth")}
                  className="text-[#86bf9a] hover:underline"
                >
                  Looking to make money &amp; grow an account instead?
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           ALLOCATION OUTCOME B: THE CREATOR & VIRAL GROWTH CIRCLE (PRIVATE COMMUNITY)
           ========================================================================= */}
        {currentStep === 3 && allocatedTrack === "creator_growth" && (
          <div className="space-y-8 animate-in fade-in duration-500 pt-2">
            {/* Allocation Header */}
            <div className="border-b border-[#243b2c] pb-6">
              <span className="text-[11px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                Allocation Confirmed • Track 02
              </span>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white mt-1">
                The Creator &amp; Viral Growth Circle
              </h2>
              <p className="text-xs sm:text-sm text-[#bfd4c6] mt-2 font-light leading-relaxed">
                Self-discipline without financial sovereignty creates burnout. Your immediate priority is mastering organic attention: growing an account superfast, getting insane views, and monetizing your reach.
              </p>
            </div>

            {/* The Growth Blueprint Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base sm:text-lg font-bold text-white">
                  Learn How @ourlife.reset Scaled to 30,000+ Followers &amp; Millions of Views
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-[#d0e0d5]">
                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Viral Hook Engineering</span>
                  </div>
                  <p className="text-[#9eb6a6] font-light leading-relaxed text-xs">
                    The exact script structures and pacing that stop the scroll and generate millions of views per reel.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Monetization Blueprint</span>
                  </div>
                  <p className="text-[#9eb6a6] font-light leading-relaxed text-xs">
                    How to turn passive viewers into paying customers for digital guides, products, and communities.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Superfast Account Growth</span>
                  </div>
                  <p className="text-[#9eb6a6] font-light leading-relaxed text-xs">
                    Daily posting cadence, audio selection, and algorithm shortcuts to build a loyal following in weeks.
                  </p>
                </div>

                <div className="space-y-1">
                  <div className="font-bold text-white flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>Private Discord Network</span>
                  </div>
                  <p className="text-[#9eb6a6] font-light leading-relaxed text-xs">
                    Direct access to a vetted circle of creators and founders completely locked in on daily execution.
                  </p>
                </div>
              </div>

              {/* Seamless Membership Application Form */}
              <div className="pt-6 border-t border-[#233a2c]">
                <div className="mb-4">
                  <h4 className="text-base font-bold text-white">
                    Apply for Private Community &amp; Discord Access
                  </h4>
                  <p className="text-xs text-[#9eb6a6] font-light mt-0.5">
                    Access is limited to maintain high quality. We review every application manually.
                  </p>
                </div>

                {appSubmitted ? (
                  <div className="py-8 text-center border-t border-b border-[#233a2c]">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto mb-2.5" />
                    <h4 className="text-base font-bold text-white">Application Received</h4>
                    <p className="text-xs text-[#a4bfad] mt-1 max-w-sm mx-auto font-light">
                      Thank you. We review every creator submission manually. If accepted, your Discord invite link and growth onboarding will be sent directly to your email.
                    </p>
                    <button
                      onClick={() => setAppSubmitted(false)}
                      className="btn-secondary text-xs py-2 px-4 mt-4"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCommunitySubmit} className="space-y-4">
                    {appError && (
                      <div className="p-3 bg-red-950/50 border border-red-500/30 text-xs text-red-200">
                        {appError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={appForm.name}
                          onChange={(e) => setAppForm({ ...appForm, name: e.target.value })}
                          placeholder="e.g. Alex Rivera"
                          className="input-seamless"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={appForm.email}
                          onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                          placeholder="e.g. alex@gmail.com"
                          className="input-seamless"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">
                          Instagram Handle *
                        </label>
                        <input
                          type="text"
                          required
                          value={appForm.handle}
                          onChange={(e) => setAppForm({ ...appForm, handle: e.target.value })}
                          placeholder="@youraccount"
                          className="input-seamless"
                        />
                      </div>

                      <div>
                        <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">
                          Current Niche / Theme
                        </label>
                        <input
                          type="text"
                          value={appForm.niche}
                          onChange={(e) => setAppForm({ ...appForm, niche: e.target.value })}
                          placeholder="e.g. Philosophy, Fitness, Tech, Finance"
                          className="input-seamless"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">
                        Why do you want to grow an account and build an income right now? *
                      </label>
                      <textarea
                        required
                        rows={3}
                        value={appForm.reason}
                        onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                        placeholder="Tell us about your background, your target goals, and your commitment to executing daily."
                        className="input-seamless resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <button
                        type="submit"
                        disabled={submittingApp}
                        className="btn-primary w-full sm:w-auto py-3 px-8 text-xs sm:text-sm font-semibold justify-center"
                      >
                        <span>{submittingApp ? "Submitting Application..." : "Apply for Community Access"}</span>
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </button>

                      <span className="text-[11px] text-[#718c7c] font-light">
                        Manual review • Discord link sent via email upon approval.
                      </span>
                    </div>
                  </form>
                )}
              </div>

              {/* Switch Track Option */}
              <div className="pt-6 border-t border-[#233a2c]/60 flex items-center justify-between text-xs text-[#8ca896]">
                <button
                  onClick={handleResetDiagnostic}
                  className="hover:text-white transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={() => setAllocatedTrack("self_mastery")}
                  className="text-[#86bf9a] hover:underline"
                >
                  Already financially stable? View the $19 Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
         3. CONCISE SOCIAL PROOF & GOOGLE REVIEWS (SEAMLESS, NO BOXES)
         ========================================================================= */}
      <section className="bg-[#f7f6f2] text-[#141a16] py-12 sm:py-16 border-y border-[#e2dfd4]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[#e2dfd4]">
            <div className="flex items-center gap-2.5">
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
              <span className="text-[#a8a395]">·</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#141a16]">4.9 / 5.0</span>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="text-xs font-semibold text-[#203627] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>

          {/* 4 Clean Editorial Quotes: ZERO BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {reviewsList.slice(0, 4).map((review) => (
              <div key={review.id} className="space-y-1.5 pb-4 border-b border-[#e5e3d7]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#141a16]">{review.name}</span>
                  <span className="text-[#6b7d72]">{review.role || "Verified Reader"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3b4d42] font-light leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="text-[10px] text-[#718579] flex items-center justify-between pt-1">
                  <span>{review.date}</span>
                  <span className="text-[#2b633b] font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified</span>
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
                <h3 className="text-base font-bold text-white">Review Submitted</h3>
                <p className="text-xs text-[#a0b8a8] mt-1">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <h3 className="text-base font-bold text-white">Leave a Review</h3>
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
                  <label className="text-xs font-mono uppercase text-[#9eb6a6] block mb-1">Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="What specific framework or insight changed your daily conduct?"
                    className="input-seamless resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingReview}
                  className="btn-primary w-full py-2.5 text-xs font-semibold justify-center mt-2"
                >
                  <span>{submittingReview ? "Submitting..." : "Submit Review"}</span>
                  <Send className="w-3.5 h-3.5 ml-1" />
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         4. CONCISE FAQ SECTION (SEAMLESS ACCORDION)
         ========================================================================= */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#233a2c]/70">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight mb-6">
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
         5. SEAMLESS MINIMAL FOOTER
         ========================================================================= */}
      <footer className="border-t border-[#203627] py-8 px-4 sm:px-6 text-xs text-[#8aa694]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <Image
              src="/logo-with-bg.png"
              alt="Our Life Reset Logo"
              width={24}
              height={24}
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
            <Link href="/admin" className="text-[#86bf9a] hover:underline font-medium">
              Founder Console
            </Link>
          </div>
        </div>

        <div className="text-center text-[10px] text-[#5e7868] mt-4">
          &copy; {new Date().getFullYear()} Our Life Reset. Reset your mind. Control your life.
        </div>
      </footer>
    </div>
  );
}
