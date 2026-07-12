import { NextRequest, NextResponse } from "next/server";
import { createSessionCookie, COOKIE_NAME } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const res = NextResponse.json({ success: true });
    res.cookies.set(COOKIE_NAME, createSessionCookie(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });
    return res;
  }

  return NextResponse.json(
    { success: false, error: "Invalid credentials" },
    { status: 401 }
  );
}
