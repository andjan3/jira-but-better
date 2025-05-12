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
          className="relative flex items-center gap-4 bg-[#F7F8F9] z-20 p-4"
          onClick={(e) => e.stopPropagation()}
        >
          <ColumnForm boardId={boardData.id} />
          <IoIosCloseCircleOutline
            fontSize={30}
            className="cursor-pointer"
            onClick={toggleAddColumn}
            aria-label="Close form for adding column to board"
          />
        </div>
      ) : (
        <div
          className="flex items-center h-[70px] gap-4 bg-[#F7F8F9] p-4 pl-20 pr-20 cursor-pointer hover:bg-slate-200 min-w-[300px]"
          onClick={toggleAddColumn}
        >
          <GoPlus fontSize={25} aria-label="Add a column to board" />
          <div className="text-[20px]">Create column</div>
        </div>
      )}
    </>
  );
};
