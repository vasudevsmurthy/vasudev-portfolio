import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const reaction = await prisma.reaction.upsert({
    where: { id: "claps" },
    update: {},
    create: { id: "claps", count: 0 },
  });
  return NextResponse.json({ count: reaction.count });
}

export async function POST(req: NextRequest) {
  try {
    const { amount } = await req.json();
    const inc = Math.min(Math.max(parseInt(amount) || 1, 1), 10);

    const reaction = await prisma.reaction.upsert({
      where: { id: "claps" },
      update: { count: { increment: inc } },
      create: { id: "claps", count: inc },
    });

    return NextResponse.json({ count: reaction.count });
  } catch (err) {
    console.error("Clap error:", err);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
