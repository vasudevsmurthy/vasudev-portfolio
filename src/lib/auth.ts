import { cookies } from "next/headers";
import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function sign(value: string) {
  const secret = process.env.SESSION_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update(value).digest("hex");
}

export function createSessionCookie() {
  const value = "admin";
  const signature = sign(value);
  return `${value}.${signature}`;
}

export function verifySessionCookie(cookieValue: string | undefined) {
  if (!cookieValue) return false;
  const [value, signature] = cookieValue.split(".");
  if (!value || !signature) return false;
  return sign(value) === signature;
}

export function isAdminAuthed() {
  const cookieStore = cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionCookie(session);
}

export { COOKIE_NAME };
