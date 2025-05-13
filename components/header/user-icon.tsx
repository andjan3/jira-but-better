"use client";

import { signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";
import { useSession } from "next-auth/react";

export function UserIcon() {
  const [hover, setHover] = useState(false);
  const { data: session } = useSession();
  return (
    <div
      className="relative flex items-center p-10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="bg-[#1868DB] p-3 rounded-full">
        <FaRegUser className="text-white cursor-pointer" fontSize={20} />
      </div>

      {hover && (
        <div className="absolute top-[85px] text-center -right-0 bg-white text-black p-2 rounded shadow-lg w-[100px]">
          {session ? (
            <button onClick={() => signOut()}>Log out</button>
          ) : (
            <button onClick={() => signIn()}>Log in</button>
          )}
        </div>
      )}
    </div>
  );
}
