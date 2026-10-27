"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Star,
  ChevronDown,
  X
} from "lucide-react";
import Navbar from "@/components/Navbar";

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
  "INTERNAL COMPOSURE",
  "EMOTIONAL RESTRAINT",
  "RADICAL DISCIPLINE",
  "UNADVERTISED COMPETENCE",
  "MENTAL SOVEREIGNTY"
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
      q: "WHAT FORMAT DOES THE GUIDE COME IN?",
      a: "The Self-Mastery Guide is delivered as an ultra-high resolution 112-page archival digital publication. It is formatted specifically for iPad, iPhone, Kindle, desktop, and physical print. As soon as checkout completes, you receive immediate lifetime access with universal PDF delivery."
    },
    {
      q: "HOW DOES THE DAILY RITUAL OPERATE?",
      a: "The protocol is non-negotiable: Read 1 Page, Write 1 Page. Each morning, read one rigorous psychological framework on composure, emotional restraint, or strategic boundaries. Each evening before sleep, complete the paired accountability prompt to audit your conduct."
    },
    {
      q: "IS THERE ANY MOTIVATIONAL FLUFF OR CLICHÉS?",
      a: "Zero. Every page is dense, unvarnished, and grounded in Stoic philosophy, depth psychology, and operational discipline. No academic filler, no empty slogans, and no generic advice."
    },
    {
      q: "WHAT IS THE REFUND AND ACCESS POLICY?",
      a: "Due to the immediate digital delivery of The Guide, all sales are final. If you encounter any technical difficulty downloading, opening, or viewing your publication on any device, our team provides 100% replacement and technical support guaranteed."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-riviera overflow-x-clip selection:bg-[#121814] selection:text-white">
      {/* Top Navigation */}
      <Navbar activePage="guide" />

      {/* =========================================================================
         1. HERO SECTION: BESPOKE EDITORIAL ARCHITECTURE
         ========================================================================= */}
      <section className="relative pt-12 sm:pt-20 pb-16 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Built For + The Daily Protocol */}
          <div className="lg:col-span-7 flex flex-col justify-start text-left">
            <span className="text-[11px] uppercase tracking-[0.35em] text-black/50 font-medium mb-3">
              The Archival Manual • 112 Pages
            </span>

            {/* Dynamic Rotating Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.14em] text-[#121814] uppercase leading-[1.12] mb-6">
              Built for
              <span className="block font-medium tracking-[0.16em] text-black mt-1 sm:mt-2 transition-all duration-300">
                {ROTATING_PILLARS[tickerIndex]}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-black/70 font-light leading-relaxed mb-10 max-w-xl tracking-[0.02em]">
              A 112-page guided manual of 47 practical psychological frameworks and nightly self-audits. Built for driven individuals who demand real composure and mental discipline in daily life.
            </p>

            {/* Daily Protocol: Read 1 Page. Write 1 Page. (Flat Architectural Layout, Zero Boxes) */}
            <div className="border-t border-black/15 pt-8 mt-2">
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-sm sm:text-base font-medium text-[#121814] uppercase tracking-[0.24em]">
                  Read 1 Page. Write 1 Page.
                </h2>
                <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                  Daily Protocol
                </span>
              </div>
              <p className="text-xs sm:text-sm text-black/60 font-light leading-relaxed mb-8 tracking-[0.01em]">
                A non-negotiable daily ritual designed to reset your focus and audit your conduct:
              </p>

              {/* 3 Steps in Razor Architectural Grid */}
              <div className="space-y-6">
                <div className="border-l border-black/20 pl-4">
                  <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-1">
                    01 • Morning / Read 1 Page
                  </div>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed tracking-[0.01em]">
                    Start your day with one clear mental framework on emotional composure, impulse control, or strategic boundaries before the world&apos;s noise reaches you.
                  </p>
                </div>

                <div className="border-l border-black/20 pl-4">
                  <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-1">
                    02 • Daytime / Live Application
                  </div>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed tracking-[0.01em]">
                    Put the lesson into practice during high-pressure conversations, difficult moments, and everyday friction.
                  </p>
                </div>

                <div className="border-l border-black/20 pl-4">
                  <div className="text-[11px] uppercase tracking-[0.25em] font-medium text-black/50 mb-1">
                    03 • Night / Write 1 Page
                  </div>
                  <p className="text-xs sm:text-sm text-black/75 font-light leading-relaxed tracking-[0.01em]">
                    Answer the paired evening accountability prompt directly on your iPad, phone, or notebook. Never close your eyes without an honest audit of where your ego slipped.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: iPad Mockup + Strategic CTA Placement (Below the image) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* iPad Preview Container - Zero Curve, Razor 1px Border, Slow Zoom */}
            <div className="relative w-full max-w-md mx-auto border border-black/15 bg-black p-0 rounded-none overflow-hidden rr-image-zoom">
              <div className="relative aspect-[4/5] bg-black">
                <Image
                  src="/ipad-preview.png"
                  alt="The Self-Mastery Guide on iPad"
                  width={1080}
                  height={1350}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* STRATEGIC CTA BUTTON: Placed right at the bottom of the iPad image */}
            <div className="w-full max-w-md mt-6 text-center">
              <a
                href={STRIPE_CHECKOUT_URL}
                className="rr-btn block w-full py-4 text-xs font-medium border border-[#121814] bg-[#121814] text-white hover:bg-transparent hover:text-[#121814] transition-all rounded-none"
              >
                Acquire The Guide — $19
              </a>

              {/* Trust Badges directly underneath the CTA */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[10px] text-black/50 uppercase tracking-[0.2em] font-medium mt-4 pt-3 border-t border-black/15">
                <span>Instant Download</span>
                <span>/</span>
                <span>iPad, iPhone & Print</span>
                <span>/</span>
                <span>100% Technical Support</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
         2. ROLLS-ROYCE 3-COLUMN CURRICULUM ARCHITECTURE
         (Modeled after Rolls-Royce "Explore Further / Continue Your Journey")
         ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/15">
        <div className="text-center mb-14">
          <h2 className="text-2xl sm:text-4xl font-light uppercase tracking-[0.22em] text-[#121814] mb-2">
            The Archival Pillars
          </h2>
          <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-black/50 font-light">
            47 Practical Frameworks For Self-Mastery
          </p>
        </div>

        {/* 3-Column Razor-Divider Grid (Exact Rolls-Royce Architecture) */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-b border-black/15 divide-y md:divide-y-0 md:divide-x divide-black/15">
          {/* Pillar 01 */}
          <div className="py-8 md:py-10 md:px-8 first:pl-0 last:pr-0">
            <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
              Pillar 01 • 16 Frameworks
            </span>
            <h3 className="text-lg sm:text-xl font-medium uppercase tracking-[0.18em] text-[#121814] mb-3">
              Radical Discipline
            </h3>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed tracking-[0.01em]">
              Operational disciplines on impulse control, morning mental conditioning, and non-negotiable daily standards that insulate your mind from distraction.
            </p>
          </div>

          {/* Pillar 02 */}
          <div className="py-8 md:py-10 md:px-8">
            <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
              Pillar 02 • 16 Frameworks
            </span>
            <h3 className="text-lg sm:text-xl font-medium uppercase tracking-[0.18em] text-[#121814] mb-3">
              Emotional Restraint
            </h3>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed tracking-[0.01em]">
              Tactical protocols on defusing external provocations, eliminating reactive anger, and mastering psychological silence during high-friction interactions.
            </p>
          </div>

          {/* Pillar 03 */}
          <div className="py-8 md:py-10 md:px-8 first:pl-0 last:pr-0">
            <span className="text-[10px] uppercase tracking-[0.35em] text-black/40 block mb-3 font-medium">
              Pillar 03 • 15 Audits
            </span>
            <h3 className="text-lg sm:text-xl font-medium uppercase tracking-[0.18em] text-[#121814] mb-3">
              Nightly Audit
            </h3>
            <p className="text-xs sm:text-sm text-black/65 font-light leading-relaxed tracking-[0.01em]">
              Accountability frameworks and structured self-examinations to audit your conduct before sleep. Zero rationalization, zero excuses.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. REVIEWS & TESTIMONIALS (EDITORIAL RAZOR GRID, ZERO BOXES)
         ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto border-t border-black/15">
        <div className="flex flex-col sm:flex-row items-baseline justify-between gap-4 mb-12">
          <div>
            <div className="flex items-center gap-1.5 text-black/70 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-black text-black" />
              ))}
              <span className="text-[11px] font-medium text-black uppercase tracking-[0.25em] ml-2">
                4.96 / 5.0 Rating • Verified Acquisitions
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.18em] text-[#121814]">
              Reader Observations
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="rr-btn px-6 py-2.5 text-[10px] font-medium border border-black/30 hover:border-black text-[#121814] transition-colors rounded-none"
          >
            Leave An Observation
          </button>
        </div>

        {/* Reviews Razor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border-t border-b border-black/15 divide-y md:divide-y-0 md:divide-x divide-black/15">
          {reviewsList.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="py-8 md:py-10 md:px-8 first:pl-0 last:pr-0 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-black">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-black text-black" />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-black/40">
                    {rev.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-black/80 font-light leading-relaxed italic mb-6">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="flex items-baseline justify-between pt-4 border-t border-black/10">
                <span className="text-xs uppercase tracking-[0.2em] font-medium text-[#121814]">
                  {rev.name}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-black/50">
                  Verified Reader
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. FREQUENTLY ASKED QUESTIONS (RAZOR ACCORDION)
         ========================================================================= */}
      <section className="relative py-20 px-4 sm:px-8 max-w-4xl mx-auto border-t border-black/15">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-light uppercase tracking-[0.2em] text-[#121814] mb-2">
            Inquiries
          </h2>
          <p className="text-xs uppercase tracking-[0.3em] text-black/50 font-light">
            Essential Details Regarding The Publication
          </p>
        </div>

        <div className="border-t border-black/15 divide-y divide-black/15">
          {faqs.map((faq, idx) => (
            <div key={idx} className="transition-all">
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-[#121814] hover:text-black/70 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-black/50 shrink-0 transition-transform duration-300 ${
                    openFaq === idx ? "rotate-180 text-black" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="pb-6 text-xs sm:text-sm text-black/70 font-light leading-relaxed tracking-[0.01em]">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         5. FINAL OBSIDIAN CTA BANNER (ROLLS-ROYCE CONTRAST SECTION)
         ========================================================================= */}
      <section className="relative py-24 px-4 sm:px-8 bg-[#0a0a0a] text-white text-center border-t border-black/15">
        <div className="max-w-3xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.35em] text-white/50 block mb-3 font-medium">
            Immediate Universal Delivery
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light tracking-[0.16em] uppercase mb-4 leading-tight">
            Take Command of Your Mind Today.
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light mb-10 max-w-xl mx-auto tracking-[0.02em] leading-relaxed">
            112 Pages of psychological frameworks, composure disciplines, and nightly accountability audits. Delivered instantly to your email upon checkout.
          </p>

          <a
            href={STRIPE_CHECKOUT_URL}
            className="rr-btn inline-block px-10 py-4 text-xs font-medium border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all rounded-none"
          >
            Acquire The Guide — $19
          </a>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[10px] text-white/40 uppercase tracking-[0.25em] font-light mt-10">
            <span>Secure Stripe Checkout</span>
            <span>·</span>
            <span>Immediate Digital Delivery</span>
            <span>·</span>
            <span>Universal PDF File</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. MINIMALIST EDITORIAL FOOTER
         ========================================================================= */}
      <footer className="w-full border-t border-black/15 py-10 px-4 sm:px-8 text-center text-xs text-black/50 bg-[#fbfaf6]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-medium uppercase tracking-[0.25em] text-[#121814]">
              OurLife.Reset
            </span>
            <span className="text-black/30">/</span>
            <span className="font-light tracking-[0.15em] text-black/60">
              Reset your mind. Control your life.
            </span>
          </div>

          <div className="flex items-center gap-6 uppercase tracking-[0.2em] text-[10px] font-medium text-black/60">
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

            <span className="text-[10px] uppercase tracking-[0.3em] text-black/50 block mb-1">
              Verified Feedback
            </span>
            <h3 className="text-base font-medium uppercase tracking-[0.2em] text-[#121814] mb-2">
              Submit An Observation
            </h3>
            <p className="text-xs text-black/60 font-light mb-6">
              Share your honest feedback on The Self-Mastery Guide.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center text-black font-medium text-xs uppercase tracking-[0.2em]">
                Your observation has been verified and recorded.
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
                    Evaluation
                  </label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-xs border border-black/20 bg-white rounded-none focus:outline-black font-riviera"
                  >
                    <option value={5}>5 Stars — Masterful Publication</option>
                    <option value={4}>4 Stars — Very High Value</option>
                    <option value={3}>3 Stars — Satisfactory</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] uppercase tracking-[0.25em] font-medium text-black/70 block mb-1">
                    Your Observation
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-black/20 bg-white rounded-none focus:outline-black font-riviera"
                    placeholder="How has reading 1 page and doing the nightly audit impacted your composure?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="rr-btn w-full py-3 bg-[#121814] text-white text-[10px] font-medium hover:bg-black transition-colors rounded-none mt-2"
                >
                  {submittingReview ? "Recording..." : "Submit Observation"}
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
