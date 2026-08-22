import { CalendarDays, Search, UserRound } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const actions = [
  {
    title: "Find Parking",
    description: "Browse available parking spots.",
    path: "/listings",
    icon: Search,
  },
  {
    title: "My Reservations",
    description: "View and manage your reservations.",
    path: "/reservations",
    icon: CalendarDays,
  },
  {
    title: "My Profile",
    description: "View and update your profile.",
    path: "/profile",
    icon: UserRound,
  },
];

export default function QuickActions() {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          Quickly access the things you use most.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.path}
              className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-950"
            >
              <div>
                <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-900">
                  <Icon
                    className="size-5 text-slate-700 dark:text-slate-300"
                    aria-hidden="true"
                  />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {action.description}
                </p>
              </div>

              <Link to={action.path} className="mt-5">
                <Button variant="outline" className="w-full">
                  Open
                </Button>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}