/**
 * BoardHeader component.
 * ----------------------
 * Displays the header section for a board, including:
 * - An editable board title using the EditableTitle component.
 * - A remove button using the RemovePopOver component to delete the board.
 *
 * EditableTitle handles inline editing of the board name and triggers
 * an update action on save.
 *
 * RemovePopOver provides a popover UI for board deletion confirmation.
 */

import { useBoard } from "@/app/context/board-context";
import { RemovePopOver } from "../popover/remove-popover";
import { EditableTitle } from "./editable-title";
import { updateBoardName } from "@/app/actions/board/update-board-name";

export const BoardHeader = () => {
  const { boardData } = useBoard();

  if (!boardData) return null;

  return (
    <div className="flex gap-3 items-center mb-8 mt-10">
      <EditableTitle
        title={boardData?.name || ""}
        id={boardData.id}
        boardId={boardData.id}
        onSave={async (newTitle) => {
          await updateBoardName(boardData.id, newTitle);
        }}
        variant="board"
      />
      <RemovePopOver boardId={boardData.id} isColumn={false} />
    </div>
  );
};
