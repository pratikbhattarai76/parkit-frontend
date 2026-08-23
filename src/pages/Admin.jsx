import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Shield, Users, CarFront, CalendarDays, TrendingUp, Settings } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const adminStats = [
  { label: "Total Users", value: "—", icon: Users, color: "blue" },
  { label: "Total Listings", value: "—", icon: CarFront, color: "indigo" },
  { label: "Reservations", value: "—", icon: CalendarDays, color: "violet" },
  { label: "Revenue", value: "—", icon: TrendingUp, color: "emerald" },
];

const colorMap = {
  blue: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400",
  indigo: "bg-indigo-50 text-indigo-500 dark:bg-indigo-900/20 dark:text-indigo-400",
  violet: "bg-violet-50 text-violet-500 dark:bg-violet-900/20 dark:text-violet-400",
  emerald: "bg-emerald-50 text-emerald-500 dark:bg-emerald-900/20 dark:text-emerald-400",
};

function Admin() {
  const { user } = useAuth();

  const isAdmin =
    user?.role === "admin" ||
    user?.role === "ADMIN" ||
    user?.is_admin === true;

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -right-10 -top-10 size-48 rounded-full bg-white/5 blur-2xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <Shield className="size-7 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
              Administration
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Panel
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Manage users, listings, reservations and platform settings.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {adminStats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="border-slate-200 dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
                      {s.label}
                    </p>
                    <p className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
                      {s.value}
                    </p>
                  </div>
                  <div className={`flex size-10 items-center justify-center rounded-xl ${colorMap[s.color]}`}>
                    <Icon className="size-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Placeholder sections */}
      <section className="grid gap-6 lg:grid-cols-2">
        {[
          { title: "User Management", icon: Users, desc: "View, edit and manage platform users." },
          { title: "Listing Management", icon: CarFront, desc: "Approve, reject and manage parking listings." },
          { title: "Reservation Overview", icon: CalendarDays, desc: "Monitor and manage all reservations." },
          { title: "Platform Settings", icon: Settings, desc: "Configure platform-wide settings." },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.title} className="border-slate-200 transition-all hover:shadow-md dark:border-slate-800">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-9 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                    <Icon className="size-5 text-slate-600 dark:text-slate-300" />
                  </div>
                  <h2 className="font-semibold text-slate-900 dark:text-white">{s.title}</h2>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{s.desc}</p>
                <div className="mt-4 inline-flex items-center text-xs font-medium text-slate-400">
                  Coming soon
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export default Admin;
