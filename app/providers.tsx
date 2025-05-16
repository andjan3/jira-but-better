/**
 * Providers component.
 * -----------------
 * Wraps the application with necessary provider.
 * Provides NextAuth's SessionProvider to enable authentication state management and session handling on the client side.
 */

"use client";

import { SessionProvider } from "next-auth/react";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};
