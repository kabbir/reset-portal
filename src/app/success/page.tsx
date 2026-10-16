"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { Check, Download, AlertTriangle, ArrowRight, ShieldCheck, Mail, ArrowLeft } from "lucide-react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [status, setStatus] = useState<"loading" | "verified" | "error">("loading");
  const [details, setDetails] = useState<{
    customerEmail?: string | null;
    customerName?: string | null;
    amountTotal?: number | null;
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMessage("No session identifier was provided. Access cannot be granted without verified payment.");
      return;
    }

    async function checkVerification() {
      try {
        const res = await fetch(`/api/verify?session_id=${encodeURIComponent(sessionId!)}`);
        const data = await res.json();

        if (res.ok && data.valid) {
          setStatus("verified");
          setDetails(data);
          try {
            confetti({
              particleCount: 130,
              spread: 85,
              origin: { y: 0.55 },
              colors: ["#2997ff", "#ffffff", "#86868b", "#0071e3", "#d4af37"],
            });
          } catch {}
        } else {
          setStatus("error");
          setErrorMessage(data.error || "Payment has not been completed or verified for this session.");
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage("Network error while verifying payment status. Please try again or check your receipt.");
      }
    }

    checkVerification();
  }, [sessionId]);

  return (
    <div className="min-h-screen bg-[#050507] text-[#f4f4f5] flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#0071e3]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="w-full max-w-lg p-8 sm:p-10 rounded-[32px] bg-[#0d1117] border border-white/[0.12] shadow-2xl relative z-10">
        
        {/* Brand header */}
        <div className="flex items-center justify-center mb-6">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/20">
            <Image
              src="/logo-without-bg.png"
              alt="@ourlife.reset logo"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        </div>

        {status === "loading" && (
          <div className="py-16 text-center space-y-4">
            <div className="w-9 h-9 border-2 border-[#2997ff] border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-semibold text-white">Verifying Secure Payment...</h3>
            <p className="text-[13px] text-[#86868b]">Checking cryptographic confirmation with Stripe.</p>
          </div>
        )}

        {status === "verified" && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#2997ff]/15 border border-[#2997ff] flex items-center justify-center mx-auto text-[#2997ff] shadow-[0_0_30px_rgba(41,151,255,0.25)]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-semibold text-[#2997ff] uppercase tracking-widest mb-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Verified Stripe Transaction</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight">
                Access Granted.
              </h2>
              <p className="text-[13px] text-[#86868b] mt-1.5">
                Your payment was received and your digital assets are ready.
              </p>
            </div>

            {/* Product card with download */}
            <div className="p-5 rounded-2xl bg-black/60 border border-white/[0.08] text-left space-y-4">
              <div className="flex items-center justify-between pb-3.5 border-b border-white/[0.08]">
                <div>
                  <div className="text-[14px] font-semibold text-white">The Self-Mastery Guide</div>
                  <div className="text-[12px] text-[#86868b]">Full 200-Page Master PDF Publication</div>
                </div>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/20">
                  Paid
                </span>
              </div>

              <a
                href={`/api/download?session_id=${encodeURIComponent(sessionId!)}`}
                download="The_Self_Mastery_Guide_OurlifeReset.pdf"
                className="apple-pill-btn w-full py-4 bg-white text-black font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-[#e5e5ea] transition-all cursor-pointer shadow-lg"
              >
                <Download className="w-4 h-4" />
                <span>Download Your PDF Now</span>
              </a>
            </div>

            {/* Email reassurance */}
            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#2997ff] shrink-0 mt-0.5" />
              <div className="text-[12px] text-[#86868b] leading-relaxed">
                {details?.customerEmail ? (
                  <>
                    A receipt and order confirmation have been emailed to <strong className="text-white">{details.customerEmail}</strong>.
                  </>
                ) : (
                  <>A payment receipt has been automatically emailed to you by Stripe.</>
                )}
                <div className="text-[11px] text-[#86868b]/80 mt-1">
                  You can bookmark this page or revisit this link anytime to re-download your guide.
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/"
                className="text-[12px] text-[#86868b] hover:text-white transition-colors inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Homepage
              </Link>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-6 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-500/15 border border-amber-500/40 flex items-center justify-center mx-auto text-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div>
              <span className="text-[11px] font-semibold text-amber-400 uppercase tracking-widest block mb-1">
                Order Verification
              </span>
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                Confirming Your Access
              </h2>
              <p className="text-[13px] text-[#86868b] mt-2 leading-relaxed">
                {errorMessage && !errorMessage.includes("STRIPE_SECRET_KEY") && !errorMessage.includes("not set")
                  ? errorMessage
                  : "We are currently synchronizing with Stripe to confirm your transaction details."}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left text-[12px] text-[#86868b] leading-relaxed">
              If you just completed payment, your official receipt and order details have been securely delivered to your email by Stripe. If you need immediate assistance or a manual download link, send a direct message to <strong className="text-white">@ourlife.reset</strong> on Instagram and we will assist you right away.
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => window.location.reload()}
                className="apple-pill-btn px-6 py-3 bg-white text-black font-semibold text-[13px] hover:bg-[#e5e5ea] transition-all cursor-pointer"
              >
                Refresh & Re-Check
              </button>
              <Link
                href="/"
                className="apple-pill-btn px-6 py-3 bg-white/10 text-white font-medium text-[13px] hover:bg-white/20 transition-all inline-flex items-center gap-2"
              >
                <span>Return to Homepage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#050507] text-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-[#2997ff] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
