/**
 * RemovePopOver component.
 * -----------------------------------
 *
 * Provides a popover menu triggered by a button.
 * - Allows the user to initiate deletion of either a board or a column.
 * - Shows a confirmation dialog before executing the delete action.
 *
 * Functionality::
 * - On delete confirmation, calls the appropriate action (`removeColumn` or `removeBoard`).
 * - If a board is deleted successfully, redirects the user to the dashboard.
 * - Manages dialog open/close state locally.s
 */

import { Button } from "@/components/ui/button";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { removeBoard, removeColumn } from "@/app/actions/client-actions";
import { useState } from "react";
import { DeleteConfirmationDialog } from "../dialogs/delete-confirmation-dialog";

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
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="!-mt-[0.1rem]">
          <HiOutlineDotsHorizontal
            fontSize={25}
            className="cursor-pointer mt-1"
            aria-label="Open settings"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-40">
        <div className="grid gap-4">
          <div className="space-y-2">
            <DeleteConfirmationDialog
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
