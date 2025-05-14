/* import { useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { reorderTasks } from "@/app/actions/client-actions";
import { useBoard } from "@/app/context/board-context";

export const useDragAndDrop = () => {
  const { boardData, tasks } = useBoard();
  const [localTasks, setLocalTasks] = useState(tasks);
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

      const res = await reorderTasks({
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

  return { localTasks, handleDragEnd, setLocalTasks };
};
 */

import { useEffect, useState } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { toast } from "sonner";
import { reorderTasks } from "@/app/actions/client-actions";
import { useBoard } from "@/app/context/board-context";

export const useDragAndDrop = () => {
  const { boardData, tasks } = useBoard();
  const [localTasks, setLocalTasks] = useState(tasks);
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
      const newTasks = [...prevTasks];
      const taskToMove = newTasks.find((t) => t.id === taskId);

      if (!taskToMove) return prevTasks;

      const filteredTasks = newTasks.filter((t) => t.id !== taskId);

      const targetColumnTasks = filteredTasks
        .filter((t) => t.columnId === targetColumnId)
        .sort((a, b) => (a.order || 0) - (b.order || 0));

      targetColumnTasks.splice(targetIndex, 0, {
        ...taskToMove,
        columnId: targetColumnId,
        order: targetIndex,
      });

      const updatedTasks = targetColumnTasks.map((task, index) => ({
        ...task,
        order: index,
      }));

      return [
        ...filteredTasks.filter((t) => t.columnId !== targetColumnId),
        ...updatedTasks,
      ];
    });

    try {
      if (!boardData.id) return;

      const res = await reorderTasks({
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

  return { localTasks, handleDragEnd, setLocalTasks };
};
