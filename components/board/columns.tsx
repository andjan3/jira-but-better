"use client";

import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { ColumnForm } from "../form/columns-form";
import { ColumnCard } from "./column-card";
import { useBoard } from "@/app/context/board-context";
import { RemovePopOver } from "../remove-popover/remove-popover";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { clientUpdateTaskOrder } from "@/app/actions/task/client-update.task-order";
import { toast } from "sonner";

export const Columns = () => {
  const { boardData, tasks } = useBoard();
  const [addColumn, setAddColumn] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState<number | null>(null);
  const [localTasks, setLocalTasks] = useState(tasks);

  const toggleAddColumn = () => setAddColumn((prev) => !prev);

  const toggleForm = (id: number | null) => {
    setShowTaskForm((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const handleDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    )
      return;

    const taskId = parseInt(draggableId);
    const targetColumnId = parseInt(destination.droppableId);
    const targetIndex = destination.index;

    setLocalTasks((prevTasks) => {
      const filteredTasks = prevTasks.filter((t) => t.id !== taskId);
      const taskToMove = prevTasks.find((t) => t.id === taskId);
      if (!taskToMove) return prevTasks;

      const updatedTask = { ...taskToMove, columnId: targetColumnId };
      const targetColumnTasks = filteredTasks.filter(
        (t) => t.columnId === targetColumnId
      );

      if (destination.index >= targetColumnTasks.length) {
        return [...filteredTasks, updatedTask];
      } else {
        const before = targetColumnTasks.slice(0, destination.index);
        const after = targetColumnTasks.slice(destination.index);
        return [
          ...filteredTasks.filter((t) => t.columnId !== targetColumnId),
          ...before,
          updatedTask,
          ...after,
        ];
      }
    });

    try {
      if (!boardData.id) return;

      const res = await clientUpdateTaskOrder({
        taskId,
        newColumnId: targetColumnId,
        newIndex: targetIndex,
        boardId: boardData.id,
      });

      if (!res.success) {
        toast.message("Something went wrong!", {
          description: "Please try again later",
        });
        setLocalTasks(tasks);
      }
    } catch (err) {
      console.error("Serverfel:", err);
      setLocalTasks(tasks);
    }
  };

  const columns = boardData?.columns || [];

  return (
    <div className="pt-8 pl-8">
      <div className="flex gap-5 items-center mb-8">
        <h1 className="text-[30px] capitalize font-normal">
          {boardData?.name && boardData.name}
        </h1>

        <RemovePopOver boardId={boardData.id} isColumn={false} />
      </div>

      <div className="flex items-start gap-10">
        <DragDropContext onDragEnd={handleDragEnd}>
          <div className="flex items-start gap-10">
            {columns.map((col) => (
              <Droppable key={col.id} droppableId={col.id.toString()}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="w-96"
                  >
                    <ColumnCard
                      column={col}
                      tasks={localTasks}
                      showForm={showTaskForm}
                      onToggleForm={toggleForm}
                    />
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </DragDropContext>

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
      </div>
    </div>
  );
};
