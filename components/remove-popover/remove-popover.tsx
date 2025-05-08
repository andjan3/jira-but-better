/* import { Button } from "@/components/ui/button";

import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { deleteBoardClient } from "@/app/actions/board/delete-board.client";

interface RemovePopOverProps {
  boardId?: number;
}
export function RemovePopOver({ boardId }: RemovePopOverProps) {
  const handleRemoveBoard = async () => {
    if (boardId == null) {
      return;
    }
    const result = await deleteBoardClient(boardId);
    if (result.success) {
      window.location.href = "/";
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <HiOutlineDotsHorizontal
            fontSize={30}
            className="cursor-pointer mt-1"
            aria-label="Open board settings"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div
              className="font-medium leading-none text-center cursor-pointer"
              onClick={() => {
                handleRemoveBoard();
              }}
            >
              Delete board
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
 */

import { Button } from "@/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { deleteBoardClient } from "@/app/actions/board/delete-board.client";
import { deleteColumnClient } from "@/app/actions/column/delete-column-client";

interface RemovePopOverProps {
  boardId?: number;
  columnId?: number;
  isColumn?: boolean;
}

export function RemovePopOver({
  boardId,
  columnId,
  isColumn = false,
}: RemovePopOverProps) {
  const handleRemove = async () => {
    if (isColumn && columnId != null && boardId != null) {
      await deleteColumnClient(columnId, boardId);
    } else if (boardId != null) {
      const result = await deleteBoardClient(boardId);
      if (result.success) {
        window.location.href = "/";
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <HiOutlineDotsHorizontal
            fontSize={30}
            className="cursor-pointer mt-1"
            aria-label="Open settings"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4">
          <div className="space-y-2">
            <div
              className="font-medium leading-none text-center cursor-pointer"
              onClick={handleRemove}
            >
              {isColumn ? "Delete column" : "Delete board"}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
