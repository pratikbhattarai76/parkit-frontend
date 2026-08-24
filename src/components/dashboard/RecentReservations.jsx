import { CalendarClock } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export default function RecentReservations() {
  return (
    <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
      <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="flex items-center gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-indigo-50 dark:bg-indigo-900/20">
            <CalendarClock className="size-4 text-indigo-500" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-slate-900 dark:text-white">
              Recent Reservations
            </h2>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your latest parking reservations.
            </p>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-900/20">
            <CalendarClock className="size-6 text-indigo-400" />
          </div>

          <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
            No recent reservations
          </p>

          <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
            Your parking reservations will appear here.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}