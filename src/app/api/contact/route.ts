import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(2000),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const saved = await prisma.contactMessage.create({ data });

    return NextResponse.json({ success: true, id: saved.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: "Invalid input" },
        { status: 400 }
      );
    }
    console.error("Contact form error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Server error"
            : `Server error: ${detail} — check DATABASE_URL is set and you've run 'npx prisma migrate dev'`,
      },
      { status: 500 }
    );
  }
}
