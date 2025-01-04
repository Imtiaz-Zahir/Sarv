import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (
    token &&
    (request.url.includes("/login") || request.url.includes("/register"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && request.url.includes("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/login", "/register"],
};


// export { auth as middleware } from "@/auth"