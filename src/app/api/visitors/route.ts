import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { path } = await req.json();
    await prisma.visitorLog.create({ data: { path: path || "/" } });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Visitor log error:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function GET() {
  try {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const count = await prisma.visitorLog.count({
      where: { createdAt: { gte: startOfDay } },
    });

    return NextResponse.json({ count });
  } catch (err) {
    console.error("Visitor count error:", err);
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
