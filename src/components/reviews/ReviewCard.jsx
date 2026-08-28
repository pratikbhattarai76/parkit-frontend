import StarRating from "./StarRating";
import { Calendar, MoreVertical } from "lucide-react";

/**
 * ReviewCard Component (Intern 6 — Saurav Niroula)
 *
 * Matches the reference screenshot:
 * - Circular avatar with user initial (coloured background)
 * - User name (bold, left) | Calendar icon + date (right)
 * - Star rating row + numeric score
 * - Review comment
 * - Three-dot more button (top-right corner)
 */

const AVATAR_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-violet-100 text-violet-700",
  "bg-emerald-100 text-emerald-700",
  "bg-amber-100 text-amber-700",
  "bg-rose-100 text-rose-700",
  "bg-sky-100 text-sky-700",
];

function getInitial(name) {
  if (!name) return "U";
  return String(name).trim().charAt(0).toUpperCase();
}

function getAvatarColor(name) {
  if (!name) return AVATAR_COLORS[0];
  const code = String(name).charCodeAt(0) || 0;
  return AVATAR_COLORS[code % AVATAR_COLORS.length];
}

function formatDate(raw) {
  if (!raw) return "";
  try {
    const d = new Date(raw);
    if (isNaN(d.getTime())) return raw;
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return raw;
  }
}

export default function ReviewCard({ review }) {
  if (!review) return null;

  const userObj = review.user || review.userId || {};
  const userName =
    typeof userObj === "string"
      ? userObj
      : userObj.name || userObj.username || review.userName || "Verified User";

  const rating = Number(review.rating || 0);
  const comment = review.comment || "";
  const dateStr = review.createdAt || review.date || review.updatedAt;

  const initial = getInitial(userName);
  const avatarColor = getAvatarColor(userName);

  return (
    <div className="py-4 first:pt-2 last:pb-2">
      <div className="flex items-start gap-3">
        {/* Coloured circular avatar */}
        <div
          className={`h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm shrink-0 select-none ${avatarColor}`}
        >
          {initial}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Name row + date + more button */}
          <div className="flex items-start justify-between gap-2">
            <span className="font-bold text-sm text-slate-900 dark:text-white leading-tight">
              {userName}
            </span>

            <div className="flex items-center gap-2 shrink-0">
              {dateStr && (
                <span className="flex items-center gap-1 text-[11px] text-slate-400 dark:text-slate-500">
                  <Calendar className="h-3 w-3" />
                  {formatDate(dateStr)}
                </span>
              )}
              <button
                type="button"
                aria-label="More options"
                className="p-0.5 rounded text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                <MoreVertical className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Stars + numeric value */}
          <div className="flex items-center gap-1.5 mt-1">
            <StarRating rating={rating} size="sm" />
            <span className="text-xs font-bold text-amber-500 dark:text-amber-400">
              {rating.toFixed(1)}
            </span>
          </div>

          {/* Comment */}
          {comment && (
            <p className="mt-1.5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {comment}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
