"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MemberFormValues, MemberSchema } from "../form/schemas/members-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assignUser } from "@/app/actions/assign-user";
import { useBoard } from "@/app/context/board-context";
import { toast } from "sonner";

interface MembersProps {
  boardId: number;
  taskId: number;
}
export const Members = ({ boardId, taskId }: MembersProps) => {
  const { allUsers } = useBoard();
  const {
    formState: { isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      userId: 0,
    },
  });

  const handleAssignMember = async (userId: string) => {
    try {
      const assignmentRes = await assignUser(
        Number(taskId),
        Number(userId),
        boardId
      );
      toast.message("Assignment was successful!", {
        description: "The user has been assigned to the task.",
      });
    } catch (error) {
      toast.error("Unexpected error. Please try again!");
    }
  };

  return (
    <Select onValueChange={handleAssignMember} disabled={isSubmitting}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {allUsers.map((user) => (
          <SelectItem
            value={String(user.id)}
            key={user.id}
            className="cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="text-white bg-[#1868DB] rounded-full w-10 h-10 flex items-center justify-center text-xs uppercase">
                {user.username.slice(0, 2)}
              </div>
              <span className="capitalize text-[16px]">{user.username}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
