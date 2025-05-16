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
