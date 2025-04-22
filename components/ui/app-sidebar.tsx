"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";

import { ChevronDown } from "lucide-react";
import useStore from "@/lib/store";

export function AppSidebar({ boards }: any) {
  const { openBoard, setOpenBoard } = useStore();

  console.log(openBoard);
  const handleBoard = (id: number) => {
    setOpenBoard(id);
  };
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Jira but better</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="/">
                    <Home />
                    <span>Home</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <Collapsible defaultOpen className="group/collapsible w-full">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="w-full justify-start">
                      <Inbox className="mr-2" />
                      <span>Projects</span>
                      <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                </SidebarMenuItem>

                <CollapsibleContent>
                  <SidebarMenu className="pl-6">
                    {boards.map((item: any) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton asChild>
                          <a
                            href="/dashboard"
                            onClick={() => handleBoard(item.id)}
                          >
                            {item.name}
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </CollapsibleContent>
              </Collapsible>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Calendar />
                    <span>Calendar</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Search />
                    <span>Search</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <a href="#">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
