import { CalendarDays, Clock, MapPin, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

function Reservations() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">My Account</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Reservations
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          View and manage all your parking reservations.
        </p>
      </section>

      {/* Filter bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-2">
          {["All", "Active", "Upcoming", "Past"].map((tab) => (
            <button
              key={tab}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                tab === "All"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <Link
          to="/listings"
          className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800"
        >
          <Search className="size-3.5" />
          Find Parking
        </Link>
      </div>

      {/* Empty state */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="flex flex-col items-center justify-center py-20 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-900/20">
            <CalendarDays className="size-8 text-indigo-400" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
            No reservations yet
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            You haven&apos;t made any parking reservations. Browse available spots to get started.
          </p>
          <Link
            to="/listings"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
          >
            <Search className="size-4" />
            Browse Listings
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export default Reservations;
