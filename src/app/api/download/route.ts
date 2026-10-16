import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error("STRIPE_SECRET_KEY is not set in environment variables");
  }
  return new Stripe(key);
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id parameter" }, { status: 400 });
  }

  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status !== "paid") {
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
    console.error("Download error:", error);
    return NextResponse.json(
      { error: "Session verification failed: " + (error?.message || "Invalid session") },
      { status: 403 }
    );
  }
}
