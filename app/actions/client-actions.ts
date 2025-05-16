"use server";

import { deleteBoard } from "./board/delete-board";
import { deleteColumn } from "./column/delete-column";
import { updateTaskOrder } from "./task/update-task-order";
import { assignUser } from "./user-task/assign-user";
import { deleteUserAssignment } from "./user-task/delete-user-assignment";
import { deleteAccount } from "./user/delete-account";

export const reorderTasks = updateTaskOrder;

export const assignUserToTask = assignUser;

export const removeColumn = deleteColumn;

export const removeBoard = deleteBoard;

export const unAssignUser = deleteUserAssignment;

export const removeAccount = deleteAccount;
