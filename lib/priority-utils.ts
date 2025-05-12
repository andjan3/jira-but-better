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
