/**
 * Authentication utilities
 * -----------------------------------
 *
 * Exports the `authOptions` configuration for NextAuth.
 *
 * Provides an function `getUser` to extract the authenticated user's token from the incoming request.
 * - Uses `getToken` from `next-auth/jwt` to get the token.
 * - Returns the token payload containing user information or null if unauthenticated.
 
 */

import { authOptions } from "./auth";
import { getToken } from "next-auth/jwt";

export { authOptions };

export async function getUser(req: any) {
  return await getToken({ req });
}
