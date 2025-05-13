import { Button } from "@/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { removeBoard, removeColumn } from "@/app/actions/client-actions";
import { Alert } from "../alert-dialog/alert";
import { useState } from "react";

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
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleRemove = async () => {
    if (isColumn && columnId != null && boardId != null) {
      await removeColumn(columnId, boardId);
      setIsAlertOpen(false);
    } else if (boardId != null) {
      const result = await removeBoard(boardId);
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
            <Alert
              isOpen={isAlertOpen}
              onClose={() => setIsAlertOpen(false)}
              onConfirm={handleRemove}
              item={isColumn ? "column" : "board"}
            />
            <div
              className="font-medium leading-none text-center cursor-pointer"
              onClick={() => setIsAlertOpen(true)}
            >
              {isColumn ? "Delete column" : "Delete board"}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
