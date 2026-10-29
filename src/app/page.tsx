"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  ChevronDown,
  X,
  FileText
} from "lucide-react";
import Navbar from "@/components/Navbar";
import {
  StripeLogo,
  AppleLogo,
  KindleLogo,
  InstagramLogo
} from "@/components/BrandLogos";

/* --- Live Stripe Checkout Link ($19) --- */
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

const ROTATING_PILLARS = [
  "LOOKING DEEP WITHIN",
  "FACING YOUR OWN FAULTS",
  "TIMELESS LIFE LESSONS",
  "REAL SELF-HONESTY",
  "CHANGING HOW YOU LIVE"
];

export default function GuideLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [tickerIndex, setTickerIndex] = useState<number>(0);

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

  /* Dynamic Rotating Header Index */
  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % ROTATING_PILLARS.length);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

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

  const faqs = [
    {
      q: "WHAT IS ACTUALLY INSIDE THE GUIDE?",
      a: "It brings together the best learnings from the most famous books, thinkers, and authors in history—all combined into one 112-page guide. Instead of reading 50 separate books, you get their sharpest life lessons in one place, paired with honest daily questions that make you look within and see what you need to change in your own life."
    },
    {
      q: "HOW DOES THE DAILY ROUTINE WORK?",
      a: "It takes less than 10 minutes a day: Read 1 Page in the morning, and Write 1 Page at night. On the left page, you read a timeless lesson distilled from a great thinker or book. On the facing right page, you answer a direct question that forces you to look at your own habits, excuses, and faults."
    },
    {
      q: "WHAT FORMAT DOES THE GUIDE COME IN?",
      a: "The Guide is a clean 112-page PDF. It looks sharp and reads easily on your iPad, iPhone, Android, Kindle, Mac, or PC. You can also print it out if you prefer reading and writing on paper. You receive an immediate download link right after checkout."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-riviera overflow-x-clip selection:bg-[#121814] selection:text-white">
      {/* Top Navigation */}
      <Navbar activePage="guide" />

      {/* =========================================================================
         1. HERO SECTION: FULL-WIDTH IPAD BACKGROUND WITH SEAMLESS FROSTED SCRIM
         Zero text clashing, crystal-clear readability, no harsh box borders
         ========================================================================= */}
      <section className="relative min-h-[85vh] sm:min-h-[88vh] flex items-center justify-center overflow-hidden py-12 sm:py-20 px-4 sm:px-8">
        {/* Main Background Image: The Self-Mastery Guide on iPad */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/ipad-preview.png"
            alt="The Self-Mastery Guide on iPad"
            fill
            priority
            className="object-cover object-center md:object-[center_38%] filter brightness-[0.88] contrast-[1.05]"
          />
          {/* Subtle Ambient Film Overlay */}
          <div className="absolute inset-0 bg-black/25 backdrop-blur-[0.5px]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#fbfaf6] via-transparent to-black/30" />
        </div>

        {/* Foreground Content: High-Contrast Seamless Frosted Scrim (No Hard Box Border) */}
        <div className="relative z-10 w-full max-w-2xl mx-auto my-auto p-6 sm:p-12 md:p-14 bg-[#fbfaf6]/92 backdrop-blur-md text-left">
          <span className="text-[11px] uppercase tracking-[0.35em] text-black/50 font-medium block mb-3">
            The Self-Mastery Guide • 112 Pages
          </span>

          {/* Dynamic Rotating Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.14em] text-[#121814] uppercase leading-[1.12] mb-5">
            Built for
            <span className="block font-medium tracking-[0.16em] text-black mt-1 sm:mt-2 transition-all duration-300">
              {ROTATING_PILLARS[tickerIndex]}
            </span>
          </h1>

          {/* Subtitle - Simple, Grounded, Punchy */}
          <p className="text-xs sm:text-sm md:text-base text-black/75 font-light leading-relaxed mb-8 max-w-xl tracking-[0.01em]">
            A complete set of learnings combining the best books and famous lessons from the greatest thinkers and authors in history—all in one 112-page guide. Built to make you look deep within, find the faults within yourself, and see the exact areas of your life you need to change.
          </p>

          {/* Action Buttons: Primary Stripe Checkout + Learn More Subpage */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 mb-8">
            <a
              href={STRIPE_CHECKOUT_URL}
              className="rr-btn flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-8 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
            >
              <StripeLogo className="h-3.5 w-auto opacity-80" />
              <span>Get The Guide — $19</span>
            </a>

            <Link
              href="/guide"
              className="rr-btn inline-flex items-center justify-center gap-2 py-4 px-8 text-xs font-medium uppercase tracking-[0.2em] border border-black/25 bg-white/80 text-[#121814] hover:border-black hover:bg-black hover:text-white transition-all rounded-none"
            >
              <span>Learn More</span>
              <span>→</span>
            </Link>
          </div>

          {/* Trust Badges directly underneath the CTAs (No Divider Line) */}
          <div className="flex flex-wrap items-center justify-start gap-4 sm:gap-6 text-[10px] text-black/60 uppercase tracking-[0.2em] font-medium pt-2">
            <div className="flex items-center gap-1.5">
              <AppleLogo className="w-3.5 h-3.5 opacity-70" />
              <span>iPad & iPhone</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <KindleLogo className="w-3.5 h-3.5 opacity-70" />
              <span>Kindle & Android</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 opacity-70" />
              <span>Printable PDF</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. REVIEWS & TESTIMONIALS (SEAMLESS EDITORIAL FLOW — NO BOXES OR LINES)
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-16">
          <div>
            <div className="flex items-center gap-2 text-black/70 mb-3">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3 h-3 fill-black text-black" />
                ))}
              </div>
              <span className="text-[11px] font-medium text-black/50 uppercase tracking-[0.25em] ml-1">
                Private Pre-Release · Early Reader Feedback
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-[#121814]">
              What Early Readers Are Saying
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="rr-btn px-6 py-2.5 text-[10px] font-medium border border-black/25 hover:border-black text-[#121814] transition-colors rounded-none"
          >
            Leave Feedback
          </button>
        </div>

        {/* Seamless Open Reviews Grid — Zero Box Frames, Zero Divider Lines */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16">
          {reviewsList.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between space-y-5"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-0.5 text-black">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                    {rev.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="flex items-baseline justify-between pt-2">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#121814]">
                  {rev.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-black/45">
                  Early Access Reader
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         3. FREQUENTLY ASKED QUESTIONS (SEAMLESS OPEN ACCORDION)
         ========================================================================= */}
      <section className="relative py-16 sm:py-24 px-4 sm:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-black/40 block mb-2 font-medium">
            Questions
          </span>
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.18em] text-[#121814] hover:text-black/60 transition-colors cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/40 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-5 text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. SEAMLESS CLOSING CTA (OPEN EDITORIAL FLOW — NO HEAVY BOX)
         ========================================================================= */}
      <section className="relative py-20 sm:py-28 px-4 sm:px-8 text-center max-w-3xl mx-auto">
        <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
          Instant Digital Download
        </span>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.16em] uppercase mb-4 leading-tight text-[#121814]">
          Look Within. Change Your Life.
        </h2>
        <p className="text-xs sm:text-sm text-black/65 font-light mb-10 max-w-xl mx-auto tracking-[0.02em] leading-relaxed">
          112 pages combining the greatest books and life lessons ever written with honest daily reflection prompts. Delivered straight to your inbox the second you complete checkout.
        </p>

        <a
          href={STRIPE_CHECKOUT_URL}
          className="rr-btn inline-flex items-center justify-center gap-3 px-10 py-4 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
        >
          <StripeLogo className="h-3.5 w-auto opacity-80" />
          <span>Get The Guide — $19</span>
        </a>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] text-black/45 uppercase tracking-[0.25em] font-light mt-10">
          <div className="flex items-center gap-1.5">
            <StripeLogo className="h-3 w-auto opacity-60" />
            <span>Secured by Stripe</span>
          </div>
          <span>·</span>
          <span>Immediate Digital Delivery</span>
          <span>·</span>
          <span>Instant PDF Download</span>
        </div>
      </section>

      {/* =========================================================================
         5. MINIMALIST EDITORIAL FOOTER (SEAMLESS — NO BORDER LINE)
         ========================================================================= */}
      <footer className="w-full py-12 px-4 sm:px-8 text-center text-xs text-black/50 bg-[#fbfaf6]">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium uppercase tracking-[0.25em] text-[#121814]">
              OurLife.Reset
            </span>
            <span className="text-black/30">·</span>
            <span className="font-light tracking-[0.15em] text-black/60">
              Reset your mind. Control your life.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-[0.2em] text-[10px] font-medium text-black/60">
            <a
              href="https://instagram.com/ourlife.reset"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-black transition-colors"
            >
              <InstagramLogo className="w-3.5 h-3.5 opacity-70" />
              <span>@ourlife.reset</span>
            </a>
            <Link href="/discord" className="hover:text-black transition-colors">
              Creator Discord
            </Link>
            <Link href="/refund-policy" className="hover:text-black transition-colors">
              Refund Policy
            </Link>
            <a href="mailto:support@ourlifereset.com" className="hover:text-black transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

      {/* Review Modal - Sharp 0px Architectural Form */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-[#fbfaf6] border border-black/20 shadow-2xl p-6 sm:p-8 rounded-none">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-black/50 hover:text-black"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 mb-1 text-black/50">
              <span className="w-1.5 h-1.5 bg-black rounded-none" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-medium">
                Early Reader Feedback
              </span>
            </div>
            <h3 className="text-base font-medium uppercase tracking-[0.2em] text-[#121814] mb-2">
              Leave Feedback
            </h3>
            <p className="text-xs text-black/60 font-light mb-6">
              Share your honest advance thoughts on The Self-Mastery Guide.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center text-black font-medium text-xs uppercase tracking-[0.2em]">
                Thank you! Your review has been submitted.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] font-medium text-black/70 block mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-black/20 bg-white rounded-none focus:outline-black font-riviera"
                    placeholder="e.g. Marcus Vance"
                  />
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] font-medium text-black/70 block mb-1">
                    Your Rating
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-black/20 bg-white rounded-none focus:outline-black font-riviera"
                  >
                    <option value={5}>5 Stars — Life-Changing</option>
                    <option value={4}>4 Stars — Great</option>
                    <option value={3}>3 Stars — Good</option>
                    <option value={2}>2 Stars — Needs Improvement</option>
                    <option value={1}>1 Star — Poor</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] font-medium text-black/70 block mb-1">
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-black/20 bg-white rounded-none focus:outline-black font-riviera"
                    placeholder="What part of the early draft stood out to you? How has reading 1 page and writing 1 page helped you stay on the right path?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="rr-btn w-full py-3 bg-[#121814] text-white text-[10px] font-medium hover:bg-black transition-colors rounded-none mt-2"
                >
                  {submittingReview ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
