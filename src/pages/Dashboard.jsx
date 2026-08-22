import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import DashboardStats from "@/components/dashboard/DashboardStats";

export default function Dashboard() {
  const { user } = useAuth();

  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "there";

  return (
    <div className="space-y-8">
      <section>
        <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
          Your Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Welcome back, {displayName} 👋
        </h1>

        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Manage your parking activity and discover recommended spots near you.
        </p>
      </section>

      <DashboardStats />

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recommended Near You
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Parking recommendations based on your location will appear here.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Recent Reservations
            </h2>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Your recent parking reservations will appear here.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}