import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PriorityFormValues, PrioritySchema } from "./schemas/priority-schema";
import { toast } from "sonner";
import { updateTaskPriority } from "@/app/actions/update-task";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Priority = "lowPriority" | "mediumPriority" | "highPriority";

export const PriorityForm = ({ taskId, columnId, boardId }: any) => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<PriorityFormValues>({
    resolver: zodResolver(PrioritySchema),
    defaultValues: {
      priority: undefined,
    },
  });

  const handlePriorityChange = async (value: Priority) => {
    try {
      await updateTaskPriority(taskId, boardId, columnId, value);
      toast.success("Priority updated");
    } catch (error) {
      toast.error("Failed to update priority");
    }
  };

  return (
    <Select onValueChange={handlePriorityChange} disabled={isSubmitting}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Priority" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="highPriority">
          <div className="flex items-center gap-2">
            <div className="bg-[#F87168] w-[20px] h-[20px] rounded-full"></div>
            1-high priority
          </div>
        </SelectItem>
        <SelectItem value="mediumPriority">
          <div className="flex items-center gap-2">
            <div className="bg-[#FEA362] w-[20px] h-[20px] rounded-full"></div>
            2-medium priority
          </div>
        </SelectItem>
        <SelectItem value="lowPriority">
          <div className="flex items-center gap-2">
            <div className="bg-[#7EE2B8] w-[20px] h-[20px] rounded-full"></div>
            3-low priority
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
