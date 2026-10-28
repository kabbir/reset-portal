import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "discord_claims.json");

function getInitialClaims() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading discord_claims.json:", err);
  }
  return [];
}

let inMemoryClaims = getInitialClaims();

function getStripe(): Stripe | null {
  const rawKey =
    process.env.Stripe_API_Key ||
    process.env.STRIPE_SECRET_KEY ||
    process.env.STRIPE_API_KEY ||
    process.env.stripe_api_key;
  if (!rawKey) return null;
  const key = rawKey.trim().replace(/^["']|["']$/g, "");
  return new Stripe(key);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, handle, currentFollowers, challenge } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Name and email are required to claim Discord access." },
        { status: 400 }
      );
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const newClaim = {
      id: `claim-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      handle: handle ? handle.trim() : "",
      followers: currentFollowers || "Not specified",
      challenge: challenge || "Claimed Discord membership",
      date: formattedDate,
      status: "pending_payment"
    };

    inMemoryClaims = [newClaim, ...inMemoryClaims];

    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(inMemoryClaims, null, 2), "utf-8");
    } catch (writeError) {
      console.warn("Could not write discord claim to disk:", writeError);
    }

    // Determine checkout URL
    // Priority 1: Direct Payment Link configured in env for the $29 Discord
    const rawDirectLink =
      process.env.STRIPE_DISCORD_PAYMENT_LINK ||
      process.env.STRIPE_DISCORD_CHECKOUT_URL ||
      process.env.NEXT_PUBLIC_STRIPE_DISCORD_CHECKOUT_URL;

    const directLink = rawDirectLink ? rawDirectLink.trim() : "";
    const GUIDE_LINK_ID = "dRmdR9eZZ9Qf1FkgpY6AM00";

    // Only use direct link if it is NOT the $19 guide link
    if (directLink && !directLink.includes(GUIDE_LINK_ID)) {
      const separator = directLink.includes("?") ? "&" : "?";
      const prefilledUrl = `${directLink}${separator}prefilled_email=${encodeURIComponent(newClaim.email)}`;
      return NextResponse.json({
        success: true,
        checkoutUrl: prefilledUrl
      });
    }

    // Priority 2: Attempt dynamic Stripe Checkout Session if key has checkout_session_write
    const stripe = getStripe();
    if (stripe) {
      try {
        const origin = request.headers.get("origin") || "https://ourlife.reset";
        const session = await stripe.checkout.sessions.create({
          mode: "subscription",
          customer_email: newClaim.email,
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: "OurLife.Reset — Creator Discord Membership",
                  description: "Weekly live reviews, viral quote vault, automated batch workflows, and private Discord community access."
                },
                unit_amount: 2900,
                recurring: {
                  interval: "month"
                }
              },
              quantity: 1
            }
          ],
          success_url: `${origin}/discord/welcome?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/discord`
        });

        if (session.url) {
          return NextResponse.json({
            success: true,
            checkoutUrl: session.url
          });
        }
      } catch (stripeErr: any) {
        console.warn("Dynamic Stripe checkout session creation failed:", stripeErr?.message);
      }
    }

    // If no $29 link is configured yet and dynamic creation cannot proceed:
    return NextResponse.json(
      {
        error:
          "The $29 Creator Discord checkout link is currently being connected in Stripe. Please DM @ourlife.reset on Instagram or check back shortly."
      },
      { status: 400 }
    );
  } catch (error) {
    console.error("Claim Discord error:", error);
    return NextResponse.json({ error: "Failed to process claim." }, { status: 500 });
  }
}
