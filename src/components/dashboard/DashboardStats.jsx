import { CalendarDays, CarFront, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "My Listings",
    value: 0,
    icon: CarFront,
  },
  {
    title: "Reservations",
    value: 0,
    icon: CalendarDays,
  },
  {
    title: "Reviews",
    value: 0,
    icon: Star,
  },
];

export default function DashboardStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {stat.title}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-lg bg-muted p-3">
                <Icon className="size-5" aria-hidden="true" />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}