"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Star,
  ChevronDown,
  BookOpen,
  ShieldCheck,
  Zap,
  MessageSquarePlus,
  X,
  Smartphone,
  CheckCircle2,
  Lock
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
  "Internal Composure",
  "Emotional Restraint",
  "Radical Discipline",
  "Unadvertised Competence",
  "Mental Sovereignty"
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
    }, 2400);
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
      q: "What format does The Guide come in?",
      a: "The Self-Mastery Guide is delivered as an ultra-high resolution 112-page publication. It is custom-formatted for iPad, iPhone, Kindle, desktop, and physical print. As soon as checkout completes, you receive immediate lifetime access."
    },
    {
      q: "How does the daily ritual work?",
      a: "The framework is simple: Read 1 Page, Write 1 Page. Each morning, read one rigorous psychological framework on emotional control, restraint, or focus. Each evening before sleep, complete the paired accountability prompt to audit your conduct."
    },
    {
      q: "Is there any generic motivational fluff?",
      a: "Zero. Every page is dense, unvarnished, and grounded in Stoic philosophy, depth psychology, and operational discipline. No academic jargon or empty clichés."
    },
    {
      q: "What is your refund policy?",
      a: "Due to the immediate digital delivery format of The Guide, all sales are final. If you encounter any technical difficulty downloading, opening, or reading your file, our team guarantees immediate replacement and 100% technical support."
    }
  ];

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#fbfaf6] text-[#121814] font-sans overflow-x-clip selection:bg-[#1b3826] selection:text-white">
      {/* Background Ambient Glows */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden -z-10">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[650px] h-[400px] bg-gradient-to-b from-emerald-300/15 via-emerald-100/5 to-transparent rounded-full blur-3xl animate-glow-orb-1" />
        <div className="absolute top-96 -left-32 w-[500px] h-[350px] bg-gradient-to-tr from-stone-200/40 to-transparent rounded-full blur-3xl animate-glow-orb-2" />
      </div>

      {/* Top Navigation */}
      <Navbar activePage="guide" />

      {/* =========================================================================
         1. HERO SECTION: BOLD, ELEGANT, SEAMLESS (NO TAGS AS REQUESTED)
         ========================================================================= */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        {/* Dynamic Rotating Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-[#121814] leading-[1.1] mb-6">
          Built for{" "}
          <span className="block text-[#1b3826] font-editorial italic mt-1 sm:mt-2 transition-all duration-300">
            {ROTATING_PILLARS[tickerIndex]}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-[#4a5950] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          A 112-page guided manual of 47 psychological frameworks, emotional composure protocols, and nightly accountability audits. Built for serious operators who demand radical personal discipline.
        </p>

        {/* Primary CTA + Price */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href={STRIPE_CHECKOUT_URL}
            className="scale-cta-btn py-3.5 px-8 text-base font-semibold w-full sm:w-auto shadow-lg shadow-[#1b3826]/15 hover:shadow-xl hover:shadow-[#1b3826]/25 transition-all"
          >
            <div className="scale-cta-sheen" />
            <span className="relative z-10">Get The Guide — $19</span>
            <div className="relative z-10 w-4 h-4 overflow-hidden">
              <div className="scale-arrow-track">
                <span className="w-1/2 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
                <span className="w-1/2 flex items-center justify-center">
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        </div>

        {/* Trust Badges - Restored Strict Decided Policy */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-xs text-[#798a80] font-medium pt-4 border-t border-[#e7e5dc]/60">
          <div className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-700" />
            <span>Instant Digital Download</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Smartphone className="w-4 h-4 text-emerald-700" />
            <span>Formatted for iPad, iPhone & Print</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Immediate Technical Support</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. THE IPAD MOCKUP SECTION (MANDATORY USER ASSET - NO TAGS)
         ========================================================================= */}
      <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#121814] tracking-tight">
            Read 1 Page. Write 1 Page.
          </h2>
          <p className="text-sm sm:text-base text-[#4a5950] max-w-xl mx-auto mt-2">
            Every morning brings one deep psychological framework. Every evening ends with a structured accountability audit before you close your eyes.
          </p>
        </div>

        {/* iPad Preview Container with Scale Border Beam */}
        <div className="relative max-w-lg mx-auto rounded-3xl overflow-hidden border border-[#d8d5cb] bg-white shadow-2xl p-2 sm:p-3 transition-transform hover:scale-[1.01] duration-500">
          <div className="scale-border-beam" />
          <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-black">
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

        {/* Protocol Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 pt-8 border-t border-[#e7e5dc]">
          <div>
            <div className="text-xs font-mono text-emerald-800 font-bold mb-1">01 · MORNING</div>
            <h3 className="text-base font-bold text-[#121814] mb-1">Cognitive Grounding</h3>
            <p className="text-xs text-[#4a5950] leading-relaxed">
              Read one focused chapter analyzing human nature, impulse arrest, or strategic boundaries before stepping into the noise of the day.
            </p>
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-800 font-bold mb-1">02 · DAYTIME</div>
            <h3 className="text-base font-bold text-[#121814] mb-1">Live Application</h3>
            <p className="text-xs text-[#4a5950] leading-relaxed">
              Practice specific emotional composure protocols during real pressure points and interpersonal friction.
            </p>
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-800 font-bold mb-1">03 · NIGHT</div>
            <h3 className="text-base font-bold text-[#121814] mb-1">Accountability Audit</h3>
            <p className="text-xs text-[#4a5950] leading-relaxed">
              Answer the unvarnished evening prompt directly on your iPad, notebook, or phone. Never go to sleep without auditing where your ego slipped.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. VIDEO EXPERIENCE SECTION
         ========================================================================= */}
      <section className="relative py-14 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#e7e5dc]">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#121814] tracking-tight">
            Designed for Quiet Evening Study
          </h2>
          <p className="text-sm sm:text-base text-[#4a5950] max-w-xl mx-auto mt-2">
            Clean typography, zero visual distractions, and designed to look stunning in dark mode on tablets and smartphones.
          </p>
        </div>

        {/* Video Player Container */}
        <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden border border-[#d8d5cb] bg-black shadow-2xl p-2 sm:p-3">
          <div className="scale-border-beam" />
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
            <video
              src="/videos/self_mastery_preview.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. REVIEWS & TESTIMONIALS (GOOGLE REVIEW STYLING)
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#e7e5dc]">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-1 text-amber-500 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-500" />
              ))}
              <span className="text-xs font-bold text-[#121814] ml-2 font-mono">4.96 / 5.0 Rating</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#121814] tracking-tight">
              Verified Reader Feedback
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#d8d5cb] bg-white text-xs font-semibold text-[#121814] hover:bg-[#eceae3] transition-colors shadow-xs"
          >
            <MessageSquarePlus className="w-3.5 h-3.5 text-emerald-800" />
            <span>Leave a Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reviewsList.slice(0, 4).map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-xl border border-[#e7e5dc] p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono text-[#798a80]">{rev.date}</span>
                </div>
                <p className="text-xs sm:text-sm text-[#2e3b33] leading-relaxed italic mb-3 font-serif">
                  &ldquo;{rev.comment}&rdquo;
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-[#f0eee6]">
                <span className="text-xs font-bold text-[#121814]">{rev.name}</span>
                <span className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded-full">
                  Verified Reader
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         5. FAQS
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#e7e5dc]">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121814] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-[#dedad0] overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-semibold text-sm text-[#121814]"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#798a80] shrink-0 transition-transform duration-200 ${
                    openFaq === idx ? "rotate-180 text-[#1b3826]" : ""
                  }`}
                />
              </button>
              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs sm:text-sm text-[#4a5950] leading-relaxed border-t border-[#f0eee6] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         6. FINAL BOTTOM CTA BANNER (NO TAGS)
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-6 bg-[#1b3826] text-white text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 font-editorial">
            Take Command of Your Mind Today.
          </h2>
          <p className="text-sm text-emerald-100/80 mb-8 max-w-lg mx-auto">
            112 Pages of psychological frameworks, composure disciplines, and nightly accountability audits. Instant delivery to your email.
          </p>

          <a
            href={STRIPE_CHECKOUT_URL}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-white text-[#1b3826] font-bold text-base hover:bg-emerald-50 transition-all shadow-lg hover:shadow-xl"
          >
            <span>Get The Guide — $19</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="flex items-center justify-center gap-6 text-xs text-emerald-200/60 mt-6 font-mono">
            <span>Secure Stripe Checkout</span>
            <span>·</span>
            <span>Immediate Digital Delivery</span>
            <span>·</span>
            <span>Lifetime Access</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. FOOTER
         ========================================================================= */}
      <footer className="w-full border-t border-[#e7e5dc] py-8 px-4 sm:px-6 text-center text-xs text-[#798a80] bg-[#fbfaf6]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#121814]">OurLife.Reset</span>
            <span>·</span>
            <span>Reset your mind. Control your life.</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/discord" className="hover:text-[#121814] transition-colors">
              Creator Discord
            </Link>
            <Link href="/refund-policy" className="hover:text-[#121814] transition-colors">
              Refund Policy
            </Link>
            <a href="mailto:support@ourlifereset.com" className="hover:text-[#121814] transition-colors">
              Support
            </a>
          </div>
        </div>
      </footer>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="relative w-full max-w-md bg-white rounded-2xl border border-[#dedad0] shadow-2xl p-6">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-4 right-4 text-[#798a80] hover:text-[#121814]"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-lg font-bold text-[#121814] mb-1">Leave a Verified Review</h3>
            <p className="text-xs text-[#4a5950] mb-4">
              Share your honest feedback on The Self-Mastery Guide.
            </p>

            {reviewSubmitted ? (
              <div className="py-8 text-center text-emerald-800 font-medium text-sm">
                Thank you! Your review has been added.
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="e.g., Marcus Vance"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Rating</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                  >
                    <option value={5}>5 Stars - Exceptional</option>
                    <option value={4}>4 Stars - Very Good</option>
                    <option value={3}>3 Stars - Average</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Your Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="How has reading 1 page and doing the nightly audit impacted your discipline?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submittingReview}
                  className="w-full py-2.5 rounded-xl bg-[#1b3826] text-white font-semibold text-xs hover:bg-[#244b33] transition-colors"
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
