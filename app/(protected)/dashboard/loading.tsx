/**
 * DashboardLoading
 * -----------------
 * This component displays a loading skeleton for the Dashboard page.
 * It provides visual feedback while the actual dashboard data is being fetched.
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="w-[85%] lg:w-[92%] mx-auto mt-20 lg:mt-40 space-y-10">
      <div className="flex text-xl gap-2 text-center">
        <Skeleton className="h-6 w-1/3" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array(3)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-[250px] w-full rounded-lg" />
          ))}
        <Skeleton className="h-[250px] w-full rounded-lg" />
      </div>

      <div className="w-full border border-slate-200 rounded-lg shadow overflow-hidden p-4">
        <div className="grid grid-cols-3 bg-slate-100 p-4">
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-6 w-16 rounded" />
          <Skeleton className="h-6 w-20 rounded justify-self-end" />
        </div>

        <div className="space-y-4 mt-4">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="grid grid-cols-3 gap-4 items-center">
              <Skeleton className="h-5 w-full rounded" />
              <Skeleton className="h-5 w-20 rounded" />
              <Skeleton className="h-5 w-24 rounded justify-self-end" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
