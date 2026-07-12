import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/auth";
import fs from "fs/promises";
import path from "path";

const uploadDir = path.join(process.cwd(), "public", "uploads");
const allowedTypes = ["image/png", "image/jpeg", "image/webp", "image/gif"];

export async function POST(req: NextRequest) {
  if (!isAdminAuthed()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Unsupported file type. Use PNG, JPG, WEBP, or GIF." },
      { status: 400 }
    );
  }
  if (file.size > 8 * 1024 * 1024) {
    return NextResponse.json(
      { error: "File too large (max 8MB)." },
      { status: 400 }
    );
  }

  await fs.mkdir(uploadDir, { recursive: true });

  const ext = file.name.split(".").pop();
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(uploadDir, filename), bytes);

  return NextResponse.json({ url: `/uploads/${filename}` });
}
