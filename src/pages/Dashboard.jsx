import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, CarFront, Star } from "lucide-react";

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

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-muted-foreground">
          Your Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight">
          Welcome back 👋
        </h1>

        <p className="mt-2 text-muted-foreground">
          Manage your parking activity and discover recommended spots near
          you.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title}>
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>

                  <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                </div>

                <div className="rounded-lg bg-muted p-3">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Recommended Near You</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Parking recommendations based on your location will appear here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold">Recent Reservations</h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Your recent parking reservations will appear here.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}