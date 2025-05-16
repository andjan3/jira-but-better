import { Skeleton } from "@/components/ui/skeleton";

export default function BoardPageLoading() {
  return (
    <div className="p-6 space-y-6 mt-32">
      <Skeleton className="h-8 w-1/3" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-[200px] rounded-xl" />
          ))}
      </div>
    </div>
  );
}
