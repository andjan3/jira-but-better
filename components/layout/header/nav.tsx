/* import { UserIcon } from "./user-icon";

export const Nav = async () => {
  return (
    <nav className="fixed top-0 left-0 right-0 h-[100px] bg-slate-50 flex items-center px-10 justify-between  shadow-md w-full z-30">
      <a href="/" className="font-semibold">
        Jira but better
      </a>

      <UserIcon />
    </nav>
  );
};
 */

"use client";

import { usePathname } from "next/navigation";
import { UserIcon } from "./user-icon";

export function Nav() {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 h-[100px] flex items-center px-4 lg:px-10 justify-between w-full z-30 ${
        isHome
          ? "bg-transparent text-white"
          : "bg-slate-50 shadow-md text-black"
      }`}
    >
      <a href="/" className={`font-semibold ${isHome ? "text-white" : ""}`}>
        Jira but better
      </a>

      <UserIcon />
    </nav>
  );
}
