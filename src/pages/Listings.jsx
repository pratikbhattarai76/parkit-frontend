import { Search, MapPin, SlidersHorizontal, CarFront } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function Listings() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Find Parking
        </h1>
        <p className="mt-2 text-slate-500 dark:text-slate-400">
          Browse available parking spots near you.
        </p>
      </section>

      {/* Search bar */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            id="listings-search"
            type="text"
            placeholder="Search by location, area or address..."
            className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-900 outline-none placeholder:text-slate-400 transition-all focus:border-blue-500 focus:ring-3 focus:ring-blue-500/10 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-blue-400"
          />
        </div>
        <button className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 dark:hover:bg-slate-800">
          <SlidersHorizontal className="size-4" />
          Filters
        </button>
      </div>

      {/* Empty state */}
      <Card className="border-slate-200 dark:border-slate-800">
        <CardContent className="flex flex-col items-center justify-center py-24 text-center">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-900/20">
            <CarFront className="size-8 text-blue-400" />
          </div>
          <h2 className="mt-5 text-lg font-semibold text-slate-900 dark:text-white">
            No listings available
          </h2>
          <p className="mt-2 max-w-sm text-sm text-slate-500 dark:text-slate-400">
            Parking listings will appear here once they are available in your area.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Listings;
