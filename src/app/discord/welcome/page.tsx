"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import confetti from "canvas-confetti";
import Navbar from "@/components/Navbar";
import { DiscordLogo, StripeLogo } from "@/components/BrandLogos";
import { ShieldCheck, AlertTriangle, ArrowRight, Lock, CheckCircle2, Copy, Check } from "lucide-react";

function DiscordWelcomeContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "verified" | "error" | "unauthorized">("loading");
  const [details, setDetails] = useState<{
    customerEmail?: string | null;
    customerName?: string | null;
    inviteUrl?: string;
    isSingleUse?: boolean;
    alreadyClaimed?: boolean;
    pendingBotConfig?: boolean;
    message?: string;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setStatus("unauthorized");
      setErrorMessage("No checkout session found. Access to this private community requires a verified $29 membership.");
      return;
    }

    async function verifyAndFetchInvite() {
      try {
        const res = await fetch("/api/discord/invite", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sessionId }),
        });

        const data = await res.json();

        if (res.ok && data.valid) {
          setStatus("verified");
          setDetails(data);
          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.5 },
              colors: ["#ffffff", "#5865F2", "#86868b", "#d4af37"],
            });
          } catch {}
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Payment verification failed. Please check your transaction or receipt.");
        }
      } catch {
        setStatus("error");
        setErrorMessage("Connection error while validating your membership. Please refresh this page.");
      }
    }

    verifyAndFetchInvite();
  }, [sessionId]);

  const handleCopy = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="relative min-h-screen w-full max-w-full bg-[#0a0a0a] text-white font-riviera overflow-x-clip selection:bg-white selection:text-black">
      <Navbar activePage="discord" />

      <main className="relative pt-24 sm:pt-32 pb-24 px-4 sm:px-8 max-w-3xl mx-auto">
        {/* State 1: Loading Verification */}
        {status === "loading" && (
          <div className="border border-white/15 bg-black p-10 sm:p-16 text-center space-y-6 rounded-none">
            <div className="w-10 h-10 border-2 border-white border-t-transparent animate-spin mx-auto rounded-none" />
            <h2 className="font-riviera text-xl sm:text-2xl font-light uppercase tracking-[0.18em] text-white">
              VERIFYING MEMBERSHIP WITH STRIPE...
            </h2>
            <p className="font-riviera text-xs text-white/50 font-light max-w-md mx-auto">
              Confirming your $29 transaction and generating your encrypted single-use Discord access link.
            </p>
          </div>
        )}

        {/* State 2: Unauthorized (No Session) */}
        {status === "unauthorized" && (
          <div className="border border-white/15 bg-black p-10 sm:p-16 text-center space-y-6 rounded-none">
            <div className="w-14 h-14 border border-white/20 flex items-center justify-center mx-auto text-white/60">
              <Lock className="w-6 h-6" />
            </div>
            <span className="font-riviera text-[11px] uppercase tracking-[0.3em] text-red-400 block font-medium">
              ACCESS RESTRICTED
            </span>
            <h1 className="font-riviera text-2xl sm:text-4xl font-light uppercase tracking-[0.16em] text-white">
              VERIFIED MEMBERSHIP REQUIRED
            </h1>
            <p className="font-riviera text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-md mx-auto">
              The OurLife.Reset Creator Discord is an exclusive private community. Access is granted exclusively upon verified completion of the $29 membership checkout.
            </p>
            <div className="pt-4">
              <Link
                href="/discord#enroll"
                className="rr-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-xs font-medium tracking-[0.25em] uppercase border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all rounded-none"
              >
                <DiscordLogo className="w-4 h-4" />
                <span>Join Creator Discord — $29</span>
              </Link>
            </div>
          </div>
        )}

        {/* State 3: Payment Error */}
        {status === "error" && (
          <div className="border border-red-500/30 bg-black p-10 sm:p-16 text-center space-y-6 rounded-none">
            <div className="w-14 h-14 border border-red-500/40 flex items-center justify-center mx-auto text-red-400">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <span className="font-riviera text-[11px] uppercase tracking-[0.3em] text-red-400 block font-medium">
              VERIFICATION FAILED
            </span>
            <h1 className="font-riviera text-2xl sm:text-3xl font-light uppercase tracking-[0.16em] text-white">
              UNABLE TO CONFIRM PAYMENT
            </h1>
            <p className="font-riviera text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-md mx-auto">
              {errorMessage}
            </p>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => window.location.reload()}
                className="w-full sm:w-auto px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white/20 text-white hover:border-white transition-all rounded-none"
              >
                Retry Verification
              </button>
              <Link
                href="/discord#enroll"
                className="w-full sm:w-auto px-6 py-3 text-xs tracking-[0.2em] uppercase border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all rounded-none"
              >
                Go to Checkout
              </Link>
            </div>
          </div>
        )}

        {/* State 4: Verified Success */}
        {status === "verified" && details && (
          <div className="space-y-8">
            {/* Header Box */}
            <div className="border border-white/15 bg-black p-8 sm:p-12 text-center rounded-none">
              <div className="inline-flex items-center justify-center gap-2 mb-4 text-emerald-400 border border-emerald-500/30 px-3.5 py-1 bg-emerald-950/20 rounded-none">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span className="font-riviera text-[10px] uppercase tracking-[0.25em] font-medium">
                  Verified Payment Confirmed · $29/mo
                </span>
              </div>

              <h1 className="font-riviera text-2xl sm:text-4xl md:text-5xl font-light uppercase tracking-[0.16em] text-white mb-3 leading-tight">
                WELCOME TO THE CREATOR DISCORD
              </h1>

              <p className="font-riviera text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-lg mx-auto">
                {details.customerName ? `Welcome, ${details.customerName}. ` : "Welcome. "}
                Your membership is active. Follow the steps below to join the private server.
              </p>
            </div>

            {/* Invite Claim Card */}
            <div className="border border-white/15 bg-[#0e0e0e] p-8 sm:p-10 rounded-none space-y-6">
              <div className="flex items-center justify-between border-b border-white/15 pb-4">
                <div className="flex items-center gap-2.5">
                  <DiscordLogo className="w-5 h-5 text-white/90" />
                  <span className="font-riviera text-xs uppercase tracking-[0.25em] font-medium text-white">
                    YOUR EXCLUSIVE ACCESS LINK
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] text-white/40 uppercase tracking-[0.2em]">
                  <StripeLogo className="h-2.5 w-auto opacity-60" />
                  <span>Secured</span>
                </div>
              </div>

              {details.inviteUrl ? (
                <div className="space-y-6">
                  {/* Big Primary Action Button */}
                  <a
                    href={details.inviteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rr-btn flex items-center justify-center gap-3 w-full py-5 text-xs uppercase tracking-[0.25em] font-medium border border-white bg-white text-black hover:bg-transparent hover:text-white transition-all cursor-pointer rounded-none text-center"
                  >
                    <DiscordLogo className="w-4 h-4" />
                    <span>Enter Private Discord Server</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  {/* Copy Link Option */}
                  <div className="flex items-center gap-2 pt-2">
                    <input
                      type="text"
                      readOnly
                      value={details.inviteUrl}
                      className="w-full px-3.5 py-2.5 text-xs rounded-none border border-white/15 bg-black text-white/80 font-mono tracking-wider focus:outline-none"
                    />
                    <button
                      onClick={() => handleCopy(details.inviteUrl!)}
                      className="px-4 py-2.5 border border-white/20 bg-white/5 hover:bg-white hover:text-black text-white text-[10px] uppercase tracking-[0.2em] flex items-center gap-1.5 transition-colors cursor-pointer rounded-none shrink-0"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy"}</span>
                    </button>
                  </div>

                  {/* Anti-Sharing Security Warning */}
                  <div className="border border-amber-500/30 bg-amber-950/15 p-4 rounded-none space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300 font-riviera text-[11px] uppercase tracking-[0.2em] font-medium">
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <span>Single-Use Protection Active</span>
                    </div>
                    <p className="font-riviera text-[11px] text-amber-200/80 font-light leading-relaxed">
                      This invite code is uniquely bound to your purchase. The instant you enter the server, this link expires permanently. If shared with anyone else, the link will show &ldquo;Invite Invalid or Expired&rdquo; and access will be denied.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-white/15 bg-black p-6 rounded-none space-y-3">
                  <span className="font-riviera text-[11px] uppercase tracking-[0.2em] text-white/60 block">
                    MANUAL PROVISIONING
                  </span>
                  <p className="font-riviera text-xs text-white/80 font-light leading-relaxed">
                    {details.message ||
                      "Your payment is verified! Please message @ourlife.reset on Instagram to receive your personal invite link."}
                  </p>
                </div>
              )}

              {/* Server Orientation Guide */}
              <div className="border-t border-white/15 pt-6 space-y-4">
                <span className="font-riviera text-[10px] uppercase tracking-[0.3em] text-white/40 block font-medium">
                  FIRST 3 STEPS INSIDE:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-riviera text-xs font-light text-white/70">
                  <div className="border border-white/10 p-3.5 bg-black/40">
                    <span className="text-white block font-medium mb-1">01. Join Server</span>
                    <span className="text-[11px] text-white/50 leading-relaxed block">
                      Click the button above to enter the private server before the link expires.
                    </span>
                  </div>
                  <div className="border border-white/10 p-3.5 bg-black/40">
                    <span className="text-white block font-medium mb-1">02. Check Announcements</span>
                    <span className="text-[11px] text-white/50 leading-relaxed block">
                      Find the calendar for upcoming weekly live account reviews and workshops.
                    </span>
                  </div>
                  <div className="border border-white/10 p-3.5 bg-black/40">
                    <span className="text-white block font-medium mb-1">03. Access Quote Vault</span>
                    <span className="text-[11px] text-white/50 leading-relaxed block">
                      Head to #creator-vault to access the 500+ viral quote and batch script templates.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DiscordWelcomePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white font-riviera">
          <div className="w-8 h-8 border-2 border-white border-t-transparent animate-spin rounded-none" />
        </div>
      }
    >
      <DiscordWelcomeContent />
    </Suspense>
  );
}
