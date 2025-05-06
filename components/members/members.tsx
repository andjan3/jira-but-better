"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/app/actions/get-users";
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

export const Members = ({ boardId, taskId }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<MemberFormValues>({
    resolver: zodResolver(MemberSchema),
    defaultValues: {
      userId: 0,
    },
  });
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsers();
        setUsers(result);
      } catch (err) {
        console.error("Failed to load users", err);
      }
    };
    fetchData();
  }, []);

  const handleAssignMember = async (userId: any) => {
    try {
      await assignUser(parseInt(taskId), parseInt(userId), boardId);
      console.log("assigned task");
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Select onValueChange={handleAssignMember} disabled={isSubmitting}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
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
