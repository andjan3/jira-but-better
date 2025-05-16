/**
 * TaskSummary component.
 * ---------------------
 *
 * Fetches and displays tasks assigned to the logged-in user.
 * Shows a table with task title, priority, and assignment date.
 * If no tasks are assigned, displays a message.
 *
 */

import { getAssignedUsers } from "@/app/actions/user-task/get-assigned-users";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ConvertPriorityLabels } from "@/lib/convert-priority-labels";
import { Session } from "next-auth";
import Link from "next/link";

interface TaskSummeryProps {
  session: Session;
}

export const TaskSummery = async ({ session }: TaskSummeryProps) => {
  const userId = Number(session.user.id);
  const assignedTasks = await getAssignedUsers();

  const tasks = assignedTasks.filter((a: any) => a.userId === userId);

  return (
    <div>
      <h2 className="mb-3">Assigned tasks</h2>

      {tasks.length == 0 ? (
        <div className="text-base">
          You’ve got no tasks assigned! Looks like it’s time for a well-deserved
          break &#127881;
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="grid grid-cols-3">
              <TableHead className="pl-0">Task title</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Assigned at</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task: any) => (
              <TableRow
                key={`${task.userId}-${task.taskId}`}
                className="grid grid-cols-3"
              >
                <TableCell className="pl-0">
                  <Link
                    href={`/board/${task.task.boardId}`}
                    className="hover:underline"
                  >
                    {task.task.title}
                  </Link>
                </TableCell>
                <TableCell>
                  {ConvertPriorityLabels[task.task.priority ?? ""] ?? "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {new Date(task.assignedAt).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
