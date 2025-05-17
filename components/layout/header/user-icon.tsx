"use client";

import { signIn, signOut } from "next-auth/react";
import { useRef, useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export function UserIcon() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const pathname = usePathname();
  const isLandingpage = pathname === "/";
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleBlur = () => {
    timeoutRef.current = setTimeout(() => setIsOpen(false), 100);
  };

  const handleFocus = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  return (
    <div
      ref={containerRef}
      className="relative flex items-center"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={handleFocus}
      onBlur={handleBlur}
      tabIndex={-1}
    >
      <button
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-controls="user-popup"
        className={`p-3 rounded-full focus:outline-none ${
          isLandingpage ? "bg-transparent" : "bg-[#1868DB]"
        }`}
      >
        <FaRegUser
          className={`cursor-pointer ${
            isLandingpage ? "text-[25px] text-white" : "text-[20px] text-white"
          }`}
          aria-label="user icon"
        />
      </button>

      {isOpen && (
        <ul
          id="user-popup"
          role="menu"
          className="absolute top-12 lg:top-[45px] text-center -right-6 bg-white text-black p-2 rounded shadow-lg w-[100px]"
        >
          {session ? (
            <li role="none">
              <button
                role="menuitem"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full text-sm"
              >
                Log out
              </button>
            </li>
          ) : (
            <li role="none">
              <button
                role="menuitem"
                onClick={() => signIn()}
                className="w-full text-sm"
              >
                Log in
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
