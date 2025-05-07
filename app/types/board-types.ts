export interface Columns {
  id: number;
  title?: string;
  order?: number;
  boardId?: number;
}

export interface BoardData {
  id?: number;
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
}

export interface Users {
  id: number;
  email: string;
  password: string;
  username: string;
}
export interface AssignedUsers {
  userId: number;
  taskId: number;
  assignedAt: Date;
  user: Users;
}
