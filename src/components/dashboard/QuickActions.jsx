import { CalendarDays, Search, UserRound, Shield, PlusCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const userActions = [
  {
    title: "Find Parking",
    description: "Browse available parking spots near you.",
    path: "/listings",
    icon: Search,
    color: "blue",
  },
  {
    title: "My Reservations",
    description: "View and manage your active reservations.",
    path: "/reservations",
    icon: CalendarDays,
    color: "indigo",
  },
  {
    title: "My Profile",
    description: "View and update your account details.",
    path: "/profile",
    icon: UserRound,
    color: "violet",
  },
];

const adminActions = [
  {
    title: "Find Parking",
    description: "Browse available parking spots.",
    path: "/listings",
    icon: Search,
    color: "blue",
  },
  {
    title: "Reservations",
    description: "View and manage all reservations.",
    path: "/reservations",
    icon: CalendarDays,
    color: "indigo",
  },
  {
    title: "Admin Panel",
    description: "Manage users, listings, and settings.",
    path: "/admin",
    icon: Shield,
    color: "violet",
  },
  {
    title: "My Profile",
    description: "View and update your account details.",
    path: "/profile",
    icon: UserRound,
    color: "slate",
  },
];

const colorMap = {
  blue: {
    iconBg: "bg-blue-50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    hoverBorder: "hover:border-blue-200 dark:hover:border-blue-800",
    arrowColor: "text-blue-500",
  },
  indigo: {
    iconBg: "bg-indigo-50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    hoverBorder: "hover:border-indigo-200 dark:hover:border-indigo-800",
    arrowColor: "text-indigo-500",
  },
  violet: {
    iconBg: "bg-violet-50 dark:bg-violet-900/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    hoverBorder: "hover:border-violet-200 dark:hover:border-violet-800",
    arrowColor: "text-violet-500",
  },
  slate: {
    iconBg: "bg-slate-100 dark:bg-slate-800",
    iconColor: "text-slate-600 dark:text-slate-300",
    hoverBorder: "hover:border-slate-300 dark:hover:border-slate-600",
    arrowColor: "text-slate-400",
  },
};

export default function QuickActions({ isAdmin = false }) {
  const actions = isAdmin ? adminActions : userActions;

  return (
    <section>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Quickly access the things you use most.
          </p>
        </div>
      </div>

      <div className={`grid gap-4 ${isAdmin ? "sm:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3"}`}>
        {actions.map((action) => {
          const Icon = action.icon;
          const colors = colorMap[action.color];

          return (
            <Link
              key={action.path}
              to={action.path}
              className={`group flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 ${colors.hoverBorder}`}
            >
              <div>
                <div
                  className={`mb-4 flex size-10 items-center justify-center rounded-xl ${colors.iconBg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className={`size-5 ${colors.iconColor}`} aria-hidden="true" />
                </div>

                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  {action.description}
                </p>
              </div>

              <div className={`mt-5 flex items-center gap-1 text-sm font-medium ${colors.arrowColor}`}>
                Open
                <ArrowRight className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}