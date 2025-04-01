"use client";

import { LoginButton, LogoutButton } from "@/app/auth";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";

export function UserIcon({ props }: any) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex items-center p-10"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FaRegUser className="text-white cursor-pointer" fontSize={25} />

      {hover && (
        <div className="absolute top-20 text-center -right-0 bg-white text-black p-2 rounded shadow-lg w-[100px]">
          {props ? <LogoutButton /> : <LoginButton />}
        </div>
      )}
    </div>
  );
}
