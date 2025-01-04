// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth } from "./auth";

// export async function middleware(request: NextRequest) {
//   const session = await auth();

  // if (
  //   session &&
  //   (request.url.includes("/") || request.url.includes("/register"))
  // ) {
  //   return NextResponse.redirect(new URL("/dashboard", request.url));
  // }

  // if (!session && request.url.includes("/dashboard")) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard", "/", "/register"],
// };


export { auth as middleware } from "@/auth"