import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Mail, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Refund & Return Policy • @ourlife.reset",
  description: "Official store refund, return, and cancellation policy for digital publications from @ourlife.reset."
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen w-full bg-black text-[#f5f5f7] selection:bg-[#2997ff] selection:text-white antialiased font-sans px-4 py-12 sm:py-20">
      <div className="max-w-[760px] mx-auto">
        {/* Navigation */}
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-[#86868b] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden border border-white/20">
              <Image
                src="/logo-without-bg.png"
                alt="@ourlife.reset logo"
                width={24}
                height={24}
                className="object-cover"
              />
            </div>
            <span className="text-[13px] font-semibold text-white">@ourlife.reset</span>
          </div>
        </div>

        {/* Header */}
        <div className="border-b border-white/[0.08] pb-8 mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/[0.1] text-[11px] font-medium text-[#86868b] tracking-wider uppercase mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2997ff]" />
            Official Store Policy
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
            Refund & Cancellation Policy
          </h1>
          <p className="text-[14px] text-[#86868b]">
            Last updated: October 20, 2026 • Effective for all digital purchases through Stripe
          </p>
        </div>

        {/* Content Body */}
        <div className="space-y-8 text-[15px] leading-relaxed text-[#a1a1a6]">
          {/* Section 1 */}
          <section className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#2997ff]" />
              1. Digital Products Policy (All Sales Final)
            </h2>
            <p className="mb-3">
              All products sold on this portal, including <strong className="text-white">The Self-Mastery Guide & Workbook (112-Page PDF)</strong>, are digital goods delivered immediately via electronic download upon successful payment confirmation.
            </p>
            <p className="text-[#86868b]">
              Because digital publications are instantly accessible, downloadable, and non-returnable once access has been provided, <strong className="text-white">all sales are final</strong>. We do not provide cash refunds, chargebacks, returns, or order cancellations once checkout is completed.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              2. Download & Delivery Guarantee
            </h2>
            <p>
              When your transaction completes, you are immediately redirected to a secure session-authenticated download page. Additionally, an order receipt with persistent access is automatically dispatched to the email address provided during checkout.
            </p>
            <p>
              If you experience any technical difficulties downloading, opening, or viewing your file, we guarantee full replacement and technical support.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
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
          <section className="space-y-3">
            <h2 className="text-lg font-semibold text-white">
              4. Technical Support & Assistance
            </h2>
            <p>
              If your download link expires or you do not see your confirmation email within 5 minutes, please check your spam folder or contact our support channel directly:
            </p>
            <div className="p-4 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-between">
              <div>
                <p className="text-white font-medium text-sm">Direct Support Channel</p>
                <p className="text-xs text-[#86868b]">Instagram DM: @ourlife.reset</p>
              </div>
              <a
                href="https://instagram.com/ourlife.reset"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-lg bg-[#2997ff] text-white text-xs font-medium hover:bg-[#1f7ae0] transition-colors"
              >
                Message Us
              </a>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-white/[0.08] flex items-center justify-between text-xs text-[#86868b]">
          <p>© 2026 Reset Philosophy. All rights reserved.</p>
          <Link href="/" className="text-[#2997ff] hover:underline">
            Return to Store
          </Link>
        </div>
      </div>
    </div>
  );
}
