"use client";

import Link from "next/link";
import { CreateBoard } from "../board/create-board";
import { Boards } from "@/app/types/board-types";

export const LatestProjects = ({ boards }: Boards) => {
  const sortedBoards = boards.sort((a: any, b: any) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB.getTime() - dateA.getTime();
  });

  return (
    <div>
      <h2 className="mb-3">Latest projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center gap-5">
        {sortedBoards.slice(0, 3).map((board: any, index: number) => (
          <Link
            href={`/board/${board.id}`}
            key={index}
            className="shadow-lg w-full h-[250px] rounded-lg grid grid-rows-[70%,30%] hover:opacity-80 mb-5 lg:mb-0"
          >
            <div className="bg-gradient-to-r from-emerald-500 to-emerald-900 rounded-t-lg"></div>
            <div className="pt-5 pb-5 pl-2 text-base capitalize">
              {board.name}
            </div>
          </Link>
        ))}

        <div className="shadow-lg w-full h-[250px] rounded-lg flex justify-center items-center bg-[#F7F8F9]">
          <CreateBoard />
        </div>
      </div>
    </div>
  );
};
