import { NextResponse } from "next/server";
import { verifyJWT } from "./lib/auth";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const isProtected = pathname.startsWith("/dashboard") || pathname.startsWith("/settings");
  const token = request.cookies.get("auth_token")?.value;
  const user = token ? await verifyJWT(token) : null;
  
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };