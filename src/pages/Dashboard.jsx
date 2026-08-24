import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import {
  LayoutDashboard,
  Sparkles,
  MapPin,
  CalendarClock,
} from "lucide-react";

export default function Dashboard() {
  const { user, isAdmin } = useAuth();

  const rawName =
    (user?.name && user.name.trim()) ||
    user?.username ||
    user?.email?.split("@")[0] ||
    "there";

  // Capitalize first letter of each word
  const displayName = rawName
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const now = new Date();
  const hour = now.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="space-y-8">

      {/* Hero welcome banner */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 p-6 sm:p-8 text-white shadow-xl">
        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/5 blur-2xl" />
          <div className="absolute -bottom-10 left-10 size-64 rounded-full bg-indigo-500/20 blur-3xl" />
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-blue-200">
              <Sparkles className="size-4" />
              {greeting}
            </p>
            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Welcome Back,{" "}
              <span className="text-blue-200">{displayName}</span> 👋
            </h1>
            <p className="mt-2 text-sm text-blue-100 max-w-md">
              {isAdmin
                ? "You have admin access. Manage listings, users, and platform settings below."
                : "Manage your parking activity and discover recommended spots near you."}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20 backdrop-blur-sm">
              <LayoutDashboard className="size-7 text-white" />
            </div>
            {isAdmin && (
              <span className="rounded-full bg-white/15 px-3 py-1.5 text-xs font-semibold tracking-wide text-white ring-1 ring-white/20">
                Administrator
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Stats */}
      <DashboardStats isAdmin={isAdmin} />

      {/* Quick actions */}
      <QuickActions isAdmin={isAdmin} />

      {/* Bottom info cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/30">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <MapPin className="size-4 text-blue-500" />
              Recommended Near You
            </h2>
          </div>
          <CardContent className="p-6">
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-900/20">
                <MapPin className="size-6 text-blue-400" />
              </div>
              <p className="mt-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                No recommendations yet
              </p>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                Parking spots based on your location will appear here.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="border-b border-slate-100 bg-slate-50/50 px-6 py-4 dark:border-slate-800 dark:bg-slate-900/30">
            <h2 className="flex items-center gap-2 text-base font-semibold text-slate-900 dark:text-white">
              <CalendarClock className="size-4 text-indigo-500" />
              Recent Reservations
            </h2>
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
      </section>
    </div>
  );
}