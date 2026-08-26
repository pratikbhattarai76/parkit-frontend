import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import reviewService from "@/services/reviewService";
import StarRating from "./StarRating";
import { Send, Loader2 } from "lucide-react";

/**
 * CreateReviewForm Component (Intern 6 — Saurav Niroula)
 * Matches the reference screenshot:
 * - "Write a Review" title
 * - "Your Rating" label with interactive stars
 * - "Your Review" label with textarea (placeholder: "Write your review...")
 * - Character count at bottom-right ("0 / 500")
 * - Navy Blue "Submit Review" button with Send icon
 * - Integrated with POST /review/
 */
export default function CreateReviewForm({
  listingId,
  onReviewCreated = () => {},
}) {
  const { user } = useAuth();

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
    } else if (comment.trim().length < 10) {
      newErrors.comment = "Minimum 10 characters required.";
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
      const createdReview = result?.data || result || {
        _id: `rev-${Date.now()}`,
        listingId,
        rating: Number(rating),
        comment: comment.trim(),
        user: user || { name: "You" },
        createdAt: new Date().toISOString(),
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
        err.response?.data?.message ||
        err.data?.message ||
        err.message ||
        "Failed to submit review. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
        Write a Review
      </h3>

      {successMessage && (
        <div className="rounded-lg bg-emerald-50 p-2.5 text-xs font-medium text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          {successMessage}
        </div>
      )}

      {serverError && (
        <div className="rounded-lg bg-rose-50 p-2.5 text-xs font-medium text-rose-800 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
          {serverError}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="space-y-3">
        {/* Your Rating */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Your Rating
          </label>
          <StarRating
            rating={rating}
            interactive={!loading}
            onChange={(val) => {
              setRating(val);
              if (errors.rating) setErrors((prev) => ({ ...prev, rating: undefined }));
            }}
            size="lg"
          />
          {errors.rating && (
            <p className="mt-1 text-[11px] font-medium text-rose-500">{errors.rating}</p>
          )}
        </div>

        {/* Your Review & Textarea */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
            Your Review
          </label>
          <div className="relative">
            <textarea
              rows={3}
              disabled={loading}
              value={comment}
              maxLength={500}
              onChange={(e) => {
                setComment(e.target.value);
                if (errors.comment) setErrors((prev) => ({ ...prev, comment: undefined }));
              }}
              placeholder="Write your review..."
              className={`w-full rounded-lg border bg-white dark:bg-slate-950 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 dark:focus:ring-slate-100 transition-colors resize-none ${
                errors.comment
                  ? "border-rose-400 dark:border-rose-500"
                  : "border-slate-200 dark:border-slate-800"
              }`}
            />
          </div>
          <div className="flex items-center justify-between mt-1 text-[11px] text-slate-400">
            <span>{errors.comment || "Minimum 10 characters"}</span>
            <span className="font-medium">{comment.length} / 500</span>
          </div>
        </div>

        {/* Dark Navy Submit Button */}
        <div>
          <button
            type="submit"
            disabled={loading}
            className="cursor-pointer rounded-lg bg-slate-900 hover:bg-slate-800 active:bg-slate-950 text-white font-semibold text-xs py-2.5 px-4 transition-colors disabled:opacity-60 flex items-center justify-center gap-1.5 shadow-xs"
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
      </form>
    </div>
  );
}

