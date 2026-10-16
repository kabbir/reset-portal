import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

function getStripe(): Stripe | null {
  const rawKey =
    process.env.Stripe_API_Key ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_API_KEY ||
    process.env.stripe_api_key;
  if (!rawKey) {
    console.error("Stripe API Key is not configured in environment variables");
    return null;
  }
  const key = rawKey.trim().replace(/^["']|["']$/g, "");
  return new Stripe(key);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false, error: "Missing session identifier" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { valid: false, error: "Payment verification service is temporarily unavailable. Please refresh in a moment." },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId.trim());

    if (session.payment_status === "paid" || session.status === "complete") {
      return NextResponse.json({
        valid: true,
        customerEmail: session.customer_details?.email || null,
        customerName: session.customer_details?.name || null,
        amountTotal: session.amount_total,
      });
    }

    return NextResponse.json(
      { valid: false, error: "Payment has not yet been marked as completed." },
      { status: 403 }
    );
  } catch (error: any) {
    console.error("Stripe verify error:", error?.message);
    return NextResponse.json(
      { valid: false, error: error?.message || "Unable to verify transaction" },
      { status: 403 }
    );
  }
}
