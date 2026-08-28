import { useState, useEffect } from "react";
import reviewService from "@/services/reviewService";
import ReviewCard from "./ReviewCard";
import { Filter, ArrowUpDown, ChevronLeft, ChevronRight, Loader2, AlertCircle } from "lucide-react";

/**
 * ReviewList Component (Intern 6 — Saurav Niroula)
 * Displays all driver reviews with rating filtering, sorting, and client-side pagination.
 * Integrated with GET /review/
 */
export default function ReviewList({ reviews: propReviews, onReviewsLoaded }) {
  const [reviews, setReviews] = useState(propReviews || []);
  const [loading, setLoading] = useState(!propReviews);
  const [error, setError] = useState(null);
  const [selectedRating, setSelectedRating] = useState("ALL");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    let ignore = false;

    async function fetchReviews() {
      if (propReviews !== undefined) {
        setReviews(propReviews);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const response = await reviewService.getReviews();
        const data =
          response?.data?.reviews ||
          response?.data ||
          response?.reviews ||
          (Array.isArray(response) ? response : []);

        const list = Array.isArray(data) ? data : [];
        if (!ignore) {
          setReviews(list);
          if (onReviewsLoaded) onReviewsLoaded(list);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Failed to load community reviews:", err.message);
          setError(err.message || "Failed to load community reviews.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      ignore = true;
    };
  }, [propReviews, onReviewsLoaded]);

  // Filter reviews
  const filteredReviews = reviews.filter((review) => {
    if (selectedRating === "ALL") return true;
    return Math.round(Number(review.rating)) === Number(selectedRating);
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    if (sortBy === "newest") return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    if (sortBy === "highest") return Number(b.rating || 0) - Number(a.rating || 0);
    if (sortBy === "lowest") return Number(a.rating || 0) - Number(b.rating || 0);
    return 0;
  });

  const totalPages = Math.max(1, Math.ceil(sortedReviews.length / pageSize));
  const paginatedReviews = sortedReviews.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleRatingFilter = (val) => {
    setSelectedRating(val);
    setCurrentPage(1);
  };

  const handleSortChange = (val) => {
    setSortBy(val);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Top Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-900 shadow-2xs">
            <Filter className="h-3 w-3 text-slate-400" />
            <span className="font-medium">Filter:</span>
          </div>

          <button
            type="button"
            onClick={() => handleRatingFilter("ALL")}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors shadow-2xs ${
              selectedRating === "ALL"
                ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
            }`}
          >
            All Ratings
          </button>

          {["5", "4", "3", "2", "1"].map((val) => {
            const isSelected = selectedRating === val;
            return (
              <button
                key={val}
                type="button"
                onClick={() => handleRatingFilter(val)}
                className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium border transition-colors shadow-2xs ${
                  isSelected
                    ? "bg-slate-900 text-white border-slate-900 dark:bg-white dark:text-slate-900 dark:border-white"
                    : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800 hover:bg-slate-50"
                }`}
              >
                {val} ★
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 border border-slate-200 dark:border-slate-800 rounded-lg px-2.5 py-1.5 bg-white dark:bg-slate-900 text-xs shadow-2xs">
          <ArrowUpDown className="h-3 w-3 text-slate-400" />
          <span className="text-slate-500 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="bg-transparent border-0 text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer pr-1"
          >
            <option value="newest">Most Recent</option>
            <option value="highest">Highest Rating</option>
            <option value="lowest">Lowest Rating</option>
          </select>
        </div>
      </div>

      {/* Review List Container Card */}
      <div className="rounded-xl border border-slate-200 bg-white px-5 sm:px-6 py-2 dark:border-slate-800 dark:bg-slate-900 shadow-xs divide-y divide-slate-100 dark:divide-slate-800">
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
            <Loader2 className="h-5 w-5 animate-spin text-slate-500" />
            <span>Loading community reviews...</span>
          </div>
        ) : error ? (
          <div className="py-8 text-center">
            <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg">
              <AlertCircle className="h-4 w-4" />
              <span>{error}</span>
            </div>
          </div>
        ) : sortedReviews.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500">
            No reviews found.
          </div>
        ) : (
          paginatedReviews.map((review, idx) => (
            <ReviewCard key={review._id || review.id || `rev-${idx}`} review={review} />
          ))
        )}
      </div>

      {/* Real Numbered Pagination based on actual review count */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-1.5 pt-2 pb-6">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer shadow-2xs"
            aria-label="Previous page"
          >
            <ChevronLeft className="h-3.5 w-3.5" />
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => setCurrentPage(page)}
              className={`h-8 w-8 rounded-lg flex items-center justify-center text-xs font-semibold cursor-pointer shadow-2xs ${
                currentPage === page
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900"
                  : "border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50"
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="h-8 w-8 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-center text-xs text-slate-500 hover:bg-slate-50 disabled:opacity-40 cursor-pointer shadow-2xs"
            aria-label="Next page"
          >
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
