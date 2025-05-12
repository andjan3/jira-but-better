import { useBoard } from "@/app/context/board-context";
import { RemovePopOver } from "./remove-popover/remove-popover";

export const BoardHeader = () => {
  const { boardData } = useBoard();
  return (
    <div className="flex gap-5 items-center mb-8">
      <h1 className="text-[30px] capitalize font-normal">
        {boardData?.name && boardData.name}
      </h1>

      <RemovePopOver boardId={boardData.id} isColumn={false} />
    </div>
  );
};
