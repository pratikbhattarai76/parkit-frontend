import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import reviewService from "@/services/reviewService";
import StarRating from "./StarRating";
import { Send, Loader2, PenLine } from "lucide-react";

/**
 * CreateReviewForm Component (Intern 6 — Saurav Niroula)
 *
 * Matches the reference screenshot exactly:
 * - "✏ Write a Review" heading with blue pencil icon
 * - Two-column layout: "Your Rating" (left) | "Your Review" textarea (right)
 * - Interactive 1–5 star selector with "Click on a star to rate" helper text
 * - Textarea placeholder "Share your experience about this parking space..."
 * - Character counter bottom-right "0 / 500"
 * - Navy "Submit Review" button with Send icon (bottom-left, below stars)
 * - Validation, loading, success, and error states
 */
export default function CreateReviewForm({
  listingId,
  onReviewCreated = () => {},
}) {
  const { user, isAuthenticated } = useAuth();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!rating || rating === 0) {
      newErrors.rating = "Please select a star rating.";
    }
    if (!comment || !comment.trim()) {
      newErrors.comment = "Review comment is required.";
    } else if (comment.trim().length < 5) {
      newErrors.comment = "Minimum 5 characters required.";
    } else if (comment.trim().length > 500) {
      newErrors.comment = "Comment must be under 500 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setServerError(null);
    setSuccessMessage(null);

    if (!validate()) return;

    setLoading(true);
    try {
      const payload = {
        listingId,
        rating: Number(rating),
        comment: comment.trim(),
      };

      const result = await reviewService.createReview(payload);
      const rawReview =
        result?.data?.review ||
        result?.data ||
        result?.review ||
        result || {};

      const createdReview = {
        _id: rawReview._id || rawReview.id || `rev-${Date.now()}`,
        id: rawReview.id || rawReview._id || `rev-${Date.now()}`,
        listingId,
        rating: Number(rawReview.rating || rating),
        comment: rawReview.comment || comment.trim(),
        user: rawReview.user || user || { name: "You" },
        userName: rawReview.userName || rawReview.user?.name || user?.name || user?.username || "You",
        createdAt: rawReview.createdAt || rawReview.date || new Date().toISOString(),
      };

      setSuccessMessage("Review submitted successfully!");
      setRating(0);
      setComment("");
      setErrors({});

      onReviewCreated(createdReview);

      setTimeout(() => {
        setSuccessMessage(null);
      }, 4000);
    } catch (err) {
      console.error("Error creating review:", err);
      setServerError(
        err.data?.message ||
          err.response?.data?.message ||
          err.message ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Not logged in — clean prompt
  if (!isAuthenticated) {
    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <PenLine className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">
            Write a Review
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Please{" "}
          <a
            href="/login"
            className="font-semibold text-blue-600 hover:underline dark:text-blue-400"
          >
            log in
          </a>{" "}
          to leave a review for this parking spot.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Section Heading */}
      <div className="flex items-center gap-2">
        <PenLine className="h-4 w-4 text-blue-600 shrink-0" />
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Write a Review
        </h3>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {successMessage}
        </div>
      )}

      {/* Server Error Banner */}
      {serverError && (
        <div className="rounded-lg bg-rose-50 px-3 py-2 text-xs font-medium text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        {/* Two-column layout matching the screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-[180px_1fr] gap-4 items-start">

          {/* Left: Your Rating + Submit Button */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2">
                Your Rating
              </label>
              <StarRating
                rating={rating}
                interactive={!loading}
                onChange={(val) => {
                  setRating(val);
                  if (errors.rating)
                    setErrors((prev) => ({ ...prev, rating: undefined }));
                }}
                size="lg"
              />
              {errors.rating ? (
                <p className="mt-1 text-[11px] font-medium text-rose-500">
                  {errors.rating}
                </p>
              ) : (
                <p className="mt-1.5 text-[11px] text-slate-400 dark:text-slate-500">
                  Click on a star to rate
                </p>
              )}
            </div>

            {/* Submit Review button — below stars on left */}
            <button
              type="submit"
              id="review-submit-btn"
              disabled={loading}
              className="cursor-pointer rounded-lg bg-blue-700 hover:bg-blue-800 active:bg-blue-900 text-white font-semibold text-xs py-2.5 px-4 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-xs w-full sm:w-auto"
            >
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Send className="h-3 w-3" />
                  <span>Submit Review</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Your Review Textarea */}
          <div>
            <label
              htmlFor="review-comment"
              className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2"
            >
              Your Review
            </label>
            <textarea
              id="review-comment"
              rows={5}
              disabled={loading}
              value={comment}
              maxLength={500}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment)
                  setErrors((prev) => ({ ...prev, comment: undefined }));
              }}
              placeholder="Share your experience about this parking space..."
              className={`w-full rounded-lg border bg-white dark:bg-slate-950 px-3 py-2.5 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-blue-500 transition-colors resize-none ${
                errors.comment
                  ? "border-rose-400 dark:border-rose-500"
                  : "border-slate-200 dark:border-slate-700"
              }`}
            />
            <div className="flex items-start justify-between mt-1">
              <span className="text-[11px] text-rose-500 font-medium">
                {errors.comment || ""}
              </span>
              <span className="text-[11px] text-slate-400 font-medium shrink-0 ml-2">
                {comment.length} / 500
              </span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
