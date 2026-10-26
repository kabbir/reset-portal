import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "applications.json");

function getInitialApplications() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(data);
    }
  } catch (err) {
    console.error("Error reading applications.json:", err);
  }
  return [];
}

let inMemoryApplications = getInitialApplications();

export async function GET() {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const data = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      inMemoryApplications = JSON.parse(data);
    }
  } catch (e) {
    // fallback to inMemoryApplications
  }
  return NextResponse.json(inMemoryApplications);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, handle, reason, track } = body;

    if (!name || typeof name !== "string" || !email || typeof email !== "string" || !reason || typeof reason !== "string") {
      return NextResponse.json(
        { error: "Name, email, and reason are required." },
        { status: 400 }
      );
    }

    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });

    const newApplication = {
      id: `app-${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      handle: handle ? handle.trim() : "",
      track: (track && typeof track === "string") ? track.trim() : "creator_community",
      date: formattedDate,
      reason: reason.trim(),
      status: "pending"
    };

    inMemoryApplications = [newApplication, ...inMemoryApplications];

    try {
      const dir = path.dirname(DATA_FILE_PATH);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(inMemoryApplications, null, 2), "utf-8");
    } catch (writeError) {
      console.warn("Could not write application to disk (likely serverless environment):", writeError);
    }

    return NextResponse.json(
      { success: true, application: newApplication },
      { status: 201 }
    );
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
