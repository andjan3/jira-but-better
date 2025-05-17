/**
 * ProtectedLayout
 * -------------------

 * Ensures that only authenticated users can access its child pages by:
 * - Checking the server session for a logged-in user
 * - Redirecting unauthenticated users to the login page
 * - Rendering the sidebar and protected content for authorized users
 *
  * Routes are also protected and redirected by the middleware,  which uses     * NextAuth.js for authentication.
 */

import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { redirect } from "next/navigation";
import { ServerSidebar } from "@/components/layout/sidebar/server-sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="grid grid-cols-[0%_1fr] md:grid-cols-[200px_1fr] lg:grid-cols-[300px_1fr] mt-24 lg:mt-0">
      <ServerSidebar />
      {children}
    </div>
  );
}
