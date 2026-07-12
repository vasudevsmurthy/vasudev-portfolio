import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const contentPath = path.join(process.cwd(), "src/data/content.json");

export async function GET() {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const raw = await fs.readFile(contentPath, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(req: NextRequest) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await req.json();
  await fs.writeFile(contentPath, JSON.stringify(body, null, 2));
  return NextResponse.json({ success: true });
}
