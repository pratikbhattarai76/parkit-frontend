import { useState, useEffect } from "react";
import reviewService from "@/services/reviewService";
import ReviewCard from "./ReviewCard";
import AverageRatingSummary from "./AverageRatingSummary";
import CreateReviewForm from "./CreateReviewForm";
import { Loader2, AlertCircle, ListFilter, ChevronDown } from "lucide-react";

/**
 * ListingReviews Component (Intern 6 — Saurav Niroula)
 *
 * Matches the reference screenshot layout:
 *
 * Card 1 — "Reviews" heading (blue left accent) + rating summary with breakdown bars
 * Card 2 — "Write a Review" form
 * Card 3 — "All Reviews (N)" heading + "Newest First" sort label + review rows + "Load More Reviews" button
 *
 * All counts, averages, and reviews come from the real API. Nothing is hardcoded.
 */

const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "highest", label: "Highest Rated" },
  { value: "lowest", label: "Lowest Rated" },
];

export default function ListingReviews({ listingId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCount, setVisibleCount] = useState(5);
  const [sortBy, setSortBy] = useState("newest");

  const fetchListingReviews = async () => {
    if (!listingId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await reviewService.getListingReviews(listingId);
      const data =
        response?.data?.reviews ||
        response?.data ||
        response?.reviews ||
        (Array.isArray(response) ? response : []);

      setReviews(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to load reviews:", err.message);
      setError("Unable to load reviews. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListingReviews();
  }, [listingId]);

  const handleReviewCreated = (newReview) => {
    setReviews((prev) => [newReview, ...prev]);
    setVisibleCount((v) => v + 1);
  };

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "newest")
      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === "highest")
      return Number(b.rating || 0) - Number(a.rating || 0);
    if (sortBy === "lowest")
      return Number(a.rating || 0) - Number(b.rating || 0);
    return 0;
  });

  const displayedReviews = sortedReviews.slice(0, visibleCount);
  const hasMore = sortedReviews.length > visibleCount;

  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label || "Newest First";

  return (
    <div className="space-y-4">
      {/* ─── Card 1: Reviews Summary ─── */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs overflow-hidden">
        {/* Heading with blue left accent */}
        <div className="flex items-center gap-3 px-5 pt-5 pb-4">
          <div className="w-1 h-5 rounded-full bg-blue-600 shrink-0" />
          <h2 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
            Reviews
          </h2>
        </div>

        <div className="px-5 pb-5">
          {loading ? (
            <div className="py-6 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
              <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
              <span>Loading reviews...</span>
            </div>
          ) : error ? (
            <div className="py-4 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg border border-rose-100 dark:border-rose-900">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            </div>
          ) : (
            <AverageRatingSummary reviews={reviews} mode="breakdown" />
          )}
        </div>
      </div>

      {/* ─── Card 2: Write a Review ─── */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 shadow-xs">
        <CreateReviewForm
          listingId={listingId}
          onReviewCreated={handleReviewCreated}
        />
      </div>

      {/* ─── Card 3: All Reviews List ─── */}
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 shadow-xs overflow-hidden">
        {/* Header row: "All Reviews (N)" + "Newest First" sort */}
        <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            All Reviews{" "}
            <span className="font-semibold text-slate-500 dark:text-slate-400">
              ({reviews.length})
            </span>
          </h3>

          {/* Sort control */}
          <div className="relative flex items-center gap-1.5">
            <label
              htmlFor="review-sort"
              className="text-xs text-slate-500 dark:text-slate-400 font-medium sr-only"
            >
              Sort
            </label>
            <select
              id="review-sort"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setVisibleCount(5);
              }}
              className="appearance-none bg-transparent border-0 text-xs font-semibold text-slate-700 dark:text-slate-200 focus:outline-none cursor-pointer pr-5"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <ListFilter className="h-3.5 w-3.5 text-slate-400 pointer-events-none absolute right-0" />
          </div>
        </div>

        {/* Review rows */}
        <div className="px-5">
          {loading ? (
            <div className="py-10 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
              <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
              <span>Loading reviews...</span>
            </div>
          ) : error ? (
            <div className="py-6 text-center">
              <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-2.5 rounded-lg">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            </div>
          ) : reviews.length === 0 ? (
            <div className="py-10 text-center text-xs text-slate-500 dark:text-slate-400">
              No reviews yet. Be the first to review this parking space!
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayedReviews.map((rev, idx) => (
                <ReviewCard
                  key={rev._id || rev.id || `rev-${idx}`}
                  review={rev}
                />
              ))}
            </div>
          )}
        </div>

        {/* Load More Reviews button */}
        {hasMore && (
          <div className="flex justify-center py-4 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              id="load-more-reviews-btn"
              onClick={() => setVisibleCount((prev) => prev + 5)}
              className="cursor-pointer rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 px-5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors shadow-xs flex items-center gap-1.5"
            >
              Load More Reviews
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
