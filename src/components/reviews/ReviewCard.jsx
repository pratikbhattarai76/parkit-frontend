import StarRating from "./StarRating";

/**
 * ReviewCard Component (Intern 6 — Saurav Niroula)
 * Matches reference screenshot:
 * - Neutral circular avatar with user initial (e.g. S, A, P)
 * - User name on left, Date on right (e.g. "May 14, 2025")
 * - 5-star rating + numeric score (e.g. ★★★★★ 5)
 * - Review comment text
 */

function getInitials(name) {
  if (!name) return "U";
  return String(name).trim().charAt(0).toUpperCase();
}

function formatDate(raw) {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
  } catch {
    return raw;
  }
}

export default function ReviewCard({ review }) {
  if (!review) return null;

  const user = review.user || review.userId || {};
  const userName =
    typeof user === "string"
      ? user
      : user.name || user.username || review.userName || "Verified User";
  const rating = Number(review.rating || 0);
  const comment = review.comment || "";
  const dateStr = review.createdAt || review.date || review.updatedAt;
  const initial = getInitials(userName);

  return (
    <div className="py-3.5 first:pt-1 last:pb-1">
      <div className="flex items-start gap-3">
        {/* Neutral Circular Avatar with Initial */}
        <div className="h-8 w-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-700 dark:text-slate-200 shrink-0 select-none">
          {initial}
        </div>

        {/* Content Details */}
        <div className="flex-1 min-w-0">
          {/* User Name & Date Row */}
          <div className="flex items-center justify-between gap-2">
            <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
              {userName}
            </span>
            {dateStr && (
              <span className="text-[11px] sm:text-xs text-slate-400 dark:text-slate-500 font-normal shrink-0">
                {formatDate(dateStr)}
              </span>
            )}
          </div>

          {/* Stars & Rating Value */}
          <div className="flex items-center gap-1.5 mt-0.5">
            <StarRating rating={rating} size="sm" />
            <span className="text-xs font-bold text-amber-500 dark:text-amber-400">
              {rating}
            </span>
          </div>

          {/* Comment */}
          {comment && (
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

