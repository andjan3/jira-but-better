"use client";

import { LoginButton } from "@/app/auth";
import { useState } from "react";
import { FaRegUser } from "react-icons/fa6";

export function UserIcon() {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <FaRegUser className="text-white cursor-pointer" fontSize={25} />

      {hover && (
        <div className="absolute top-8 -right-10 bg-white text-black p-2 rounded shadow-lg w-[100px]">
          <LoginButton />
        </div>
      )}
    </div>
  );
}
