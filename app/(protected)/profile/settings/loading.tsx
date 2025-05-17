/**
 * ProfileSettingsLoading
 * ----------------------
 * Displays a loading skeleton for the profile settings page.
 * Provides visual feedback while the settings view is being loaded.
 */

import { Skeleton } from "@/components/ui/skeleton";

export default function ProfileSettingsLoading() {
  return (
    <div className="flex flex-col w-[90%] lg:w-[92%] mx-auto gap-5 my-10 mt-20 lg:mt-40">
      <h1>
        <Skeleton className="h-8 w-48 rounded" />
      </h1>

      <div className="text-xl p-4 w-full lg:w-[90%] gap-4 mb-5 rounded-xl border border-slate-200 text-slate-950 shadow py-5">
        <div className="flex items-center justify-between">
          <Skeleton className="h-6 w-40 rounded" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>
      </div>

      <div className="text-xl p-4 w-full lg:w-[90%] flex items-center justify-between gap-4 mb-5 rounded-xl border border-slate-200 text-slate-950 shadow">
        <Skeleton className="h-6 w-40 rounded" />
        <Skeleton className="h-10 w-24 rounded" />
      </div>
    </div>
  );
}
