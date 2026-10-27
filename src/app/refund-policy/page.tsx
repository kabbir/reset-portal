import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, AlertCircle } from "lucide-react";
import { StripeLogo, InstagramLogo } from "@/components/BrandLogos";

export const metadata = {
  title: "Refund & Return Policy • OurLife.Reset",
  description: "Official store refund, return, and cancellation policy for digital products from OurLife.Reset."
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
            Back to Home
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
          <div className="flex items-center gap-2 text-xs text-white/50 tracking-[0.05em]">
            <span>Last updated: October 2026</span>
            <span>·</span>
            <div className="flex items-center gap-1.5">
              <StripeLogo className="h-3 w-auto opacity-70" />
              <span>Stripe Checkout</span>
            </div>
          </div>
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
              All purchases on this store, including <strong className="text-white font-medium">The Self-Mastery Guide (112-Page PDF)</strong>, are digital products delivered immediately via instant download upon successful payment confirmation.
            </p>
            <p className="text-white/50">
              Because digital files are immediately accessible, downloadable, and non-returnable once access has been sent, <strong className="text-white font-medium">all sales are final</strong>. We do not provide cash refunds, chargebacks, returns, or order cancellations once checkout is completed.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 border-t border-white/15 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              2. Download & Delivery Guarantee
            </h2>
            <p>
              When your checkout completes, you are immediately redirected to a secure download page. Additionally, your receipt with a direct download link is automatically sent to the email address you entered during checkout.
            </p>
            <p>
              If you have any difficulty downloading, opening, or viewing your file on any device, we guarantee full replacement and technical support until you have your copy.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 border-t border-white/15 pt-8">
            <h2 className="text-sm font-medium uppercase tracking-[0.18em] text-white">
              3. Payment Security & Disputes
            </h2>
            <p>
              All transactions are secured via 3D Secure and Stripe Radar protection. Opening an unauthorized chargeback through your bank after receiving digital access is a direct violation of our store terms.
            </p>
            <p>
              In the event of a dispute, your transaction records, IP address, download logs, and timestamped email receipts will be submitted to the card processor as legal proof of delivery.
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
                <div className="flex items-center gap-1.5 text-[11px] text-white/60 mt-0.5">
                  <InstagramLogo className="w-3 h-3 opacity-70" />
                  <span>Instagram DM: @ourlife.reset</span>
                </div>
              </div>
              <a
                href="https://instagram.com/ourlife.reset"
                target="_blank"
                rel="noopener noreferrer"
                className="rr-btn flex items-center gap-1.5 px-4 py-2 border border-white text-white text-[10px] font-medium hover:bg-white hover:text-black transition-colors rounded-none"
              >
                <InstagramLogo className="w-3 h-3" />
                <span>Message Us</span>
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
