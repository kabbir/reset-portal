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
  RefreshCw,
  MessageSquarePlus,
  X,
  Play
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
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Interactive Yes/No Questionnaire State */
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<{
    q1_overthinking?: boolean;
    q2_financially_stable?: boolean;
    q3_audience_income?: boolean;
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

  /* Step 1: Overthinking / Internal Discipline (Yes/No) */
  const handleAnswerStep1 = (val: boolean) => {
    setAnswers((prev) => ({ ...prev, q1_overthinking: val }));
    setCurrentStep(1);
  };

  /* Step 2: Financial Stability (Yes/No) */
  const handleAnswerStep2 = (val: boolean) => {
    setAnswers((prev) => ({ ...prev, q2_financially_stable: val }));
    setCurrentStep(2);
  };

  /* Step 3: Audience Growth & Income Focus (Yes/No) -> Determines Track */
  const handleAnswerStep3 = (val: boolean) => {
    const updated = { ...answers, q3_audience_income: val };
    setAnswers(updated);
    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      // If financially stable (Q2 = true) AND NOT seeking to make money/grow audience (Q3 = false) -> Self-Mastery Guide ($19)
      // Otherwise, if they need income (Q2 = false) OR want to grow an account/monetize (Q3 = true) -> Creator Growth Circle
      if (updated.q2_financially_stable === true && val === false) {
        setAllocatedTrack("self_mastery");
      } else {
        setAllocatedTrack("creator_growth");
      }
      setCurrentStep(3);
    }, 1000);
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
          track: "creator_community",
          answers: {
            ...answers,
            niche: appForm.niche,
            reason: combinedReason
          }
        })
      });

      if (res.ok) {
        setAppSubmitted(true);
        setAppForm({ name: "", email: "", handle: "", niche: "", reason: "" });
      } else {
        const data = await res.json();
        setAppError(data.error || "Failed to submit application. Please try again.");
      }
    } catch {
      setAppError("An error occurred while submitting. Please check your connection.");
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
        const addedReview = await res.json();
        setReviewsList((prev) => [addedReview, ...prev]);
        setReviewSubmitted(true);
        setTimeout(() => {
          setShowReviewModal(false);
          setReviewSubmitted(false);
          setNewReview({ name: "", role: "", rating: 5, comment: "" });
        }, 1600);
      }
    } catch (err) {
      console.error("Could not post review:", err);
    } finally {
      setSubmittingReview(false);
    }
  };

  /* FAQs */
  const faqs = [
    {
      q: "Why do I need to answer these 3 Yes/No questions?",
      a: "Because self-mastery and growth are situational. If you are already financially stable, chasing more business advice will not fix your emotional reactivity or late-night overthinking—you need daily written audits. If you need cash flow, meditation alone won't pay your bills—you need to master viral reach, audience leverage, and monetization."
    },
    {
      q: "What is inside The Self-Mastery Guide ($19)?",
      a: "A 112-page guided manual custom-built for iPhone, iPad, and notebook use. It pairs 47 psychological frameworks on composure, focus, and boundary setting with nightly audit prompts to hold yourself accountable before sleep."
    },
    {
      q: "What is the Creator & Viral Growth Circle?",
      a: "A private, invite-only community where our team personally breaks down the exact blueprint @ourlife.reset used to gain 30,000+ followers and millions of monthly impressions. We share viral hook structures, pacing, and monetization funnels."
    },
    {
      q: "How does the Instagram DM automation work with the keyword START?",
      a: "When you comment 'START' on our Instagram reels, our automated system instantly DMs you the direct link to this diagnostic so you can answer the 3 questions and receive your allocated track immediately."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-sans overflow-x-clip selection:bg-[#1b3826] selection:text-white">
      {/* =========================================================================
         1. TOP NAVIGATION: CLEAN, LIGHT, INSTITUTIONAL TRUST
         ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#fbfaf6]/90 backdrop-blur-md border-b border-[#e7e5dc]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <Image
              src="/logo-with-bg.png"
              alt="Our Life Reset Official Logo"
              width={30}
              height={30}
              className="rounded-md border border-[#d8d5cb] shadow-xs"
              priority
            />
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-tight text-[#121814] group-hover:text-[#1b3826] transition-colors">
                @ourlife.reset
              </span>
              <span className="text-[10px] text-[#798a80] -mt-0.5 font-medium">Verified Diagnostic</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            {allocatedTrack === "self_mastery" && (
              <button
                onClick={handleTriggerCheckout}
                className="scale-btn-primary py-1.5 px-3.5 sm:px-4 text-xs font-semibold"
              >
                <span>Get Guide — $19</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}

            {currentStep > 0 && (
              <button
                onClick={handleResetDiagnostic}
                className="inline-flex items-center gap-1.5 text-xs text-[#526359] hover:text-[#121814] transition-colors"
                title="Restart Diagnostic"
              >
                <RefreshCw className="w-3 h-3" />
                <span className="hidden sm:inline">Start Over</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* =========================================================================
         2. CORE HERO: PROVEN MONTAGE VIDEO & RAPID YES/NO DIAGNOSTIC
         ========================================================================= */}
      <main className="relative pt-6 sm:pt-12 pb-16 sm:pb-20 px-4 sm:px-6 max-w-2xl mx-auto">
        {/* Scale.com Style Ambient Video Window Proof */}
        <div className="mb-6 sm:mb-8 rounded-2xl overflow-hidden border border-[#e2dfd4] bg-[#f0eee6] shadow-sm relative group">
          <div className="relative aspect-16/9 w-full bg-black">
            <video
              src="/videos/creator_montage.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-[11px] sm:text-xs">
              <div className="flex items-center gap-1.5 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Viral Reel Pacing &amp; Creator Blueprints</span>
              </div>
              <span className="text-white/80 font-mono text-[10px]">@ourlife.reset · 30K+</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-display text-2xl sm:text-4xl lg:text-[40px] font-bold tracking-tight text-[#121814] leading-[1.18]">
            Reset your mind. <br />
            <span className="text-[#1b3826]">Control your life.</span>
          </h1>

          <p className="mt-2.5 text-xs sm:text-sm text-[#4a5950] max-w-md mx-auto font-normal leading-relaxed">
            Answer 3 quick Yes or No questions to pinpoint your immediate bottleneck and get routed to your personal action track.
          </p>

          {/* Progress Indicator */}
          {currentStep < 3 && (
            <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
              {[0, 1, 2].map((stepIdx) => (
                <div
                  key={stepIdx}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    stepIdx === currentStep
                      ? "w-8 bg-[#1b3826]"
                      : stepIdx < currentStep
                      ? "w-4 bg-[#7a9985]"
                      : "w-3 bg-[#e0ded6]"
                  }`}
                />
              ))}
              <span className="text-[10px] font-mono text-[#66776e] uppercase tracking-wider ml-1.5">
                Question {currentStep + 1} of 3
              </span>
            </div>
          )}
        </div>

        {/* =========================================================================
           QUESTION 1: OVERTHINKING / INTERNAL DISCIPLINE (YES / NO)
           ========================================================================= */}
        {currentStep === 0 && (
          <div className="animate-scale-step pt-2">
            <div className="text-center mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#1b3826] font-semibold">
                Question 01
              </span>
              <h2 className="text-base sm:text-2xl font-bold text-[#121814] mt-1 leading-snug break-words">
                Do you struggle with overthinking, emotional reactivity, or broken daily discipline?
              </h2>
              <p className="text-[11px] sm:text-xs text-[#5b6e62] mt-1.5 max-w-sm mx-auto leading-relaxed">
                You know what you need to do, but slip into late-night analysis paralysis, hesitation, or reacting before thinking.
              </p>
            </div>

            {/* Tactile Scale.com-style YES / NO Buttons */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
              <button
                onClick={() => handleAnswerStep1(true)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#1b3826] bg-[#1b3826] text-white hover:bg-[#244b33] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  YES
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-200/90 font-light mt-0.5 text-center leading-tight">
                  I struggle with this
                </span>
              </button>

              <button
                onClick={() => handleAnswerStep1(false)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#d5d2c6] bg-white text-[#121814] hover:border-[#1b3826] hover:bg-[#faf9f5] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  NO
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#6d7e74] font-light mt-0.5 text-center leading-tight">
                  My mind is disciplined
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           QUESTION 2: FINANCIAL STABILITY (YES / NO)
           ========================================================================= */}
        {currentStep === 1 && (
          <div className="animate-scale-step pt-2">
            <div className="text-center mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#1b3826] font-semibold">
                Question 02
              </span>
              <h2 className="text-base sm:text-2xl font-bold text-[#121814] mt-1 leading-snug break-words">
                Are you currently financially stable and earning consistent income?
              </h2>
              <p className="text-[11px] sm:text-xs text-[#5b6e62] mt-1.5 max-w-sm mx-auto leading-relaxed">
                Your living expenses, baseline savings, and recurring cash flow are comfortable and predictable.
              </p>
            </div>

            {/* Tactile Scale.com-style YES / NO Buttons */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
              <button
                onClick={() => handleAnswerStep2(true)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#1b3826] bg-[#1b3826] text-white hover:bg-[#244b33] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  YES
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-200/90 font-light mt-0.5 text-center leading-tight">
                  I am financially stable
                </span>
              </button>

              <button
                onClick={() => handleAnswerStep2(false)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#d5d2c6] bg-white text-[#121814] hover:border-[#1b3826] hover:bg-[#faf9f5] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  NO
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#6d7e74] font-light mt-0.5 text-center leading-tight">
                  I need to build income
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           QUESTION 3: IMMEDIATE GOAL - AUDIENCE & ONLINE INCOME (YES / NO)
           ========================================================================= */}
        {currentStep === 2 && !isAnalyzing && (
          <div className="animate-scale-step pt-2">
            <div className="text-center mb-5 sm:mb-6">
              <span className="text-[10px] sm:text-[11px] font-mono uppercase tracking-widest text-[#1b3826] font-semibold">
                Question 03
              </span>
              <h2 className="text-base sm:text-2xl font-bold text-[#121814] mt-1 leading-snug break-words">
                Is your #1 goal right now to grow an audience and build an online income?
              </h2>
              <p className="text-[11px] sm:text-xs text-[#5b6e62] mt-1.5 max-w-sm mx-auto leading-relaxed">
                You want to master viral reach, learn how to grow an account superfast, and monetize audience attention.
              </p>
            </div>

            {/* Tactile Scale.com-style YES / NO Buttons */}
            <div className="grid grid-cols-2 gap-2.5 sm:gap-4 w-full max-w-md mx-auto">
              <button
                onClick={() => handleAnswerStep3(true)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#1b3826] bg-[#1b3826] text-white hover:bg-[#244b33] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  YES
                </span>
                <span className="text-[10px] sm:text-[11px] text-emerald-200/90 font-light mt-0.5 text-center leading-tight">
                  Focus on income &amp; views
                </span>
              </button>

              <button
                onClick={() => handleAnswerStep3(false)}
                className="group relative flex flex-col items-center justify-center py-4 sm:py-6 px-2 sm:px-4 rounded-xl border-2 border-[#d5d2c6] bg-white text-[#121814] hover:border-[#1b3826] hover:bg-[#faf9f5] transition-all duration-200 shadow-xs active:scale-95 cursor-pointer w-full"
              >
                <span className="text-sm sm:text-lg font-bold tracking-wider uppercase">
                  NO
                </span>
                <span className="text-[10px] sm:text-[11px] text-[#6d7e74] font-light mt-0.5 text-center leading-tight">
                  Focus on internal mastery
                </span>
              </button>
            </div>
          </div>
        )}

        {/* =========================================================================
           ANALYZING STATE (Scale.com style 1.0s Pulse)
           ========================================================================= */}
        {isAnalyzing && (
          <div className="py-12 text-center space-y-3 animate-scale-step">
            <div className="w-8 h-8 border-2 border-[#1b3826] border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-sm font-bold text-[#121814]">Synthesizing Diagnostic Responses...</h3>
            <p className="text-xs text-[#6a7d73]">Routing your answers to the highest-leverage path.</p>
          </div>
        )}

        {/* =========================================================================
           ALLOCATION OUTCOME A: THE SELF-MASTERY TRACK ($19 GUIDE)
           ========================================================================= */}
        {currentStep === 3 && allocatedTrack === "self_mastery" && (
          <div className="space-y-6 animate-scale-step pt-1">
            {/* Header */}
            <div className="border-b border-[#e5e2d6] pb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1b3826] font-bold">
                Allocation Confirmed • Track 01
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#121814] mt-1">
                Internal Self-Command &amp; Composure
              </h2>
              <p className="text-xs sm:text-sm text-[#4a5950] mt-1.5 leading-relaxed font-normal">
                You already have financial stability. Consuming more business noise will not cure emotional reactivity or late-night overthinking. Your highest leverage point is structured daily written self-command.
              </p>
            </div>

            {/* Video Preview: Journaling & Digital Workbook Loop */}
            <div className="rounded-xl overflow-hidden border border-[#e2dfd4] bg-[#f0eee6] shadow-sm relative">
              <div className="relative aspect-16/9 w-full bg-black">
                <video
                  src="/videos/self_mastery_preview.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] flex items-center justify-between">
                  <span className="font-medium">112-Page Workbook · Read 1 Page, Write 1 Page</span>
                  <span className="text-white/80 font-mono text-[10px]">Apple Books &amp; GoodNotes</span>
                </div>
              </div>
            </div>

            {/* The Guide Deliverables */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#1b3826]" />
                <h3 className="text-base font-bold text-[#121814]">
                  What&apos;s Inside The Self-Mastery Manual:
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-[#303d35]">
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1b3826] shrink-0 mt-0.5" />
                  <span><strong>The 3-Second Delay:</strong> Pause and disarm disrespect with silence.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1b3826] shrink-0 mt-0.5" />
                  <span><strong>Evening Accountability:</strong> 3 nightly audits to inspect slipped composure.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1b3826] shrink-0 mt-0.5" />
                  <span><strong>47 Frameworks:</strong> Set clear personal boundaries without apology.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#1b3826] shrink-0 mt-0.5" />
                  <span><strong>Instant Download:</strong> Digital fillable PDF formatted for phone &amp; tablet.</span>
                </div>
              </div>

              {/* Direct Purchase CTA */}
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#f5f4ee] p-4 rounded-xl border border-[#e5e3d7]">
                <div>
                  <div className="text-2xl font-extrabold text-[#121814]">
                    $19 <span className="text-xs text-[#6a7d73] font-normal">One-time payment</span>
                  </div>
                  <div className="text-[11px] text-[#4a5950]">
                    100% credited toward the upcoming Life Reset mobile app.
                  </div>
                </div>

                <button
                  onClick={handleTriggerCheckout}
                  className="scale-btn-primary w-full sm:w-auto py-3 px-6 text-xs sm:text-sm font-bold"
                >
                  <span>Claim The Guide — $19</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>

              {/* Switch Track Option */}
              <div className="pt-3 flex items-center justify-between text-xs text-[#6a7d73]">
                <button
                  onClick={handleResetDiagnostic}
                  className="hover:text-[#121814] transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={() => setAllocatedTrack("creator_growth")}
                  className="text-[#1b3826] font-medium hover:underline"
                >
                  Want to grow an account and make money instead?
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================================
           ALLOCATION OUTCOME B: THE CREATOR & VIRAL GROWTH CIRCLE
           ========================================================================= */}
        {currentStep === 3 && allocatedTrack === "creator_growth" && (
          <div className="space-y-6 animate-scale-step pt-1">
            {/* Header */}
            <div className="border-b border-[#e5e2d6] pb-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#1b3826] font-bold">
                Allocation Confirmed • Track 02
              </span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#121814] mt-1">
                The Creator &amp; Viral Growth Circle
              </h2>
              <p className="text-xs sm:text-sm text-[#4a5950] mt-1.5 leading-relaxed font-normal">
                Self-discipline without financial sovereignty leads to frustration. Your primary leverage point is mastering organic attention: growing an account superfast, getting insane views, and monetizing your reach.
              </p>
            </div>

            {/* Creator Video Montage */}
            <div className="rounded-xl overflow-hidden border border-[#e2dfd4] bg-[#f0eee6] shadow-sm relative">
              <div className="relative aspect-16/9 w-full bg-black">
                <video
                  src="/videos/creator_montage.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] flex items-center justify-between">
                  <span className="font-medium">Techniques Modeled on Top Creators</span>
                  <span className="text-white/80 font-mono text-[10px]">@ourlife.reset Blueprint</span>
                </div>
              </div>
            </div>

            {/* Growth Circle Deliverables */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-[#1b3826]" />
                <h3 className="text-base font-bold text-[#121814]">
                  What You Will Master Inside The Circle:
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#303d35]">
                <div className="space-y-0.5">
                  <div className="font-bold text-[#121814] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b3826]" />
                    <span>Viral Hook Engineering</span>
                  </div>
                  <p className="text-[#55665c] text-[11px]">
                    The exact script pacing and visual cuts that retain attention and generate millions of views per reel.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-[#121814] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b3826]" />
                    <span>Monetization Funnel</span>
                  </div>
                  <p className="text-[#55665c] text-[11px]">
                    How to turn casual viewers into paying community members and digital guide customers automatically.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-[#121814] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b3826]" />
                    <span>Rapid Account Scaling</span>
                  </div>
                  <p className="text-[#55665c] text-[11px]">
                    Daily posting cadence, trending audio selection, and algorithm shortcuts to build an engaged audience.
                  </p>
                </div>

                <div className="space-y-0.5">
                  <div className="font-bold text-[#121814] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1b3826]" />
                    <span>Private Discord Network</span>
                  </div>
                  <p className="text-[#55665c] text-[11px]">
                    Direct access to fellow creators and our team locked in on building online income.
                  </p>
                </div>
              </div>

              {/* Community Application Form */}
              <div className="pt-4 border-t border-[#e2dfd4]">
                <div className="mb-3">
                  <h4 className="text-sm font-bold text-[#121814]">
                    Apply for Private Community &amp; Discord Access
                  </h4>
                  <p className="text-xs text-[#55665c] font-light">
                    Access is limited to maintain high caliber. We review each application personally.
                  </p>
                </div>

                {appSubmitted ? (
                  <div className="py-6 text-center bg-[#f0eee6] rounded-xl border border-[#dedbcf]">
                    <CheckCircle2 className="w-8 h-8 text-[#1b3826] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#121814]">Application Received</h4>
                    <p className="text-xs text-[#55665c] mt-1 max-w-sm mx-auto">
                      Thank you. We review every creator submission manually. If accepted, your Discord invite link and growth onboarding will be sent directly to your email.
                    </p>
                    <button
                      onClick={() => setAppSubmitted(false)}
                      className="scale-btn-secondary text-xs py-1.5 px-4 mt-3"
                    >
                      Submit another application
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleCommunitySubmit} className="space-y-3 bg-[#f5f4ee] p-4 rounded-xl border border-[#e5e3d7]">
                    {appError && (
                      <div className="p-2.5 bg-red-100/80 border border-red-300 text-xs text-red-800 rounded-md">
                        {appError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-[#55665c] block mb-0.5">
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
                        <label className="text-[11px] font-mono uppercase text-[#55665c] block mb-0.5">
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

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-[#55665c] block mb-0.5">
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
                        <label className="text-[11px] font-mono uppercase text-[#55665c] block mb-0.5">
                          Current Niche / Theme
                        </label>
                        <input
                          type="text"
                          value={appForm.niche}
                          onChange={(e) => setAppForm({ ...appForm, niche: e.target.value })}
                          placeholder="e.g. Philosophy, Fitness, Tech, Business"
                          className="input-seamless"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-[#55665c] block mb-0.5">
                        Why do you want to grow an account and build an income right now? *
                      </label>
                      <textarea
                        required
                        rows={2}
                        value={appForm.reason}
                        onChange={(e) => setAppForm({ ...appForm, reason: e.target.value })}
                        placeholder="Tell us about your background, current obstacles, and commitment to executing daily."
                        className="input-seamless resize-none"
                      />
                    </div>

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={submittingApp}
                        className="scale-btn-primary w-full sm:w-auto py-2.5 px-6 text-xs sm:text-sm font-semibold"
                      >
                        <span>{submittingApp ? "Submitting..." : "Apply for Community Access"}</span>
                        <Send className="w-3.5 h-3.5 ml-1" />
                      </button>

                      <span className="text-[10px] text-[#6d7e74]">
                        Manual review • Discord invite sent to email upon approval.
                      </span>
                    </div>
                  </form>
                )}
              </div>

              {/* Switch Track Option */}
              <div className="pt-3 flex items-center justify-between text-xs text-[#6a7d73]">
                <button
                  onClick={handleResetDiagnostic}
                  className="hover:text-[#121814] transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Retake Diagnostic</span>
                </button>

                <button
                  onClick={() => setAllocatedTrack("self_mastery")}
                  className="text-[#1b3826] font-medium hover:underline"
                >
                  Already financially stable? View the $19 Guide
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
         3. VERIFIED SOCIAL PROOF & GOOGLE REVIEWS (LIGHT EDITORIAL)
         ========================================================================= */}
      <section className="bg-white py-12 sm:py-16 border-t border-b border-[#e7e5dc]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-8 pb-3 border-b border-[#eceae3]">
            <div className="flex items-center gap-2">
              {/* Google 4-Color SVG Icon */}
              <svg className="w-4 h-4 shrink-0" width={16} height={16} viewBox="0 0 24 24">
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
              <span className="text-xs font-bold text-[#121814]">Google Reviews</span>
              <span className="text-[#bbb8ad]">·</span>
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#121814]">4.9 / 5.0</span>
            </div>

            <button
              onClick={() => setShowReviewModal(true)}
              className="text-xs font-semibold text-[#1b3826] hover:underline flex items-center gap-1 self-start sm:self-auto"
            >
              <MessageSquarePlus className="w-3.5 h-3.5" />
              <span>Leave a Review</span>
            </button>
          </div>

          {/* 4 Clean Editorial Quotes: ZERO BOXES */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {reviewsList.slice(0, 4).map((review) => (
              <div key={review.id} className="space-y-1.5 pb-3 border-b border-[#f0eee6]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#121814]">{review.name}</span>
                  <span className="text-[#6d7e74] text-[11px]">{review.role || "Verified Reader"}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#3b4a41] font-normal leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="text-[10px] text-[#798a80] flex items-center justify-between pt-1">
                  <span>{review.date}</span>
                  <span className="text-[#1b3826] font-medium flex items-center gap-1">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="p-6 sm:p-7 max-w-md w-full bg-white border border-[#dedbcf] rounded-2xl relative shadow-xl">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#798a80] hover:text-[#121814]"
            >
              <X className="w-5 h-5" />
            </button>

            {reviewSubmitted ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-10 h-10 text-[#1b3826] mx-auto mb-2" />
                <h4 className="text-sm font-bold text-[#121814]">Review Submitted</h4>
                <p className="text-xs text-[#5b6e62] mt-1">Thank you for sharing your experience.</p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3.5">
                <div>
                  <h3 className="text-base font-bold text-[#121814]">Leave a Verified Review</h3>
                  <p className="text-xs text-[#5b6e62] mt-0.5">
                    Your feedback is published directly to our community ledger.
                  </p>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#5b6e62] block mb-1">
                    Your Name *
                  </label>
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
                  <label className="text-[11px] font-mono uppercase text-[#5b6e62] block mb-1">
                    Role / Context
                  </label>
                  <input
                    type="text"
                    value={newReview.role}
                    onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                    placeholder="e.g. Creator / Executive"
                    className="input-seamless"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#5b6e62] block mb-1">
                    Rating
                  </label>
                  <div className="flex gap-1.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewReview({ ...newReview, rating: star })}
                        className="p-1 focus:outline-none"
                      >
                        <Star
                          className={`w-4 h-4 ${
                            star <= newReview.rating ? "fill-current" : "text-gray-300"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono uppercase text-[#5b6e62] block mb-1">
                    Review *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    placeholder="How has the content or guide impacted your daily composure and focus?"
                    className="input-seamless resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submittingReview}
                    className="scale-btn-primary w-full py-2.5 text-xs font-semibold"
                  >
                    <span>{submittingReview ? "Submitting..." : "Publish Review"}</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
         4. FREQUENTLY ASKED QUESTIONS
         ========================================================================= */}
      <section className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6">
        <h3 className="font-display text-lg sm:text-xl font-bold text-[#121814] mb-6 text-center">
          Frequently Asked Questions
        </h3>

        <div className="divide-y divide-[#e7e5dc] border-y border-[#e7e5dc]">
          {faqs.map((faq, i) => (
            <div key={i} className="py-4">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between text-left gap-4 group"
              >
                <span className="text-xs sm:text-sm font-semibold text-[#121814] group-hover:text-[#1b3826] transition-colors">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-[#798a80] shrink-0 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180 text-[#1b3826]" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <p className="mt-2 text-xs sm:text-sm text-[#4a5950] font-normal leading-relaxed pr-6">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         5. CLEAN INSTITUTIONAL FOOTER
         ========================================================================= */}
      <footer className="border-t border-[#e7e5dc] py-8 text-center text-xs text-[#798a80]">
        <div className="max-w-3xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Image
              src="/logo-with-bg.png"
              alt="Logo"
              width={20}
              height={20}
              className="rounded-xs opacity-75"
            />
            <span>&copy; {new Date().getFullYear()} Our Life Reset. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <a
              href="https://instagram.com/ourlife.reset"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#121814] transition-colors"
            >
              Instagram @ourlife.reset
            </a>
            <span>·</span>
            <Link href="/admin" className="hover:text-[#121814] transition-colors">
              Founder Console
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
