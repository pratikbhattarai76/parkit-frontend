import { CalendarDays, CarFront, Star, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const userStats = [
  { title: "My Listings", value: 0, icon: CarFront, color: "blue" },
  { title: "Reservations", value: 0, icon: CalendarDays, color: "indigo" },
  { title: "Reviews", value: 0, icon: Star, color: "violet" },
];

const adminStats = [
  { title: "Total Listings", value: 0, icon: CarFront, color: "blue" },
  { title: "Total Reservations", value: 0, icon: CalendarDays, color: "indigo" },
  { title: "Total Users", value: 0, icon: Users, color: "violet" },
  { title: "Revenue", value: "$0", icon: TrendingUp, color: "emerald" },
];

const colorMap = {
  blue: {
    bg: "bg-blue-50 dark:bg-blue-900/20",
    icon: "text-blue-500",
    badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  },
  indigo: {
    bg: "bg-indigo-50 dark:bg-indigo-900/20",
    icon: "text-indigo-500",
    badge: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
  violet: {
    bg: "bg-violet-50 dark:bg-violet-900/20",
    icon: "text-violet-500",
    badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  },
  emerald: {
    bg: "bg-emerald-50 dark:bg-emerald-900/20",
    icon: "text-emerald-500",
    badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
};

export default function DashboardStats({ isAdmin = false }) {
  const stats = isAdmin ? adminStats : userStats;

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;
        const colors = colorMap[stat.color];

        return (
          <Card
            key={stat.title}
            className="group border-slate-200 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`flex size-10 items-center justify-center rounded-xl ${colors.bg} transition-transform duration-200 group-hover:scale-110`}
                >
                  <Icon className={`size-5 ${colors.icon}`} aria-hidden="true" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}