import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Refund & Return Policy • OurLife.Reset",
  description: "Official store refund, return, and cancellation policy for digital publications from OurLife.Reset."
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-white selection:bg-white selection:text-black antialiased font-riviera px-4 py-12 sm:py-20">
      <div className="max-w-[760px] mx-auto">
        {/* Navigation */}
        <div className="mb-10 flex items-center justify-between border-b border-white/15 pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Publication
          </Link>

          <div className="flex items-center gap-3">
            <div className="relative w-6 h-6 rounded-none overflow-hidden border border-white/20">
              <Image
                src="/logo-with-bg.png"
                alt="OurLife.Reset logo"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="text-xs uppercase tracking-[0.25em] font-medium text-white">OurLife.Reset</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-white/15 pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/15 text-[10px] font-medium text-white/60 tracking-[0.25em] uppercase mb-4 rounded-none">
            <ShieldCheck className="w-3 h-3 text-white" />
            Official Store Policy
          </div>
          <h1 className="text-2xl sm:text-4xl font-light tracking-[0.16em] uppercase text-white mb-3">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs text-white/50 tracking-[0.05em]">
            Last updated: October 2026 • Effective for all digital acquisitions through Stripe
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-xs sm:text-sm leading-relaxed text-white/70 font-light tracking-[0.01em]">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/15 p-6 sm:p-8 rounded-none">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-white" />
              1. Digital Products Policy (All Sales Final)
            </h2>
            <p className="mb-3">
              All acquisitions on this portal, including <strong className="text-white font-medium">The Self-Mastery Guide & Workbook (112-Page PDF)</strong>, are digital publications delivered immediately via electronic transmission upon successful transaction confirmation.
            </p>
            <p className="text-white/50">
              Because digital assets are instantly accessible, downloadable, and non-returnable once access has been granted, <strong className="text-white font-medium">all sales are final</strong>. We do not provide cash refunds, chargebacks, returns, or order cancellations once checkout is completed.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-white/15 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              2. Download & Delivery Guarantee
            </h2>
            <p>
              When your transaction completes, you are immediately redirected to a secure session-authenticated download page. Additionally, an order receipt with persistent access is automatically dispatched to the email address provided during checkout.
            </p>
            <p>
              If you experience any technical difficulties downloading, opening, or viewing your file, we guarantee full replacement and 100% technical support.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-white/15 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              3. Chargebacks and Payment Disputes
            </h2>
            <p>
              All transactions are secured via 3D Secure / Stripe Radar authentication. Opening an unauthorized or fraudulent chargeback through your financial institution after receiving digital file access is a violation of our terms of service.
            </p>
            <p>
              In the event of a payment dispute, your transaction records, IP address, session download logs, and timestamped delivery receipts will be submitted to the card processor as legal proof of delivery.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 border-t border-white/15 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              4. Technical Support & Assistance
            </h2>
            <p>
              If your download link expires or you do not see your confirmation email within 5 minutes, please check your spam folder or contact our support channel directly:
            </p>
            <div className="p-4 bg-white/[0.03] border border-white/15 flex items-center justify-between rounded-none">
              <div>
                <p className="text-white font-medium text-xs uppercase tracking-[0.2em]">Direct Support Channel</p>
                <p className="text-[11px] text-white/50 mt-0.5">Instagram DM: @ourlife.reset</p>
              </div>
              <a
                href="https://instagram.com/ourlife.reset"
                target="_blank"
                rel="noopener noreferrer"
                className="rr-btn px-4 py-2 border border-white text-white text-[10px] font-medium hover:bg-white hover:text-black transition-colors rounded-none"
              >
                Message Us
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/15 flex items-center justify-between text-[11px] text-white/40 uppercase tracking-[0.2em]">
          <p>© 2026 OurLife.Reset. All rights reserved.</p>
          <Link href="/" className="text-white hover:underline">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
