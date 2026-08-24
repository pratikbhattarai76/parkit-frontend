import { Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Search, MapPin, Shield, ArrowRight, Car, Clock, Star } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Find Instantly",
    description: "Search thousands of parking spots near you in seconds.",
    color: "blue",
  },
  {
    icon: Clock,
    title: "Reserve Ahead",
    description: "Book your spot before you arrive — no more circling.",
    color: "indigo",
  },
  {
    icon: Star,
    title: "Trusted Reviews",
    description: "Real reviews from real drivers to help you choose.",
    color: "violet",
  },
  {
    icon: Shield,
    title: "Secure Payments",
    description: "Your transactions are always safe and encrypted.",
    color: "emerald",
  },
];

const colorMap = {
  blue: "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400",
  indigo: "bg-indigo-50 text-indigo-600 dark:bg-indigo-900/20 dark:text-indigo-400",
  violet: "bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400",
  emerald: "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400",
};

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="space-y-20 pb-12">

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 px-6 py-20 text-center text-white shadow-2xl sm:px-12 sm:py-28">
        {/* Background orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-0 size-72 rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 size-72 rounded-full bg-indigo-500/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-3xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold text-blue-200 backdrop-blur-sm">
            <Car className="size-3.5" />
            Smart Parking Platform
          </div>

          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Park Smarter,{" "}
            <span className="bg-gradient-to-r from-blue-300 to-indigo-300 bg-clip-text text-transparent">
              Not Harder
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base text-slate-300 sm:text-lg">
            Find, compare and reserve parking spots near you in seconds.
            Say goodbye to the endless hunt for parking.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/listings"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:from-blue-600 hover:to-indigo-700 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Search className="size-4" />
              Find Parking
              <ArrowRight className="size-4" />
            </Link>
            {!user && (
              <Link
                to="/register"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                Get Started Free
              </Link>
            )}
            {user && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats row */}
      <section className="grid grid-cols-2 gap-6 sm:grid-cols-4">
        {[
          { label: "Parking Spots", value: "10K+" },
          { label: "Happy Drivers", value: "50K+" },
          { label: "Cities", value: "25+" },
          { label: "Avg. Rating", value: "4.8★" },
        ].map((s) => (
          <div
            key={s.label}
            className="flex flex-col items-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              {s.value}
            </span>
            <span className="mt-1 text-xs font-medium text-slate-500 dark:text-slate-400">
              {s.label}
            </span>
          </div>
        ))}
      </section>

      {/* Features */}
      <section>
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Why choose Parkit?
          </h2>
          <p className="mt-3 text-base text-slate-500 dark:text-slate-400">
            Everything you need for a stress-free parking experience.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.title}
                className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
              >
                <div className={`mb-4 flex size-11 items-center justify-center rounded-xl ${colorMap[f.color]} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white">{f.title}</h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{f.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 p-10 text-center text-white shadow-xl">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to park smarter?</h2>
          <p className="mt-3 text-sm text-blue-100">
            Create your free account and find your first spot today.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              to="/register"
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow transition-all hover:shadow-lg hover:-translate-y-0.5"
            >
              Sign up for free
            </Link>
            <Link
              to="/login"
              className="rounded-xl border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-white/10"
            >
              Log in
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}
