import AverageRatingSummary from "@/components/reviews/AverageRatingSummary";
import ReviewList from "@/components/reviews/ReviewList";

/**
 * Reviews Page (Intern 6 — Saurav Niroula)
 * Matches the reference screenshot layout:
 * - Community Driver Reviews header
 * - Summary card (4.3 Average Rating | 124 Total Reviews)
 * - ReviewList (Filter/Sort, Cards, Pagination)
 */
export default function Reviews() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-5">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          Community Driver Reviews
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Explore authentic ratings and experiences shared by verified drivers across all parking spots.
        </p>
      </div>

      {/* Top Rating Summary Card */}
      <AverageRatingSummary mode="global" averageRating={4.3} reviewCount={124} />

      {/* Reviews Filter, List, and Pagination */}
      <ReviewList />
    </div>
  );
}
