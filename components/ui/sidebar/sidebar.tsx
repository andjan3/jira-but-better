import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getBoards } from "@/app/lib/get-boards";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

export const SideBar = async () => {
  const session = await getServerSession(authOptions);
  const boards = await getBoards();
  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen relative z-30">
        {session && (
          <div className="flex mt-[100px]">
            <div>
              <AppSidebar boards={boards} />
            </div>

            <main className="flex-1 overflow-auto p-6">
              <SidebarTrigger />
            </main>
          </div>
        )}
      </div>
    </SidebarProvider>
  );
};
