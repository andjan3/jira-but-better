/**
 * UserIcon component.
 * -----------------------------------
 *
 * A user icon that toggles login/logout actions on hover.
 * - Uses `useSession` to check authentication state.
 * - Displays a login or logout button depending on the user's session.
 * - On hover, shows a small popup with log out functionality.
 */

"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function UserIcon() {
  const [hover, setHover] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLandingpage = pathname === "/";

  return (
    <div
      className="relative flex items-center "
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div
        className={`p-3 rounded-full ${
          isLandingpage ? "bg-transparent" : "bg-[#1868DB]"
        }`}
      >
        <FaRegUser
          className={`text-white cursor-pointer ${
            isLandingpage ? "text-[25px]" : "text-[20px]"
          }`}
        />
      </div>

      {hover && (
        <div className="absolute top-12 lg:top-[45px] text-center -right-6  bg-white text-black p-2 rounded shadow-lg w-[100px]">
          {session ? (
            <button onClick={() => signOut({ callbackUrl: "/" })}>
              Log out
            </button>
          ) : (
            <button onClick={() => signIn()}>Log in</button>
          )}
        </div>
      )}
    </div>
  );
}
