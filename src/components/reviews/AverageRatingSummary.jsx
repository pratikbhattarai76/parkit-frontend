import StarRating from "./StarRating";
import { Star } from "lucide-react";

/**
 * AverageRatingSummary Component (Intern 6 — Saurav Niroula)
 * 
 * Displays rating score, star rating, total reviews count, and 5-to-1 star distribution bars.
 * All values are calculated dynamically from the actual reviews array or backend summary props.
 */
export default function AverageRatingSummary({
  reviews = [],
  averageRating: backendAvg,
  reviewCount: backendCount,
  mode = "breakdown",
}) {
  const count = backendCount !== undefined ? Number(backendCount) : reviews.length;
  
  const average =
    backendAvg !== undefined
      ? Number(backendAvg)
      : reviews.length > 0
      ? reviews.reduce((sum, r) => sum + Number(r.rating || 0), 0) / reviews.length
      : 0;

  // Real distribution calculated dynamically from reviews
  const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  if (reviews.length > 0) {
    reviews.forEach((r) => {
      const star = Math.min(5, Math.max(1, Math.round(Number(r.rating || 0))));
      if (starCounts[star] !== undefined) starCounts[star] += 1;
    });
  }

  const totalReviewsCount = count || Object.values(starCounts).reduce((a, b) => a + b, 0) || 1;

  if (mode === "breakdown") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
        {/* Left Column: Big Score, Stars, Reviews Count */}
        <div className="sm:col-span-5 flex flex-col items-center justify-center text-center sm:border-r border-slate-100 dark:border-slate-800 pr-0 sm:pr-4 py-2">
          <span className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-none">
            {average > 0 ? average.toFixed(1) : "0.0"}
          </span>
          <div className="mt-2.5">
            <StarRating rating={average} size="md" />
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1.5">
            ({count} {count === 1 ? "review" : "reviews"})
          </span>
        </div>

        {/* Right Column: 5-to-1 Star Progress Bars */}
        <div className="sm:col-span-7 space-y-1.5 pl-0 sm:pl-2">
          {[5, 4, 3, 2, 1].map((star) => {
            const starNum = starCounts[star] || 0;
            const percentage = count > 0 ? Math.round((starNum / totalReviewsCount) * 100) : 0;

            return (
              <div key={star} className="flex items-center gap-2 text-xs">
                <span className="flex items-center gap-1 w-6 font-semibold text-slate-700 dark:text-slate-300">
                  <span>{star}</span>
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                </span>

                <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-amber-400 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>

                <span className="w-5 text-right font-medium text-slate-600 dark:text-slate-400 text-[11px]">
                  {starNum}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Global / Community Summary Card
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 dark:divide-slate-800 gap-4 sm:gap-0">
        {/* Left: Average Rating */}
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

        {/* Right: Total Reviews */}
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

