/**
 * Middleware for route protection and authentication handling.
 * ------------------------------------------------------------
 *
  Public Routes:
 * - /auth/login, /auth/register
 * - Redirect authenticated users to dashboard
 * 
 * Protected Routes:
 * - /board, /dashboard, /app, /profile/settings
 * - Redirect unauthenticated users to landingpage (/)
 * 
 * - Uses `getToken` from next-auth/jwt to verify if a user is authenticated.
 *
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/auth/login", "/auth/register"];
const authRoutes = ["/board", "/dashboard", "/app", "/profile/settings"];
const DEFAULT_LOGGED_IN_REDIRECT = "/dashboard";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const { pathname } = req.nextUrl;

  const isPublic = publicRoutes.includes(pathname);
  const isAuth = authRoutes.some((route) => pathname.startsWith(route));

  if (isAuth && !isLoggedIn) {
    const landingPageUrl = new URL("/", req.url);
    return NextResponse.redirect(landingPageUrl);
  }

  if (isPublic && isLoggedIn) {
    return NextResponse.redirect(new URL(DEFAULT_LOGGED_IN_REDIRECT, req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/board/:path*", "/dashboard", "/app/:path*", "/profile/settings"],
};
