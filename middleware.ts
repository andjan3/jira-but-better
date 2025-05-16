/**
 * Middleware for route protection and authentication handling.
 * ------------------------------------------------------------
 *
 * - Protects authenticated routes by checking for a valid NextAuth JWT token.
 * - Redirects unauthenticated users trying to access protected routes (like /board, /dashboard, /app) to the landing page (/).
 * - Redirecting logged-in users to the dashboard (/dashboard).
 * - Uses `getToken` from next-auth/jwt to verify if a user is authenticated.
 
 * This middleware ensures secure access control and smooth user navigation flow
 * based on authentication state.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const publicRoutes = ["/auth/login", "/auth/register"];
const authRoutes = ["/board", "/dashboard", "/app"];
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
  matcher: ["/board/:path*", "/dashboard", "/app/:path*"],
};
