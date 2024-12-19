import { NextRequest, NextResponse } from "next/server";
import { verifyCookie } from "./lib/actions/auth";
import { AuthError } from "./lib/utils";

const privateRoutes = ["/settings"];

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const response = NextResponse.next();

  try {
    await verifyCookie(req.cookies, response.cookies);
  } catch (error) {
    // handle private routes logic

    if (privateRoutes.includes(url.pathname)) {
      url.pathname = "/login";
      return NextResponse.redirect(url);
    }

    // if the token is expired, set a search param to indicate that the session has ended
    if (
      !url.searchParams.get("session_ended") &&
      error instanceof AuthError &&
      error.message === "TOKEN_EXPIRED"
    ) {
      url.searchParams.set("session_ended", "true");
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|images/*|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
