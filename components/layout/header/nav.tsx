"use client";

import { usePathname } from "next/navigation";
import { UserIcon } from "./user-icon";

export const Nav = () => {
  const pathname = usePathname();

  const isLandingpage = pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[100px] flex items-center px-4 lg:px-10 justify-between w-full z-30 ${
        isLandingpage
          ? "bg-transparent text-white"
          : "bg-slate-50 shadow-md text-black"
      }`}
    >
      <a
        href="/"
        className={`font-semibold ${isLandingpage ? "text-white" : ""}`}
      >
        Jira but better
      </a>

      <UserIcon />
    </nav>
  );
};
