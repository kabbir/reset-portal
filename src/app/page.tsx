"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import {
  BookOpen,
  ArrowRight,
  Check,
  Download,
  Lock,
  ChevronDown,
  Star,
  CheckCircle2,
  Sun,
  Target,
  Zap,
  Moon
} from "lucide-react";

/* --- Live Stripe Payment Configuration --- */
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/dRmdR9eZZ9Qf1FkgpY6AM00";

/* --- Official Vector Logos (Unboxed & Full Resolution) --- */
const AppDashboardLogo = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect width="18" height="18" x="3" y="3" rx="3" />
    <path d="M3 9h18" />
    <path d="M9 21V9" />
  </svg>
);

const AppleOfficialLogo = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 170 170" fill="currentColor">
    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.74 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.35.13-9.16-1.9-14.42-6.08-3.7-3.04-7.6-7.7-11.72-13.98-5.43-8.26-9.77-17.36-13.01-27.29-3.25-9.93-4.88-19.64-4.88-29.14 0-14.14 3.63-25.79 10.88-34.96 7.26-9.17 16.48-13.88 27.67-14.13 4.47 0 9.5 1.17 15.08 3.53 5.58 2.35 9.4 3.58 11.45 3.68 1.89-.1 5.86-1.38 11.91-3.83 6.05-2.46 11.19-3.53 15.42-3.23 11.53.84 20.73 5.25 27.62 13.24-10.02 6.09-14.9 14.4-14.65 24.93.25 8.16 3.41 15.04 9.48 20.65 6.07 5.61 13.25 8.87 21.53 9.77-1.9 5.66-4.13 11.28-6.69 16.87zM119.22 31.84c0-7.39 2.65-14.28 7.95-20.67 5.3-6.39 11.83-10.37 19.58-11.17.43 3.91.03 7.82-1.2 11.73s-3.32 7.64-6.27 11.19c-2.95 3.55-6.27 6.27-9.97 8.16-3.7 1.89-7.07 2.91-10.09 3.06v-2.3z" />
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
  const [checkoutModal, setCheckoutModal] = useState<{
    open: boolean;
    tier: "tier1" | "tier2" | null;
    status: "idle" | "processing" | "success";
  }>({
    open: false,
    tier: null,
    status: "idle",
  });

  // Automatically show download modal & confetti if returning from Stripe checkout
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("success") === "true") {
        setCheckoutModal({ open: true, tier: "tier1", status: "success" });
        try {
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#2997ff", "#ffffff", "#86868b", "#0071e3"],
          });
        } catch {}
      }
    }
  }, []);

  const handleTriggerCheckout = (tier: "tier1" | "tier2") => {
    if (tier === "tier1") {
      // Direct instant redirect to live Stripe checkout
      window.location.href = STRIPE_CHECKOUT_URL;
      return;
    }
    setCheckoutModal({ open: true, tier, status: "idle" });
  };

  const handleCompletePayment = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  const testimonials = [
    {
      name: "Alex M.",
      role: "Software Engineer",
      product: "The Self-Mastery Guide",
      quote: "I've been following @ourlife.reset for months for the quotes, but I was still waking up and scrolling my phone for 45 minutes in bed. The morning protocol in the guide completely broke that loop. My morning brain fog is gone.",
      highlight: "Overcame morning phone addiction & brain fog"
    },
    {
      name: "Sarah K.",
      role: "Freelance Designer & Strategist",
      product: "The Self-Mastery Guide",
      quote: "The 'Judge on Trial' chapter alone was worth ten times the price. I used to react immediately whenever clients gave harsh feedback or argued. Applying the silence protocol has changed the entire dynamic of my negotiations.",
      highlight: "Mastered emotional control in client negotiations"
    },
    {
      name: "David R.",
      role: "Agency Founder",
      product: "The Self-Mastery Guide",
      quote: "Quotes give you a 10-second boost of inspiration, but you need an actual philosophy when pressure hits. Applying the Hemingway Binary Filter and the crisis index turned my scattered thoughts into focused execution.",
      highlight: "Sharpened executive focus under pressure"
    },
    {
      name: "Elena V.",
      role: "Consultant",
      product: "Early Dashboard Beta Tester",
      quote: "I open the guide every morning on my iPad with my coffee. It takes 2 minutes: check off my sunlight and water, pick my 3 core tasks, and read one framework from the Wisdom Vault. It sets a calm, grounded tone for the whole day.",
      highlight: "Daily 2-minute morning grounding ritual"
    }
  ];

  const dailyRoutine = [
    {
      time: "07:00 AM",
      icon: Sun,
      title: "Morning Priming Protocol",
      description: "60-minute phone blackout + natural sunlight. Protects your dopamine baseline before algorithms can hijack your attention."
    },
    {
      time: "08:30 AM",
      icon: Target,
      title: "The Daily Arena (Rule of 3)",
      description: "Lock in your 3 non-negotiable execution goals from the workbook before opening email or messages."
    },
    {
      time: "02:00 PM",
      icon: Zap,
      title: "Stoic Decision Filter",
      description: "When friction or stress hits, apply the Hemingway Binary Filter: fix what's solvable immediately, wipe worry from the rest."
    },
    {
      time: "09:30 PM",
      icon: Moon,
      title: "Evening Cognitive Audit",
      description: "A 3-minute reflection log in your journal to audit emotional control, record lessons, and shut down mental loops before sleep."
    }
  ];

  const faqs = [
    {
      q: "What is the difference between the Guide and the App Dashboard?",
      a: "The Self-Mastery Guide ($19) is available right now for instant download. It is a 200-page publication-grade digital book and iPad workbook (PDF) you can read on any phone, tablet, or computer. The Life Reset App ($39) is our upcoming interactive web application currently undergoing final testing—and it will include the 200-page guide when released."
    },
    {
      q: "Can I start with the $19 Guide today and get the App later?",
      a: "Yes, absolutely! In fact, we recommend reading and applying the core mental models in The Self-Mastery Guide first so you have the foundational philosophy in place before the interactive application releases."
    },
    {
      q: "How do I receive my $19 Guide purchase?",
      a: "Instant delivery. The PDF downloads immediately with 1 tap after checkout, and a permanent backup download link is sent to your device."
    }
  ];

  return (
    <div className="min-h-screen bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white antialiased font-sans">
      {/* Top Glassmorphic Navigation */}
      <nav className="sticky top-0 z-50 apple-subnav-blur border-b border-white/[0.08]">
        <div className="max-w-[1040px] mx-auto px-4 sm:px-6 h-[54px] flex items-center justify-between">
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

          <div className="flex items-center gap-4">
            <a href="#reviews" className="hidden sm:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              Results & Reviews
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

      {/* Main Hero: Ultra-Crisp Monochrome & Sapphire Atmosphere */}
      <section className="relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 px-4 sm:px-6 text-center">
        {/* Subtle Midnight / Sapphire Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[820px] mx-auto relative z-10">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] text-white leading-[1.06] mb-5">
            Reset your mind. <br />
            <span className="blue-gradient-text">Control your life.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[20px] text-[#86868b] max-w-[620px] mx-auto mb-8 font-normal leading-relaxed">
            Our daily reels give you the spark. The 200-page Self-Mastery Guide gives you the complete master manual to conquer hesitation, master emotional discipline, and gain unbreakable focus.
          </p>

          {/* Clean Unboxed Compatibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b] pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <PdfDocumentLogo className="w-4 h-4 text-[#2997ff]" />
              <span className="font-medium text-[13px]">Universal PDF eBook • <span className="text-[#2997ff]">Available Now</span></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 text-white/70">
              <AppDashboardLogo className="w-4 h-4 text-zinc-400" />
              <span className="font-medium text-[13px]">Custom App Dashboard • <span className="text-zinc-400">In Final Testing</span></span>
            </div>
            <span className="text-white/20">•</span>
            <div className="flex items-center gap-2 text-white/90">
              <AppleOfficialLogo className="w-3.5 h-3.5 text-white" />
              <span className="font-medium text-[13px]">Apple Books, Kindle & All Devices</span>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Product Showcase: PDF eBook vs Custom App Dashboard */}
      <section id="products" className="relative z-10 pb-20 px-4 sm:px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* PRODUCT 1: The Self-Mastery Guide (200-Page PDF eBook) - AVAILABLE NOW */}
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
                  200-Page Edition
                </span>
              </div>

              <div className="text-[12px] uppercase tracking-wider text-[#2997ff] font-semibold mb-1">
                The Master Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                The Self-Mastery Guide
              </h2>
              <p className="text-[14px] text-zinc-300 mt-2 leading-relaxed font-light">
                A publication-grade digital book & interactive iPad workbook synthesizing 145 classical philosophers, neuroscientists, and master strategists.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">$19</span>
                  <span className="text-[13px] text-[#86868b]">one-time download • instant delivery</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-200 mb-8 font-light">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> <b className="text-white">Full 200-Page Editorial Guide & Workbook (PDF)</b>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 22 In-Depth Chapters across 4 Sovereign Pillars
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Book VI: 100 Life Situations Quick-Reference Crisis Index
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Interactive Lined Pages for iPad & Apple Pencil Journaling
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Compatible with Apple Books, Kindle, Tablets & Mobile
                </li>
              </ul>
            </div>

            <button
              onClick={() => handleTriggerCheckout("tier1")}
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
                An interactive daily web application and cognitive operating system featuring morning priming timers, real-time crisis matrix, and daily focus audits.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-zinc-400 tracking-tight">$39</span>
                  <span className="text-[13px] text-[#86868b]">final testing • will include $19 guide</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-400 mb-8 font-light">
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Will Include The Self-Mastery Guide ($19 Value Included Upon Launch)
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Interactive Morning Priming & Phone Blackout Timers
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Real-Time Crisis Decision Matrix (100 Life Scenarios)
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Daily Cognitive Reflection & Habit Journal
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Searchable Wisdom Vault (145+ Master Thinkers)
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

      {/* Daily Workflow: How People Actually Use It */}
      <section className="relative z-10 py-16 px-4 sm:px-6 bg-[#080b10] border-y border-white/[0.08]">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-[560px] mx-auto mb-12">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Daily Workflow
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              How You Use It Every Day
            </h3>
            <p className="text-[14px] text-[#86868b] mt-2">
              Less than 5 minutes of total daily maintenance to keep your focus locked in.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {dailyRoutine.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="apple-bento-card p-6 flex flex-col justify-between border border-white/[0.06]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-[#2997ff]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[11px] font-mono text-[#86868b]">{step.time}</span>
                    </div>
                    <div className="text-[15px] font-semibold text-white mb-2">{step.title}</div>
                    <p className="text-[13px] text-[#86868b] leading-relaxed font-light">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Authentic Reader Reviews & Life Changes */}
      <section id="reviews" className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-[560px] mx-auto mb-14">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Real Impact
            </span>
            <h3 className="text-2xl sm:text-4xl font-semibold text-white mt-1">
              How Lives Have Changed.
            </h3>
            <p className="text-[14px] text-[#86868b] mt-2">
              Feedback from individuals who turned philosophical ideas into daily practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item, idx) => (
              <div key={idx} className="apple-bento-card p-8 flex flex-col justify-between relative border border-white/[0.08]">
                <div>
                  <div className="flex items-center gap-1 mb-4 text-[#2997ff]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#2997ff]" />
                    ))}
                  </div>
                  
                  <div className="text-xs font-semibold text-[#2997ff] mb-2 flex items-center gap-1.5">
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
                  <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-zinc-400">
                    {item.product}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simple 3-Question FAQ */}
      <section className="relative z-10 py-16 px-4 sm:px-6 bg-[#080b10] border-t border-white/[0.08]">
        <div className="max-w-[680px] mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-widest text-[#2997ff] font-semibold">
              FAQ
            </span>
            <h3 className="text-2xl font-semibold text-white mt-1">
              Frequently Asked Questions
            </h3>
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
        <div className="max-w-[980px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
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
            Reset your mind. Control your life.
          </p>
        </div>
      </footer>

      {/* 1-Tap Apple Pay / Card Checkout Modal */}
      {checkoutModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl">
          <div className="w-full max-w-md p-8 rounded-[28px] bg-[#0d1117] border border-white/[0.12] shadow-2xl relative">
            <button
              onClick={() => setCheckoutModal({ open: false, tier: null, status: "idle" })}
              className="absolute top-5 right-5 text-xs text-[#86868b] hover:text-white cursor-pointer"
            >
              ✕
            </button>

            {checkoutModal.status === "idle" && (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20 mx-auto mb-4">
                    <Image
                      src="/logo-without-bg.png"
                      alt="@ourlife.reset logo"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    {checkoutModal.tier === "tier2" ? "The Life Reset App" : "The Self-Mastery Guide"}
                  </h3>
                  <p className="text-[13px] text-[#86868b] mt-1">
                    {checkoutModal.tier === "tier2"
                      ? "Custom Web App OS + 200-Page PDF eBook Included"
                      : "200-Page Sovereign Guide & Workbook (PDF Format)"}
                  </p>
                  <div className="text-3xl font-semibold text-white mt-4">
                    {checkoutModal.tier === "tier2" ? "$39" : "$19"}
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleCompletePayment}
                    className="apple-pill-btn w-full py-3.5 bg-white text-black font-semibold text-[13px] flex items-center justify-center gap-2 hover:bg-[#e5e5ea] transition-all cursor-pointer shadow-md"
                  >
                    <AppleOfficialLogo className="w-4 h-4 text-black" />
                    <span>Pay with Apple Pay</span>
                  </button>

                  <button
                    onClick={handleCompletePayment}
                    className="apple-pill-btn w-full py-3.5 bg-[#161b22] border border-white/[0.08] text-white font-medium text-[13px] flex items-center justify-center gap-2 hover:bg-[#1f242c] transition-all cursor-pointer"
                  >
                    <span>Pay with Credit / Debit Card</span>
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[11px] text-[#86868b]">
                  <Lock className="w-3.5 h-3.5 text-blue-400" />
                  <span>256-Bit Encrypted Instant Checkout</span>
                </div>
              </div>
            )}

            {checkoutModal.status === "processing" && (
              <div className="py-12 text-center space-y-4">
                <div className="w-8 h-8 border-2 border-[#2997ff] border-t-transparent rounded-full animate-spin mx-auto" />
                <p className="text-[14px] font-medium text-white">Preparing Your Instant Download...</p>
                <p className="text-[12px] text-[#86868b]">Generating your access keys.</p>
              </div>
            )}

            {checkoutModal.status === "success" && (
              <div className="text-center space-y-6">
                <div className="w-14 h-14 rounded-full bg-[#2997ff]/10 border border-[#2997ff] flex items-center justify-center mx-auto text-[#2997ff]">
                  <Check className="w-7 h-7" />
                </div>

                <div>
                  <h3 className="text-2xl font-semibold text-white">
                    Access Granted
                  </h3>
                  <p className="text-[13px] text-[#86868b] mt-1">
                    Your tools are ready for immediate use.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.08] text-left space-y-3.5">
                  {checkoutModal.tier === "tier2" ? (
                    <>
                      <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                        <div>
                          <div className="text-[13px] font-semibold text-white flex items-center gap-2">
                            <AppDashboardLogo className="w-4 h-4 text-white" />
                            <span>The Life Reset App</span>
                          </div>
                          <div className="text-[11px] text-[#86868b]">Web App Dashboard Access</div>
                        </div>
                        <a
                          href="#"
                          className="apple-pill-btn text-[12px] px-3.5 py-1.5 bg-[#0071e3] text-white font-semibold flex items-center gap-1 hover:bg-[#0077ed] transition-colors"
                        >
                          Launch App <ArrowRight className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-[13px] font-semibold text-white flex items-center gap-2">
                            <PdfDocumentLogo className="w-4 h-4 text-white" />
                            <span>The Self-Mastery Guide</span>
                          </div>
                          <div className="text-[11px] text-[#86868b]">200-Page PDF Publication</div>
                        </div>
                        <a
                          href="/downloads/The_Self_Mastery_Guide_200Pages.pdf"
                          download="The_Self_Mastery_Guide_OurlifeReset.pdf"
                          className="apple-pill-btn text-[12px] px-3.5 py-1.5 bg-white/10 text-white font-medium flex items-center gap-1 hover:bg-white/20 transition-colors"
                        >
                          <Download className="w-3 h-3" /> Download PDF
                        </a>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-[13px] font-semibold text-white flex items-center gap-2">
                          <PdfDocumentLogo className="w-4 h-4 text-white" />
                          <span>The Self-Mastery Guide</span>
                        </div>
                        <div className="text-[11px] text-[#86868b]">200-Page PDF Publication</div>
                      </div>
                      <a
                        href="/downloads/The_Self_Mastery_Guide_200Pages.pdf"
                        download="The_Self_Mastery_Guide_OurlifeReset.pdf"
                        className="apple-pill-btn text-[12px] px-3.5 py-1.5 bg-white text-black font-semibold flex items-center gap-1 hover:bg-[#e5e5ea] transition-colors"
                      >
                        <Download className="w-3 h-3" /> Download PDF
                      </a>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => setCheckoutModal({ open: false, tier: null, status: "idle" })}
                  className="text-[12px] text-[#86868b] hover:text-white underline cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
