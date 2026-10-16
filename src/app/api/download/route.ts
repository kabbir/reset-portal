import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

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
    return NextResponse.json({ error: "Missing session identifier" }, { status: 400 });
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Download service is temporarily syncing. Please refresh in a moment." },
      { status: 500 }
    );
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId.trim());

    const isPaid =
      session.payment_status === "paid" ||
      session.payment_status === "no_payment_required" ||
      session.status === "complete";

    if (!isPaid) {
      return NextResponse.json(
        { error: "Payment required. This session has not been marked as paid." },
        { status: 403 }
      );
    }

    const filePath = path.join(process.cwd(), "private-assets", "The_Self_Mastery_Guide_OurlifeReset.pdf");

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "Deliverable file not found on server." }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="The_Self_Mastery_Guide_OurlifeReset.pdf"',
        "Content-Length": fileBuffer.length.toString(),
        "Cache-Control": "private, no-cache, no-store, must-revalidate",
      },
    });
  } catch (error: any) {
    console.error("Download verification error:", error?.message);
    return NextResponse.json(
      { error: "Session verification could not be completed. Please refresh or contact @ourlife.reset." },
      { status: 403 }
    );
  }
}
