import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "reviews.json");

function getInitialReviews() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading reviews.json:", err);
  }
  return [];
}

let inMemoryReviews = getInitialReviews();

export async function GET() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      inMemoryReviews = JSON.parse(data);
    }
  } catch (e) {
    // fallback to inMemoryReviews
  }
  return NextResponse.json(inMemoryReviews);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, role, rating, comment } = body;

    if (!name || typeof name !== "string" || !comment || typeof comment !== "string") {
      return NextResponse.json({ error: "Name and comment are required." }, { status: 400 });
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const newReview = {
      id: `rev-${Date.now()}`,
      name: name.trim(),
      role: (role && typeof role === "string") ? role.trim() : "",
      date: formattedDate,
      rating: typeof rating === "number" ? Math.min(Math.max(rating, 1), 5) : 5,
      highlight: comment.slice(0, 48) + (comment.length > 48 ? "..." : ""),
      comment: comment.trim()
    };

    inMemoryReviews.unshift(newReview);

    try {
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(inMemoryReviews, null, 2), "utf-8");
    } catch (writeErr) {
      console.warn("Could not write to local file system (read-only environment):", writeErr);
    }

    return NextResponse.json({ success: true, review: newReview }, { status: 201 });
  } catch (error: any) {
    console.error("Failed to post review:", error);
    return NextResponse.json({ error: "Failed to submit review." }, { status: 500 });
  }
}
