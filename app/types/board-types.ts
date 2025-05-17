export interface Columns {
  id: number;
  title?: string;
  order?: number;
  boardId?: number;
}

export interface BoardData {
  id: number;
  name?: string;
  status?: string;
  createdAt?: Date;
  columns?: Columns[];
}

export type Priority = "lowPriority" | "mediumPriority" | "highPriority";

export interface Tasks {
  id: number;
  title: string;
  description?: string;
  isDone?: boolean;
  priority?: Priority | null;
  boardId: number;
  columnId: number;
  order: number;
}

export interface User {
  id: number;
  email: string;
  password: string;
  username: string;
}
export interface AssignedUser {
  userId: number;
  taskId: number;
  assignedAt: Date;
  user: User;
}

export interface Board {
  id: number;
  name: string;
  status: string;
  createdAt: Date;
}

export interface Boards {
  boards: Board[];
}

export interface AssignedTask {
  userId: number;
  taskId: number;
  assignedAt: string | Date;
  user: {
    id: number;
    email: string;
    username: string;
    password: string;
  };
  task: {
    id: number;
    title: string;
    description: string;
    isDone: boolean;
    priority: "lowPriority" | "mediumPriority" | "highPriority" | null;
    order: number;
    boardId: number;
    columnId: number;
  };
}
