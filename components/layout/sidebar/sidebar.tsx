"use client";

import { useState, useEffect } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

interface Props {
  boards: any[];
}

export const Sidebar = ({ boards }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SidebarProvider>
      <div className="flex flex-col h-screen relative z-30">
        <div
          className={`flex mt-2 fixed  lg:mt-[100px] z-30 ${
            isScrolled
              ? " shadow-md bg-white rounded lg:bg-transparent lg:p-0 lg:shadow-transparent"
              : "bg-transparent"
          }`}
        >
          <div>
            <AppSidebar boards={boards} />
          </div>

          <main className="flex-1 overflow-auto p-4 lg:p-6">
            <SidebarTrigger />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};
