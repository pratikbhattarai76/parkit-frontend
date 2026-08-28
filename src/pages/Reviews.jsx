import { useState, useEffect } from "react";
import reviewService from "@/services/reviewService";
import AverageRatingSummary from "@/components/reviews/AverageRatingSummary";
import ReviewList from "@/components/reviews/ReviewList";
import { Loader2, AlertCircle } from "lucide-react";

/**
 * Reviews Page (Intern 6 — Saurav Niroula)
 * - Community Driver Reviews header
 * - Summary card showing real Average Rating & Total Reviews from GET /review/
 * - ReviewList (Filter/Sort, Cards, Real Pagination)
 */
export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let ignore = false;

    async function loadAllReviews() {
      setLoading(true);
      setError(null);
      try {
        const response = await reviewService.getReviews();
        const data =
          response?.data?.reviews ||
          response?.data ||
          response?.reviews ||
          (Array.isArray(response) ? response : []);

        if (!ignore) {
          setReviews(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!ignore) {
          console.error("Error loading reviews:", err.message);
          setError(err.message || "Failed to load reviews from server.");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    loadAllReviews();

    return () => {
      ignore = true;
    };
  }, []);

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

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2 text-slate-400 text-xs">
          <Loader2 className="h-6 w-6 animate-spin text-slate-500" />
          <span>Loading reviews summary...</span>
        </div>
      ) : error ? (
        <div className="py-6 text-center">
          <div className="inline-flex items-center gap-1.5 text-xs text-rose-500 bg-rose-50 dark:bg-rose-950/40 p-3 rounded-lg border border-rose-200 dark:border-rose-800">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        </div>
      ) : (
        <>
          {/* Top Rating Summary Card calculated from real reviews */}
          <AverageRatingSummary mode="global" reviews={reviews} />

          {/* Reviews Filter, List, and Pagination */}
          <ReviewList reviews={reviews} />
        </>
      )}
    </div>
  );
}
