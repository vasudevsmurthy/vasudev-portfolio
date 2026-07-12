import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(80),
  role: z.string().max(120).optional(),
  quote: z.string().min(10).max(600),
  rating: z.number().int().min(1).max(5).optional(),
});

export async function GET() {
  const testimonials = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    take: 12,
  });
  return NextResponse.json(testimonials);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const data = schema.parse(body);

    const created = await prisma.testimonial.create({
      data: { ...data, approved: false },
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: "Invalid input" }, { status: 400 });
    }
    console.error("Testimonial submit error:", err);
    const detail = err instanceof Error ? err.message : String(err);
    return NextResponse.json(
      {
        success: false,
        error:
          process.env.NODE_ENV === "production"
            ? "Server error"
            : `Server error: ${detail}`,
      },
      { status: 500 }
    );
  }
}
