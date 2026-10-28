import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "discord_claimed_invites.json");

interface ClaimRecord {
  sessionId: string;
  customerEmail: string | null;
  customerName: string | null;
  inviteCode: string;
  inviteUrl: string;
  claimedAt: string;
  amountTotal: number | null;
}

function getClaimedInvites(): ClaimRecord[] {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading discord_claimed_invites.json:", err);
  }
  return [];
}

function saveClaimedInvites(records: ClaimRecord[]) {
  try {
    const dir = path.dirname(DATA_FILE_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(records, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing discord_claimed_invites.json:", err);
  }
}

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
    const { sessionId } = body;

    if (!sessionId || typeof sessionId !== "string") {
      return NextResponse.json(
        { valid: false, error: "A valid Stripe checkout session ID is required." },
        { status: 400 }
      );
    }

    const cleanSessionId = sessionId.trim();

    // 1. Verify payment with Stripe
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json(
        { valid: false, error: "Payment verification service is unavailable." },
        { status: 500 }
      );
    }

    let session: Stripe.Checkout.Session;
    try {
      session = await stripe.checkout.sessions.retrieve(cleanSessionId);
    } catch (stripeErr: any) {
      console.error("Stripe session retrieval failed:", stripeErr?.message);
      return NextResponse.json(
        { valid: false, error: "Could not verify your checkout session with Stripe." },
        { status: 403 }
      );
    }

    const isPaid = session.payment_status === "paid" || session.status === "complete";
    if (!isPaid) {
      return NextResponse.json(
        { valid: false, error: "Payment has not been completed for this session." },
        { status: 403 }
      );
    }

    const customerEmail = session.customer_details?.email || null;
    const customerName = session.customer_details?.name || null;
    const amountTotal = session.amount_total;

    // 2. Check if this session already generated an invite (prevents infinite link generation)
    const existingClaims = getClaimedInvites();
    const existing = existingClaims.find((c) => c.sessionId === cleanSessionId);

    if (existing) {
      return NextResponse.json({
        valid: true,
        alreadyClaimed: true,
        inviteUrl: existing.inviteUrl,
        customerEmail: existing.customerEmail,
        customerName: existing.customerName,
        claimedAt: existing.claimedAt,
        isSingleUse: true,
      });
    }

    // 3. Generate Single-Use Invite via Discord Bot API (max_uses: 1, unique: true)
    const botToken = process.env.DISCORD_BOT_TOKEN?.trim();
    const channelId = process.env.DISCORD_CHANNEL_ID?.trim();
    const fallbackUrl = process.env.DISCORD_FALLBACK_INVITE_URL?.trim();

    let finalInviteUrl = "";
    let inviteCode = "";
    let isSingleUse = false;

    if (botToken && channelId) {
      try {
        const discordRes = await fetch(
          `https://discord.com/api/v10/channels/${channelId}/invites`,
          {
            method: "POST",
            headers: {
              Authorization: `Bot ${botToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              max_uses: 1, // Crucial: Exactly 1 person can use this link!
              max_age: 86400, // Valid for 24 hours before expiration
              unique: true, // Forces Discord to generate a new unique code
              temporary: false,
            }),
          }
        );

        if (discordRes.ok) {
          const discordData = await discordRes.json();
          inviteCode = discordData.code;
          finalInviteUrl = `https://discord.gg/${inviteCode}`;
          isSingleUse = true;
        } else {
          const errText = await discordRes.text();
          console.warn("Discord API invite creation returned error:", errText);
        }
      } catch (discordErr: any) {
        console.error("Failed to call Discord API:", discordErr?.message);
      }
    }

    // Fallback if bot is not configured yet
    if (!finalInviteUrl && fallbackUrl) {
      finalInviteUrl = fallbackUrl;
      inviteCode = "custom";
      isSingleUse = false;
    }

    // If neither bot nor fallback is configured yet:
    if (!finalInviteUrl) {
      return NextResponse.json({
        valid: true,
        pendingBotConfig: true,
        customerEmail,
        customerName,
        amountTotal,
        message:
          "Payment of $29 confirmed! Discord bot integration is currently finalizing. Please DM @ourlife.reset on Instagram to receive your personal invite link instantly.",
      });
    }

    // 4. Save record to prevent replay attacks
    const newRecord: ClaimRecord = {
      sessionId: cleanSessionId,
      customerEmail,
      customerName,
      inviteCode,
      inviteUrl: finalInviteUrl,
      claimedAt: new Date().toISOString(),
      amountTotal,
    };

    saveClaimedInvites([...existingClaims, newRecord]);

    return NextResponse.json({
      valid: true,
      inviteUrl: finalInviteUrl,
      customerEmail,
      customerName,
      isSingleUse,
    });
  } catch (error: any) {
    console.error("Discord invite endpoint error:", error);
    return NextResponse.json(
      { valid: false, error: "An unexpected error occurred while generating your invite." },
      { status: 500 }
    );
  }
}
