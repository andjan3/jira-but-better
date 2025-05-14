import { AddColumnForm } from "../form/add-column-form";
import { GoPlus } from "react-icons/go";
import { useBoard } from "@/app/context/board-context";

interface AddColumnButtonProps {
  addColumn: boolean;
  toggleAddColumn: () => void;
}

export const AddColumnButton = ({
  addColumn,
  toggleAddColumn,
}: AddColumnButtonProps) => {
  const { boardData } = useBoard();

  return (
    <>
      {addColumn ? (
        <div
          className="w-[100%] lg:w-[80%] grid grid-cols-1 gap-4 z-20 p-4  rounded-xl border border-slate-200  text-slate-950 shadow bg-slate-50
 "
          onClick={(e) => e.stopPropagation()}
        >
          <AddColumnForm boardId={boardData.id} onCancel={toggleAddColumn} />
        </div>
      ) : (
        <button
          className="flex items-center h-[70px] gap-4 text-[20px] p-4  cursor-pointer hover:bg-slate-200 w-[320px] lg:w-80 lg:min-w-[300px] justify-center rounded-xl border border-slate-200  text-slate-950 shadow bg-slate-50"
          onClick={toggleAddColumn}
        >
          <GoPlus fontSize={25} aria-label="Add a column to board" />
          Create column
        </button>
      )}
    </>
  );
};
