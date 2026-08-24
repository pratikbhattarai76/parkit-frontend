import { useAuth } from "@/context/AuthContext";
import DashboardStats from "@/components/dashboard/DashboardStats";
import QuickActions from "@/components/dashboard/QuickActions";
import RecommendedParking from "@/components/dashboard/RecommendedParking";
import RecentReservations from "@/components/dashboard/RecentReservations";
import {
  LayoutDashboard,
  Sparkles,
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
      {/* Bottom info cards */}
      <section className="grid gap-6 lg:grid-cols-2">
        <RecommendedParking />
        <RecentReservations />
      </section>
    </div>
  );
}