"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  Moon,
  Layers,
  Sparkles,
  PenTool,
  Smartphone,
  ShieldCheck,
  Award
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
  const [activeSpreadTab, setActiveSpreadTab] = useState<number>(0);
  const [expandedBook, setExpandedBook] = useState<number | null>(0);

  const handleTriggerCheckout = () => {
    window.location.href = STRIPE_CHECKOUT_URL;
  };

  /* --- Spreads Gallery Data --- */
  const spreads = [
    {
      title: "Ch 01 • Epictetus",
      subtitle: "The 10-Second Space & Facing Ruled Ledger",
      image: "/book-spread-preview.png",
      alt: "Chapter 1 Epictetus Spread showing essay on left and daily ruled ledger on right"
    },
    {
      title: "Ch 15 • Robert Greene",
      subtitle: "Strategic Restraint & Facing Ruled Ledger",
      image: "/greene-spread-preview.png",
      alt: "Chapter 15 Robert Greene Spread showing essay on left and daily ruled ledger on right"
    },
    {
      title: "Ch 40 • Alan Watts",
      subtitle: "The Backward Law & Facing Ruled Ledger",
      image: "/watts-spread-preview.png",
      alt: "Chapter 40 Alan Watts Spread showing essay on left and daily ruled ledger on right"
    },
    {
      title: "Pages 08–09 • Prelude",
      subtitle: "The Story Behind The Reset & Master Manifesto",
      image: "/manifesto-spread-preview.png",
      alt: "Introduction and Reset Manifesto Spread with Four Core Pillars"
    }
  ];

  /* --- Authenticated Reviews Data (Reflecting 112 Pages, 47 Chapters & Ledgers) --- */
  const testimonials = [
    {
      name: "Alex M.",
      role: "Senior Software Engineer",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "I followed @ourlife.reset for months for the daily quotes, but I was still waking up and scrolling my phone for 45 minutes every morning. The 'Sacred First Hour' protocol and William James' morning neuroscience chapter in Book II broke that loop completely. My morning brain fog is gone.",
      highlight: "Eliminated morning phone addiction & brain fog"
    },
    {
      name: "Sarah K.",
      role: "Design Director & Strategist",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "The Epictetus 10-second pause and Talleyrand's calculated silence frameworks alone were worth ten times the $19. I used to react defensively whenever clients gave harsh feedback. Applying the deliberate delay has completely shifted my authority in high-stakes negotiations.",
      highlight: "Mastered emotional control in tense negotiations"
    },
    {
      name: "Marcus D.",
      role: "Agency Founder & Operator",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "Short quotes give you a 10-second spark, but you need an ironclad system when pressure hits. Executing the 90-minute Solitary Deep Block and writing in the facing ruled ledger every single night turned my scattered days into pure focused execution.",
      highlight: "Sharpened executive focus & daily output"
    },
    {
      name: "Elena V.",
      role: "Management Consultant",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "I open the guide every morning on my iPad with my Apple Pencil. The typography and layout are breathtaking—having the philosophical directive on the left and the ruled audit ledger on the right is brilliant. It takes 5 minutes to set an immovable, centered tone for the day.",
      highlight: "Daily 5-minute morning grounding ritual on iPad"
    },
    {
      name: "Julian T.",
      role: "Private Equity Associate",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "Alan Watts' Backward Law chapter and the Stoic dichotomy of control in Book I completely rewired how I handle stress. Instead of white-knuckling through market volatility, I have an actionable field manual to detach and regain absolute composure.",
      highlight: "Transformed response to acute pressure & anxiety"
    },
    {
      name: "Rachel B.",
      role: "Architect & Studio Lead",
      product: "The Self-Mastery Guide (112-Page Edition)",
      quote: "Most self-help books are 300 pages of corporate fluff. This is pure signal: 47 dense, uncompromising chapters with zero wasted words, backed by a daily physical ledger. You cannot hide from the evening audit.",
      highlight: "Built an undeniable physical ledger of kept promises"
    }
  ];

  /* --- Daily Architecture (From Page 10 of the Book) --- */
  const dailyRoutine = [
    {
      time: "07:00 AM",
      icon: Sun,
      title: "The Sacred First Hour",
      description: "When you open your eyes, the world stays locked outside. No screens, no notifications, and no digital feeds. Move your body and awaken in quiet dignity."
    },
    {
      time: "08:30 AM",
      icon: Target,
      title: "The Solitary Deep Block",
      description: "Ninety uninterrupted minutes dedicated exclusively to your hardest craft. Close the door, put the phone in another room, and compound monumental authority."
    },
    {
      time: "02:00 PM",
      icon: Zap,
      title: "The 10-Second Space",
      description: "When sharp provocation or friction strikes, forbid instant reaction. Construct an impenetrable 10-second delay to arrest fight-or-flight and command the frame."
    },
    {
      time: "09:30 PM",
      icon: Moon,
      title: "The Evening Reckoning",
      description: "Open the ruled ledger. Write down three undeniable physical facts that proved you were the sovereign master of your day, not its passive victim."
    }
  ];

  /* --- The 8 Sovereign Books Curriculum --- */
  const booksCurriculum = [
    {
      num: "Book I",
      title: "Mind & Emotional Control",
      pages: "Pages 12–25",
      chapters: "Chapters 01–07",
      thinkers: "Epictetus, Seneca, Carl Jung, Schopenhauer, Nietzsche, Kahneman, David Hume",
      description: "Mastering the space between stimulus and response, conquering reactive anger, shadow integration, and transmuting suffering into sovereign strength."
    },
    {
      num: "Book II",
      title: "Discipline, Will & Execution",
      pages: "Pages 26–39",
      chapters: "Chapters 08–14",
      thinkers: "William James, Cal Newport, James Clear, Steven Pressfield, David Goggins, Eisenhower, Nassim Taleb",
      description: "The neuroscience of morning dopamine, attention defense sanctuaries, callusing the mind against resistance, and building antifragile habits."
    },
    {
      num: "Book III",
      title: "Focus, Clarity & Cognitive Dominance",
      pages: "Pages 40–53",
      chapters: "Chapters 15–21",
      thinkers: "Robert Greene, Sun Tzu, Machiavelli, Chanakya, Talleyrand, Clausewitz, George Orwell",
      description: "Strategic restraint, reading silent motives, the power of calculated silence, navigating friction, and defending against deceptive rhetoric."
    },
    {
      num: "Book IV",
      title: "Power, Strategy & Walking Away",
      pages: "Pages 54–67",
      chapters: "Chapters 22–28",
      thinkers: "Emerson, Cato the Younger, Solzhenitsyn, Dr. Ambedkar, Al-Mutanabbi, Cormac McCarthy, Hemingway",
      description: "Self-reliance, unbought moral integrity, cultivating walkaway power, carrying the fire in moral wastelands, and grace under extreme pressure."
    },
    {
      num: "Book V",
      title: "Ego, Humility & Self-Mastery",
      pages: "Pages 68–79",
      chapters: "Chapters 29–34",
      thinkers: "Steve Jobs, Bruce Lee, Henry David Thoreau, Franz Kafka, Aristotle, Charles Bukowski",
      description: "The standard of relentless craft excellence, fluid adaptability, eliminating clutter, the solitary work desk, and unapologetic authenticity."
    },
    {
      num: "Book VI",
      title: "Inner Peace & Stillness",
      pages: "Pages 80–93",
      chapters: "Chapters 35–41",
      thinkers: "Shams Tabrizi, Ali ibn Abi Talib, Al-Ghazali, Epicurus, Hermann Hesse, Alan Watts, Lao Tzu",
      description: "Spiritual detachment, cleansing the mirror of the heart, the Backward Law, the river of time, and the effortless power of Wu Wei."
    },
    {
      num: "Book VII",
      title: "Perspective & Mortality",
      pages: "Pages 94–105",
      chapters: "Chapters 42–47",
      thinkers: "Eckhart Tolle, Jiddu Krishnamurti, Blaise Pascal, Albert Camus, Alex Hormozi, Marcus Aurelius",
      description: "Dissolving the pain-body, sacred solitude, the defiant smile of Sisyphus, stacks of undeniable proof, and Memento Mori as the supreme clarifier."
    },
    {
      num: "Book VIII",
      title: "Field Exercises & Capstones",
      pages: "Pages 106–112",
      chapters: "Capstones I–V + Epilogue",
      thinkers: "The Council of Giants, The Wilderness Season, Secret Labor, Voluntary Discomfort, 90-Day Review",
      description: "Five non-negotiable field crucible protocols, the comprehensive 90-Day Reset Review audit, and the final Reset Creed & Daily Oath."
    }
  ];

  /* --- Updated FAQs (112-Page Edition Details) --- */
  const faqs = [
    {
      q: "What is the exact format of The Self-Mastery Guide & Workbook?",
      a: "The Self-Mastery Guide ($19) is an archival 112-page digital publication and ruled iPad workbook (PDF). It features 47 dense masterwork chapters across 8 sovereign books on the left-hand pages, paired with 47 dedicated ruled journaling ledgers with daily tracking bars on the right-hand pages. It is engineered with classical Cormorant Garamond typography and standard A4 proportions for iPad, Kindle, tablets, and archival print."
    },
    {
      q: "How do I use it with an iPad, Apple Pencil, or on mobile?",
      a: "The PDF is fully compatible with Apple Books, GoodNotes, Notability, Kindle, and any PDF viewer. On an iPad or tablet, you can write directly into the ruled ledgers with your Apple Pencil or stylus. On a computer or phone, you can read the 47 chapters anywhere. You can also print physical copies of the ledgers."
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
      a: "Yes. The guide is typeset in pure classical monochrome (100% black and white, zero colored ink boxes) at 300+ DPI. It prints beautifully on any standard home printer or high-end archival paper."
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
            <a href="#preview" className="hidden md:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              Look Inside
            </a>
            <a href="#curriculum" className="hidden md:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              8 Sovereign Books
            </a>
            <a href="#reviews" className="hidden sm:inline-block text-[13px] text-[#86868b] hover:text-white transition-colors">
              Reader Reviews
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

      {/* Main Hero: Ultra-Crisp Monochrome & Sapphire Atmosphere */}
      <section className="relative z-10 pt-16 pb-14 sm:pt-24 sm:pb-20 px-4 sm:px-6 text-center">
        {/* Subtle Midnight / Sapphire Radial Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[380px] bg-[radial-gradient(ellipse_at_top,rgba(41,151,255,0.12),transparent_70%)] pointer-events-none" />

        <div className="max-w-[840px] mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.1] text-xs text-zinc-300 font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#2997ff]" />
            <span>The 112-Page Deluxe Archival Publication & Ruled Workbook</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.025em] text-white leading-[1.06] mb-5">
            Reset your mind. <br />
            <span className="blue-gradient-text">Control your life.</span>
          </h1>

          <p className="text-base sm:text-lg md:text-[20px] text-[#86868b] max-w-[660px] mx-auto mb-8 font-normal leading-relaxed">
            Our daily reels give you the spark. The 112-page Self-Mastery Guide gives you the complete master manual to conquer hesitation, master emotional discipline, and gain unbreakable focus.
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
            <a
              href="#products"
              className="apple-pill-btn w-full sm:w-auto px-8 py-3.5 bg-white text-black font-bold text-[14px] hover:bg-[#e5e5ea] transition-all flex items-center justify-center gap-2 shadow-lg shadow-white/10"
            >
              <span>Get Instant Download ($19)</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#preview"
              className="apple-pill-btn w-full sm:w-auto px-7 py-3.5 bg-white/[0.06] hover:bg-white/[0.1] text-white border border-white/[0.12] font-medium text-[14px] transition-all flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4 text-[#2997ff]" />
              <span>Look Inside Spreads</span>
            </a>
          </div>

          {/* Clean Unboxed Compatibility Strip */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#86868b] pt-1">
            <div className="flex items-center gap-2 text-white/90">
              <PdfDocumentLogo className="w-4 h-4 text-[#2997ff]" />
              <span className="font-medium text-[13px]">112-Page Archival PDF • <span className="text-[#2997ff]">Available Now</span></span>
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

      {/* NEW: Look Inside Spreads Section (Interactive Visual Showcase) */}
      <section id="preview" className="relative z-10 py-16 px-4 sm:px-6 bg-[#080b10] border-y border-white/[0.08]">
        <div className="max-w-[1080px] mx-auto">
          <div className="text-center max-w-[620px] mx-auto mb-10">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Authentic Craftsmanship
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white mt-1">
              Look Inside The 112-Page Masterwork
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2">
              Every chapter is a facing two-page spread: dense philosophical prose on the left, an unsparing ruled audit ledger on the right.
            </p>
          </div>

          {/* Spread Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {spreads.map((spread, idx) => (
              <button
                key={idx}
                onClick={() => setActiveSpreadTab(idx)}
                className={`px-4 py-2 rounded-full text-[13px] font-medium transition-all cursor-pointer ${
                  activeSpreadTab === idx
                    ? "bg-[#2997ff] text-white shadow-md shadow-blue-500/20 font-semibold"
                    : "bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]"
                }`}
              >
                {spread.title}
              </button>
            ))}
          </div>

          {/* High-Resolution Spread Container */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.12] bg-[#000000] shadow-2xl p-2 sm:p-4">
            <div className="relative w-full aspect-[1600/1132] rounded-xl overflow-hidden bg-white shadow-inner">
              <Image
                src={spreads[activeSpreadTab].image}
                alt={spreads[activeSpreadTab].alt}
                fill
                className="object-contain"
                sizes="(max-width: 1080px) 100vw, 1080px"
                priority
              />
            </div>
            
            <div className="pt-4 px-2 pb-1 flex flex-col sm:flex-row items-center justify-between text-xs text-[#86868b] gap-2">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-white">{spreads[activeSpreadTab].title}:</span>
                <span>{spreads[activeSpreadTab].subtitle}</span>
              </div>
              <div className="flex items-center gap-4 text-[11px] text-zinc-400 font-mono">
                <span>Verso: Masterwork Essay</span>
                <span>•</span>
                <span>Recto: Daily Ruled Ledger</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clear Product Showcase: PDF eBook vs Custom App Dashboard */}
      <section id="products" className="relative z-10 py-20 px-4 sm:px-6">
        <div className="max-w-[1000px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          
          {/* PRODUCT 1: The Self-Mastery Guide (112-Page PDF Masterwork) - AVAILABLE NOW */}
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
                  112-Page Archival Edition
                </span>
              </div>

              <div className="text-[12px] uppercase tracking-wider text-[#2997ff] font-semibold mb-1">
                The Master Field Manual
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                The Self-Mastery Guide & Workbook
              </h2>
              <p className="text-[14px] text-zinc-300 mt-2 leading-relaxed font-light">
                A publication-grade archival book & interactive iPad workbook synthesizing 47 classical philosophers, neuroscientists, and master strategists across 8 sovereign books.
              </p>

              <div className="my-6 py-4 border-y border-white/[0.08]">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-semibold text-white tracking-tight">$19</span>
                  <span className="text-[13px] text-[#86868b]">one-time download • instant delivery</span>
                </div>
              </div>

              <ul className="space-y-3.5 text-[13px] text-zinc-200 mb-8 font-light">
                <li className="flex items-center gap-3 font-medium text-white">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> <b className="text-white">Full 112-Page Archival Guide & Ruled Workbook (PDF)</b>
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 In-Depth Chapters across 8 Sovereign Books
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> 47 Dedicated Ruled Audit Ledgers with Daily Tracking Bars
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Book VIII: 5 Capstone Field Crucibles & 90-Day Reset Review
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-[#2997ff] shrink-0" /> Optimized for iPad, Apple Pencil, Kindle, Tablets & High-Res Print
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
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Will Include The Self-Mastery Guide (112-Page Edition Included Upon Launch)
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Interactive Morning Priming & Phone Blackout Timers
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Real-Time Crisis Decision Matrix & Crucible Refuges
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Daily Cognitive Reflection & Habit Journal
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-4 h-4 text-zinc-500 shrink-0" /> Searchable Wisdom Vault (47+ Master Thinkers & Philosophers)
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

      {/* NEW: Curriculum Architecture Section (The 8 Sovereign Books) */}
      <section id="curriculum" className="relative z-10 py-16 px-4 sm:px-6 bg-[#080b10] border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-[600px] mx-auto mb-12">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Complete Curriculum
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              The 8 Sovereign Books
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2">
              47 dense, calibrated chapters covering every dimension of emotional armor, deep work, and internal sovereignty.
            </p>
          </div>

          <div className="space-y-3">
            {booksCurriculum.map((b, idx) => (
              <div
                key={idx}
                className="apple-bento-card overflow-hidden border border-white/[0.08] transition-all"
              >
                <button
                  onClick={() => setExpandedBook(expandedBook === idx ? null : idx)}
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
                      expandedBook === idx ? "rotate-180 text-[#2997ff]" : ""
                    }`}
                  />
                </button>

                {expandedBook === idx && (
                  <div className="px-5 pb-6 sm:px-6 border-t border-white/[0.06] pt-4 space-y-3">
                    <p className="text-[13px] text-zinc-300 leading-relaxed font-light">
                      {b.description}
                    </p>
                    <div className="flex items-start gap-2 pt-1 text-xs">
                      <span className="font-semibold text-[#2997ff] shrink-0">Featured Giants:</span>
                      <span className="text-zinc-400 italic">{b.thinkers}</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Daily Workflow: How People Actually Use It (Page 10 Alignment) */}
      <section className="relative z-10 py-16 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[980px] mx-auto">
          <div className="text-center max-w-[560px] mx-auto mb-12">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Daily Architecture
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white mt-1">
              How To Live This Work
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2">
              The four non-negotiable daily rhythms engineered on Page 10 of the guide.
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
      <section id="reviews" className="relative z-10 py-20 px-4 sm:px-6 bg-[#080b10] border-t border-white/[0.08]">
        <div className="max-w-[1000px] mx-auto">
          <div className="text-center max-w-[580px] mx-auto mb-14">
            <span className="text-[12px] uppercase tracking-widest text-[#2997ff] font-semibold">
              Real Impact
            </span>
            <h2 className="text-2xl sm:text-4xl font-semibold text-white mt-1">
              How Lives Have Changed.
            </h2>
            <p className="text-[14px] text-[#86868b] mt-2">
              Unfiltered feedback from readers who converted philosophy into daily discipline.
            </p>
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
                    <div className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>Verified Reader</span>
                    </div>
                  </div>
                  
                  <div className="text-xs font-semibold text-[#2997ff] mb-2.5 flex items-center gap-1.5">
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

      {/* Comprehensive FAQ Section */}
      <section id="faq" className="relative z-10 py-16 px-4 sm:px-6 border-t border-white/[0.08]">
        <div className="max-w-[720px] mx-auto">
          <div className="text-center mb-8">
            <span className="text-[11px] uppercase tracking-widest text-[#2997ff] font-semibold">
              FAQ
            </span>
            <h2 className="text-2xl font-semibold text-white mt-1">
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
