import { ColumnForm } from "./form/columns-form";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useBoard } from "@/app/context/board-context";

interface AddColumnProps {
  addColumn: boolean;
  toggleAddColumn: () => void;
}

export const AddColumn = ({ addColumn, toggleAddColumn }: AddColumnProps) => {
  const { boardData } = useBoard();

  return (
    <>
      {addColumn ? (
        <div
          className="w-[100%] lg:w-[80%] grid grid-cols-1 gap-4 z-20 p-4  rounded-xl border border-slate-200  text-slate-950 shadow bg-slate-50
 "
          onClick={(e) => e.stopPropagation()}
        >
          <ColumnForm boardId={boardData.id} onCancel={toggleAddColumn} />
        </div>
      ) : (
        <div
          className="flex items-center h-[70px] gap-4  p-4  cursor-pointer hover:bg-slate-200 w-[320px] lg:w-80 lg:min-w-[300px] justify-center rounded-xl border border-slate-200  text-slate-950 shadow bg-slate-50"
          onClick={toggleAddColumn}
        >
          <GoPlus fontSize={25} aria-label="Add a column to board" />
          <div className="text-[20px] ">Create column</div>
        </div>
      )}
    </>
  );
};
