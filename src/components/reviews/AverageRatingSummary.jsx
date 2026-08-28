import StarRating from "./StarRating";
import { Star } from "lucide-react";

/**
 * AverageRatingSummary Component (Intern 6 — Saurav Niroula)
 *
 * Displays:
 * - Left: large average number, star row, review count
 * - Right: 5→1 star breakdown bars with count + percentage
 *
 * All values are derived from the real reviews array — nothing is hardcoded.
 */
export default function AverageRatingSummary({
  reviews = [],
  averageRating: backendAvg,
  reviewCount: backendCount,
  mode = "breakdown",
}) {
  const count =
    backendCount !== undefined ? Number(backendCount) : reviews.length;

  const average =
    backendAvg !== undefined
      ? Number(backendAvg)
      : reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) /
        reviews.length
      : 0;

  // Real distribution calculated from reviews
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  reviews.forEach((r) => {
    const star = Math.min(5, Math.max(1, Math.round(Number(r.rating || 0))));
    if (starCounts[star] !== undefined) starCounts[star] += 1;
  });

  const totalForPct = count || Object.values(starCounts).reduce((a, b) => a + b, 0) || 1;

  if (mode === "breakdown") {
    return (
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
        {/* Left: Big Score + Stars + Count */}
        <div className="flex flex-col items-center sm:items-start text-center sm:text-left sm:min-w-[120px] sm:border-r border-slate-100 dark:border-slate-800 sm:pr-6">
          <span className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
            {average > 0 ? average.toFixed(1) : "0.0"}
          </span>
          <div className="mt-2">
            <StarRating rating={average} size="md" />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
            {count} {count === 1 ? "review" : "reviews"}
          </span>
        </div>

        {/* Right: 5→1 Star Bars */}
        <div className="flex-1 w-full space-y-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const starNum = starCounts[star] || 0;
            const percentage =
              totalForPct > 0
                ? Math.round((starNum / totalForPct) * 100)
                : 0;

            return (
              <div key={star} className="flex items-center gap-2.5 text-xs">
                {/* "N ★" label */}
                <span className="flex items-center gap-1 w-7 shrink-0 font-semibold text-slate-700 dark:text-slate-300">
                  {star}
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>

                {/* Progress bar */}
                <div className="flex-1 h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                {/* Count + percentage */}
                <span className="w-20 text-right text-[11px] font-medium text-slate-500 dark:text-slate-400 shrink-0">
                  {starNum}{" "}
                  <span className="text-slate-400">({percentage}%)</span>
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Global / Community Summary Card (used in Reviews.jsx page)
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 gap-4 sm:gap-0">
        <div className="flex flex-col items-center justify-center gap-1 px-4 pb-3 sm:pb-0 text-center">
          <div className="flex items-center gap-2.5">
            <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {average > 0 ? average.toFixed(1) : "0.0"}
            </span>
            <StarRating rating={average} size="md" />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Average Rating
          </span>
        </div>
        <div className="flex flex-col items-center justify-center gap-1 px-4 pt-3 sm:pt-0 text-center">
          <span className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {count}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            Total Reviews
          </span>
        </div>
      </div>
    </div>
  );
}
