"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Users,
  Zap,
  TrendingUp,
  Cpu,
  Repeat,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  Lock,
  MessageCircle,
  Clock
} from "lucide-react";
import Navbar from "@/components/Navbar";

export default function DiscordLandingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  /* Quick Application Form State */
  const [form, setForm] = useState({
    name: "",
    email: "",
    handle: "",
    currentFollowers: "0 - 1k",
    niche: "",
    challenge: ""
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.handle.trim()) {
      setErrorMsg("Please fill out your name, email, and Instagram handle.");
      return;
    }

    setSubmitting(true);
    setErrorMsg(null);
    try {
      const combinedReason = `[Followers: ${form.currentFollowers} | Niche: ${form.niche || "General"}] ${form.challenge || "Looking to scale to 30k"}`;
      const res = await fetch("/api/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          handle: form.handle,
          track: "creator_discord_30k",
          reason: combinedReason
        })
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        const d = await res.json();
        setErrorMsg(d.error || "Failed to submit. Please try again.");
      }
    } catch {
      setErrorMsg("Connection error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  /* Curriculum Modules - High-Level Value without giving away the proprietary secret sauce */
  const modules = [
    {
      num: "01",
      title: "The 0 to 30k Distribution Blueprint",
      tagline: "Algorithmic Pacing & Visual Authority",
      desc: "Why 99% of creator reels stall at low views while high-authority pages capture millions of impressions. You will master the exact visual formatting, typography balance, and subtle audio pacing that triggers algorithmic distribution without needing expensive cameras or complex editing.",
      highlights: [
        "The retention pacing architecture that keeps viewers hooked through multiple loops",
        "Visual hierarchy: formatting text and contrast for immediate authority",
        "Audio selection: subtle soundscapes that stop the scroll"
      ]
    },
    {
      num: "02",
      title: "The Viral Repost Psychology Engine",
      tagline: "The Subconscious Story Share Trigger",
      desc: "Followers do not repost content to promote your page; they repost to signal something about their own identity. Learn the psychological triggers that compel viewers to share your reels to their personal stories, driving thousands of warm organic followers daily.",
      highlights: [
        "The identity-signaling framework behind high-share content",
        "Curating high-authority thoughts that provoke deep agreement",
        "Structuring captions that maximize saves, shares, and algorithmic reach"
      ]
    },
    {
      num: "03",
      title: "Automated Batch Production Systems",
      tagline: "Create A Month of Content in Minutes",
      desc: "Stop spending hours manually editing one clip at a time. We share our private automated workflow that allows our team to generate, format, and queue weeks of high-definition content in a single afternoon so you can focus purely on strategy.",
      highlights: [
        "The complete automated creation workflow walkthrough",
        "Batch formatting systems for frictionless consistency",
        "Multi-platform queueing without daily creative burnout"
      ]
    },
    {
      num: "04",
      title: "DM Automation & Cashflow Systems",
      tagline: "Turn Views into Predictable Revenue",
      desc: "Views without conversion are useless vanity. Master the frictionless DM automation funnels that convert reel comments and story interactions into qualified buyers for digital products, consultations, and private communities.",
      highlights: [
        "Setting up automated keyword DM triggers with high open rates",
        "Frictionless checkout integration and offer presentation",
        "Converting passive scrollers into long-term community members"
      ]
    },
    {
      num: "05",
      title: "The Private Discord Mastermind",
      tagline: "Direct Feedback, Weekly Audits & Private Vault",
      desc: "Get direct access to Kabbir and a room of serious creators. Submit your page for bi-weekly live teardowns, diagnose your view caps, and unlock our private vault of high-performing quotes and frameworks.",
      highlights: [
        "Personal account audits and script feedback directly with Kabbir",
        "Access to our private 500+ viral quote swipe vault",
        "Private networking with operators scaling to 10k–100k+ followers"
      ]
    }
  ];

  const faqs = [
    {
      q: "Do I need prior video editing experience?",
      a: "No. The entire system is designed so that anyone can follow our step-by-step blueprints and automated frameworks. You don't need complex software or high-end gear."
    },
    {
      q: "Do I have to show my face on camera?",
      a: "Not at all. OurLife.Reset was grown to over 30,000 followers and millions of monthly impressions completely faceless. We teach both faceless authority and personal brand scaling."
    },
    {
      q: "What happens after I join the Discord?",
      a: "You get immediate access to all 5 module breakdowns, our private swipe files, dedicated channels for feedback and account audits with Kabbir, and daily discussions with fellow operators."
    },
    {
      q: "Can I cancel my membership at any time?",
      a: "Yes. There are zero contracts or commitments. You can cancel your membership anytime with one click directly inside your billing portal."
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
      <Navbar activePage="discord" />

      {/* =========================================================================
         1. HERO SECTION: 0 TO 30K CREATOR BLUEPRINT (NO TAGS AS REQUESTED)
         ========================================================================= */}
      <section className="relative pt-16 sm:pt-24 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#121814] leading-[1.15] mb-6">
          Grow from 0 to 30k.{" "}
          <span className="block text-[#1b3826] font-editorial italic text-2xl sm:text-5xl md:text-6xl mt-1.5 sm:mt-2">
            The Complete Creator Engine.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-xl text-[#4a5950] max-w-2xl mx-auto font-normal leading-relaxed mb-8">
          The exact viral hook formulas, automated batch systems, audience psychology, and monetization funnels behind OurLife.Reset. Everything you need to scale a high-leverage brand from 0 to 30,000+ followers.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
          <a
            href="#enroll"
            className="scale-cta-btn py-3.5 px-8 text-base font-semibold w-full sm:w-auto shadow-lg shadow-[#1b3826]/15 hover:shadow-xl hover:shadow-[#1b3826]/25 transition-all"
          >
            <div className="scale-cta-sheen" />
            <span className="relative z-10">Join Private Discord — $29</span>
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

          <a
            href="#curriculum"
            className="py-3 px-6 text-sm font-semibold text-[#4a5950] hover:text-[#121814] transition-colors flex items-center gap-1.5"
          >
            <span>Explore The 5 Modules</span>
            <ChevronDown className="w-4 h-4 text-[#798a80]" />
          </a>
        </div>

        {/* Metrics Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-8 border-t border-[#e7e5dc]/60">
          <div className="p-3 bg-white rounded-xl border border-[#dedad0]/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold text-[#121814] font-mono">30,000+</div>
            <div className="text-[11px] text-[#798a80] font-medium mt-0.5">Organic Followers</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dedad0]/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold text-[#121814] font-mono">10M+</div>
            <div className="text-[11px] text-[#798a80] font-medium mt-0.5">Monthly Impressions</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dedad0]/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold text-[#121814] font-mono">100%</div>
            <div className="text-[11px] text-[#798a80] font-medium mt-0.5">Automated Production</div>
          </div>
          <div className="p-3 bg-white rounded-xl border border-[#dedad0]/80 shadow-2xs">
            <div className="text-xl sm:text-2xl font-bold text-[#121814] font-mono">80%+</div>
            <div className="text-[11px] text-[#798a80] font-medium mt-0.5">Loop Retention Rate</div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. CREATOR VIDEO MONTAGE
         ========================================================================= */}
      <section className="relative py-12 px-4 sm:px-6 max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-[#121814] tracking-tight">
            How We Build & Scale Daily
          </h2>
          <p className="text-sm sm:text-base text-[#4a5950] max-w-xl mx-auto mt-2">
            A glimpse into our production timeline, automated consistency, and audience retention metrics.
          </p>
        </div>

        {/* Video Player */}
        <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden border border-[#d8d5cb] bg-black shadow-2xl p-2 sm:p-3">
          <div className="scale-border-beam" />
          <div className="relative rounded-2xl overflow-hidden aspect-video bg-black">
            <video
              src="/videos/creator_montage.mp4"
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
         3. CURRICULUM MODULES (NO SECRETS REVEALED - OUTSIDE COVER VALUE)
         ========================================================================= */}
      <section id="curriculum" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#e7e5dc]">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#121814] tracking-tight">
            What You Learn Inside The Discord
          </h2>
          <p className="text-sm sm:text-base text-[#4a5950] max-w-xl mx-auto mt-2">
            No vague high-level theory. Every module is a tactical blueprint with practical templates and frameworks.
          </p>
        </div>

        <div className="space-y-6">
          {modules.map((mod) => (
            <div
              key={mod.num}
              className="bg-white rounded-2xl border border-[#dedad0] p-6 sm:p-8 shadow-xs hover:border-[#b8b3a5] transition-all"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-4 mb-4 border-b border-[#eceae3]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono font-bold bg-[#1b3826] text-white px-2.5 py-1 rounded-md">
                    MODULE {mod.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#121814]">
                    {mod.title}
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#798a80]">{mod.tagline}</span>
              </div>

              <p className="text-sm sm:text-base text-[#4a5950] leading-relaxed mb-6">
                {mod.desc}
              </p>

              <div className="bg-[#fcfbf9] rounded-xl p-4 border border-[#eceae3]">
                <div className="text-xs font-mono uppercase font-bold text-[#121814] mb-2.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Key Competencies:</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {mod.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-[#2e3b33] leading-snug">
                      <Check className="w-3.5 h-3.5 text-emerald-700 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
         4. ENROLLMENT & APPLICATION ($29 PRICING AS REQUESTED)
         ========================================================================= */}
      <section id="enroll" className="relative py-16 px-4 sm:px-6 max-w-4xl mx-auto border-t border-[#e7e5dc]">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-5xl font-bold text-[#121814] tracking-tight">
            Join The Private Discord
          </h2>
          <p className="text-sm sm:text-base text-[#4a5950] max-w-xl mx-auto mt-2">
            Direct access to Kabbir, live weekly account audits, our private viral swipe file, and automated batch frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Left: What's Included Card - $29 Price */}
          <div className="bg-[#1b3826] text-white rounded-2xl p-6 sm:p-8 shadow-xl">
            <h3 className="text-2xl font-bold tracking-tight mb-2 font-editorial">
              The 0 to 30k Mastermind Access
            </h3>
            <p className="text-xs text-emerald-100/80 mb-6 leading-relaxed">
              Full private Discord server access, complete 5-module curriculum, batch automation workflows, and weekly live account breakdowns.
            </p>

            <div className="space-y-3 pt-4 border-t border-emerald-800/80 mb-8">
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Private Discord channels with direct access to Kabbir</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>All 5 tactical creator modules from 0 to 30k</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Our complete automated batch production workflows</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Curated 500+ viral quote and hook swipe vault</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Bi-weekly live account audits & script teardowns</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-emerald-100">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>DM automation templates that turn comments into sales</span>
              </div>
            </div>

            <div className="bg-emerald-950/60 rounded-xl p-5 border border-emerald-800 text-center">
              <div className="text-xs font-mono text-emerald-300 uppercase tracking-wider mb-1">
                Discord Community Entry
              </div>
              <div className="text-4xl font-bold font-mono text-white mb-2">
                $29 <span className="text-xs font-sans text-emerald-200 font-normal">/ month</span>
              </div>
              <p className="text-[11px] text-emerald-200/70">
                Cancel anytime in one click. No hidden fees or contracts.
              </p>
            </div>
          </div>

          {/* Right: Quick Join / Application Form */}
          <div className="bg-white rounded-2xl border border-[#dedad0] p-6 sm:p-8 shadow-xs">
            <h3 className="text-xl font-bold text-[#121814] mb-1">Request Cohort Access</h3>
            <p className="text-xs text-[#4a5950] mb-6">
              Enter your handle and details below. We review accounts to ensure you&apos;re serious about building.
            </p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-700 mx-auto" />
                <h4 className="text-sm font-bold text-[#121814]">Application Received!</h4>
                <p className="text-xs text-[#4a5950] leading-relaxed">
                  We have queued your account review. You will receive an invite link directly to your email and Instagram handle within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700">
                    {errorMsg}
                  </div>
                )}

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="e.g., Alex Bennett"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="alex@example.com"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Instagram Handle</label>
                  <input
                    type="text"
                    required
                    value={form.handle}
                    onChange={(e) => setForm({ ...form, handle: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="@yourhandle"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">Current Followers</label>
                  <select
                    value={form.currentFollowers}
                    onChange={(e) => setForm({ ...form, currentFollowers: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                  >
                    <option value="0 - 1k">0 - 1,000 (Just starting)</option>
                    <option value="1k - 5k">1,000 - 5,000 (Early traction)</option>
                    <option value="5k - 20k">5,000 - 20,000 (Scaling phase)</option>
                    <option value="20k+">20,000+ (Looking to automate & monetize)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#121814] block mb-1">
                    Primary Bottleneck / Goal
                  </label>
                  <textarea
                    rows={2}
                    value={form.challenge}
                    onChange={(e) => setForm({ ...form, challenge: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-[#dedad0] focus:outline-emerald-800"
                    placeholder="What is holding your page back right now?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="scale-cta-btn w-full py-3 text-sm font-semibold"
                >
                  <div className="scale-cta-sheen" />
                  <span className="relative z-10">
                    {submitting ? "Submitting..." : "Apply For Discord Entry — $29"}
                  </span>
                  <ArrowRight className="w-4 h-4 relative z-10" />
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. FAQS
         ========================================================================= */}
      <section className="relative py-16 px-4 sm:px-6 max-w-3xl mx-auto border-t border-[#e7e5dc]">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#121814] tracking-tight">
            Creator Discord FAQ
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
         6. FOOTER
         ========================================================================= */}
      <footer className="w-full border-t border-[#e7e5dc] py-8 px-4 sm:px-6 text-center text-xs text-[#798a80] bg-[#fbfaf6]">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#121814]">OurLife.Reset</span>
            <span>·</span>
            <span>Creator Academy & Discord Mastermind</span>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="hover:text-[#121814] transition-colors">
              The Self-Mastery Guide ($19)
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
    </div>
  );
}
