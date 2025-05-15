import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/auth/login", "/auth/register"];
const authRoutes = ["/boards", "/dashboard", "/app"];
const DEFAULT_LOGIN_REDIRECT = "/login";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.includes(pathname);
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuth && !isLoggedIn) {
    const loginUrl = new URL("/", req.url);
    //loginUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (
    (pathname === "/auth/login" || pathname === "/auth/register") &&
    isLoggedIn
  ) {
    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/boards/:path*", "/dashboard", "/app/:path*"],
};
