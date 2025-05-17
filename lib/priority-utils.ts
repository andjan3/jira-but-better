/**
 * getPriorityClass function
 * -----------------------------------
 * Returns a background color CSS class string based on the task's priority.
 * - Maps "lowPriority" to a green background.
 * - Maps "mediumPriority" to an orange background.
 * - Maps "highPriority" to a red background.
 * - Returns transparent background if no priority is set.
 */

import { Priority } from "@/app/types/board-types";
export interface Task {
  id?: number;
  title?: string;
  description?: string;
  isDone?: boolean;
  priority?: Priority | null;
  boardId?: number | null;
  columnId?: number | null;
  order?: number;
}

export const getPriorityClass = (task: Task) => {
  switch (task.priority) {
    case "lowPriority":
      return "bg-[#7EE2B8]";
    case "highPriority":
      return "bg-[#F87168]";
    case "mediumPriority":
      return "bg-[#FEA362]";
    default:
      return "bg-transparent";
  }
};
