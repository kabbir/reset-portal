"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Users,
  MessageSquare,
  CheckCircle,
  Clock,
  Mail,
  Copy,
  Check,
  Star,
  ExternalLink,
  ArrowLeft,
  RefreshCw,
  ShieldAlert
} from "lucide-react";

interface Application {
  id: string;
  name: string;
  email: string;
  handle?: string;
  date: string;
  reason: string;
  status: "pending" | "approved" | "rejected";
}

interface Review {
  id: string;
  name: string;
  role?: string;
  date: string;
  rating: number;
  highlight?: string;
  comment: string;
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<"applications" | "reviews">("applications");
  const [applications, setApplications] = useState<Application[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [appRes, revRes] = await Promise.all([
        fetch("/api/apply"),
        fetch("/api/reviews")
      ]);

      if (appRes.ok) {
        const appData = await appRes.json();
        setApplications(appData);
      }
      if (revRes.ok) {
        const revData = await revRes.json();
        setReviews(revData);
      }
    } catch (err) {
      console.error("Failed to fetch admin data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#111c14] text-[#f7f6f2] font-sans antialiased selection:bg-[#476a50] selection:text-white pb-20">
      {/* Top Navbar */}
      <header className="border-b border-[#243b2c] bg-[#142319]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 text-xs text-[#a0b5a6] hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Site</span>
            </Link>
            <span className="text-[#344e3d]">|</span>
            <div className="flex items-center gap-2">
              <Image
                src="/logo-with-bg.png"
                alt="Logo"
                width={26}
                height={26}
                className="rounded-md border border-[#344e3d]"
              />
              <span className="font-semibold text-sm tracking-tight text-white">Founder Console</span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#1e3425] text-[#9fc7ab] border border-[#2d4d37]">
                Private Access
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#1e3425] hover:bg-[#284532] text-[#d6e3d9] transition-colors border border-[#344e3d]"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-[#2d4d37] hover:bg-[#386045] text-white transition-colors"
            >
              <span>Live Site</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pt-8">
        {/* Welcome & Metric Cards */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-white tracking-tight">
            Entries &amp; Submissions
          </h1>
          <p className="text-xs sm:text-sm text-[#a3b8aa] mt-1">
            Review incoming community membership requests and customer feedback in real-time.
          </p>
        </div>

        {/* Metric Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8">
          <div className="p-4 rounded-xl bg-[#17271d] border border-[#294232]">
            <div className="flex items-center justify-between text-xs text-[#9eb6a6] mb-1">
              <span>Applications</span>
              <Users className="w-4 h-4 text-[#7eab8c]" />
            </div>
            <div className="text-2xl font-bold text-white">{applications.length}</div>
            <div className="text-[11px] text-[#7eab8c] mt-0.5">30k Community Circle</div>
          </div>

          <div className="p-4 rounded-xl bg-[#17271d] border border-[#294232]">
            <div className="flex items-center justify-between text-xs text-[#9eb6a6] mb-1">
              <span>Reviews</span>
              <MessageSquare className="w-4 h-4 text-[#7eab8c]" />
            </div>
            <div className="text-2xl font-bold text-white">{reviews.length}</div>
            <div className="text-[11px] text-[#7eab8c] mt-0.5">Verified Reader Feed</div>
          </div>

          <div className="p-4 rounded-xl bg-[#17271d] border border-[#294232]">
            <div className="flex items-center justify-between text-xs text-[#9eb6a6] mb-1">
              <span>Avg. Rating</span>
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            </div>
            <div className="text-2xl font-bold text-white">4.9 / 5.0</div>
            <div className="text-[11px] text-[#9eb6a6] mt-0.5">Google Reviews Standard</div>
          </div>

          <div className="p-4 rounded-xl bg-[#17271d] border border-[#294232]">
            <div className="flex items-center justify-between text-xs text-[#9eb6a6] mb-1">
              <span>Discord Link</span>
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-sm font-semibold text-white truncate mt-1.5">Direct Invite Ready</div>
            <div className="text-[11px] text-[#7eab8c] mt-0.5">Manual Review Required</div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#243b2c] mb-6">
          <button
            onClick={() => setActiveTab("applications")}
            className={`pb-3 px-4 text-sm font-medium transition-all relative ${
              activeTab === "applications"
                ? "text-white font-semibold"
                : "text-[#8ea495] hover:text-[#d0e0d5]"
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>Community Applications</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#1e3425] text-[#9fc7ab] border border-[#2e4f39]">
                {applications.length}
              </span>
            </div>
            {activeTab === "applications" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#649e77]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab("reviews")}
            className={`pb-3 px-4 text-sm font-medium transition-all relative ${
              activeTab === "reviews"
                ? "text-white font-semibold"
                : "text-[#8ea495] hover:text-[#d0e0d5]"
            }`}
          >
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              <span>Customer Reviews</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-[#1e3425] text-[#9fc7ab] border border-[#2e4f39]">
                {reviews.length}
              </span>
            </div>
            {activeTab === "reviews" && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#649e77]" />
            )}
          </button>
        </div>

        {/* Tab 1: Community Applications */}
        {activeTab === "applications" && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#17271d] border border-[#284333]">
                <Clock className="w-8 h-8 text-[#6d8a76] mx-auto mb-3" />
                <h3 className="text-base font-semibold text-white">No applications yet</h3>
                <p className="text-xs text-[#8da394] mt-1">
                  When visitors submit the form on the landing page, their entries appear here instantly.
                </p>
              </div>
            ) : (
              applications.map((app) => (
                <div
                  key={app.id}
                  className="p-5 sm:p-6 rounded-2xl bg-[#16271c] border border-[#263e2e] shadow-sm hover:border-[#385b44] transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#213829]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#1e3425] border border-[#31523b] flex items-center justify-center font-bold text-white text-sm">
                        {app.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-bold text-white">{app.name}</h3>
                          {app.handle && (
                            <span className="text-xs text-[#7eab8c] font-mono">{app.handle}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#9eb6a6] mt-0.5">
                          <Mail className="w-3.5 h-3.5" />
                          <span>{app.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-start sm:self-auto">
                      <span className="text-xs text-[#7e9987] font-mono">{app.date}</span>
                      <button
                        onClick={() => copyToClipboard(app.email, app.id)}
                        className="flex items-center gap-1 px-2.5 py-1 rounded-md text-xs bg-[#1f3827] hover:bg-[#284933] text-[#d6e3d9] border border-[#31573c] transition-colors"
                        title="Copy email address"
                      >
                        {copiedId === app.id ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Email</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Submission Statement */}
                  <div className="mt-4">
                    <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7ea68a] mb-1.5">
                      Why they should be granted access:
                    </div>
                    <p className="text-sm text-[#e4ede7] leading-relaxed font-light bg-[#121f16] p-3.5 rounded-xl border border-[#1f3526]">
                      &ldquo;{app.reason}&rdquo;
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Reviews */}
        {activeTab === "reviews" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-[#16271c] border border-[#263e2e] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-[#1e3425] border border-[#31523b] flex items-center justify-center font-bold text-white text-xs">
                        {rev.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white">{rev.name}</div>
                        <div className="text-xs text-[#8ea495]">{rev.role || "Verified Reader"}</div>
                      </div>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  {rev.highlight && (
                    <div className="text-xs font-semibold text-white mb-1.5">
                      &ldquo;{rev.highlight}&rdquo;
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-[#d4e0d7] font-light leading-relaxed">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#213829] flex items-center justify-between text-[11px] text-[#819e8b]">
                  <span>{rev.date}</span>
                  <span className="text-emerald-400 font-medium">Verified Purchase</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
