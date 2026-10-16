import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ valid: false, error: "Missing session_id parameter" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === "paid") {
      return NextResponse.json({
        valid: true,
        customerEmail: session.customer_details?.email || null,
        customerName: session.customer_details?.name || null,
        amountTotal: session.amount_total,
      });
    }

    return NextResponse.json(
      { valid: false, error: "Payment has not been completed." },
      { status: 403 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { valid: false, error: error?.message || "Invalid session identifier" },
      { status: 403 }
    );
  }
}
