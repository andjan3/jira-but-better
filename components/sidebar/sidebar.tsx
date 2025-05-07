import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { getAllBoards } from "@/app/actions/board/get-all-boards";

export const SideBar = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const boards = await getAllBoards();

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen relative z-30">
        <div className="flex mt-[100px]">
          <div>
            <AppSidebar boards={boards} />
          </div>

          <main className="flex-1 overflow-auto p-6">
            <SidebarTrigger />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
