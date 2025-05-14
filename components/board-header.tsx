import { useBoard } from "@/app/context/board-context";
import { RemovePopOver } from "./remove-popover/remove-popover";
import { EditableTitle } from "./board/editable-column-title";
import { updateBoardName } from "@/app/actions/board/update-board-name";

export const BoardHeader = () => {
  const { boardData } = useBoard();

  return (
    <div className="flex gap-3 items-center mb-8 mt-10">
      <EditableTitle
        title={boardData?.name || ""}
        id={boardData.id}
        boardId={boardData.id}
        onSave={async (newTitle) => {
          await updateBoardName(boardData.id, newTitle);
        }}
        boardTitle={true}
      />
      <RemovePopOver boardId={boardData.id} isColumn={false} />
    </div>
  );
};
