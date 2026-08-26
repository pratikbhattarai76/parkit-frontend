import { useState } from "react";
import { Star } from "lucide-react";

/**
 * StarRating Component (Intern 6 — Saurav Niroula)
 * Matches reference design: crisp amber filled stars (#f59e0b) and clean outline for empty stars
 */
export default function StarRating({
  rating = 0,
  maxStars = 5,
  interactive = false,
  onChange = () => {},
  size = "md",
  showValue = false,
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const starSizes = {
    sm: 14,
    md: 17,
    lg: 22,
  };

  const pixelSize = starSizes[size] || 17;
  const currentRating = interactive && hoverRating > 0 ? hoverRating : Number(rating || 0);

  return (
    <div className="inline-flex items-center gap-1 select-none">
      <div className="inline-flex items-center gap-0.5">
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = currentRating >= starValue;
          const isHalf = !isFilled && currentRating >= starValue - 0.5;

          if (interactive) {
            return (
              <button
                key={starValue}
                type="button"
                onClick={() => onChange(starValue)}
                onMouseEnter={() => setHoverRating(starValue)}
                onMouseLeave={() => setHoverRating(0)}
                className="cursor-pointer p-0.5 border-0 bg-transparent transition-transform hover:scale-110 focus:outline-none"
                aria-label={`Rate ${starValue} stars`}
              >
                <Star
                  size={pixelSize}
                  className={`transition-colors ${
                    isFilled
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 dark:text-slate-600 hover:text-amber-400"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
            );
          }

          return (
            <span key={starValue} className="inline-flex items-center justify-center relative">
              {isHalf ? (
                <div className="relative" style={{ width: pixelSize, height: pixelSize }}>
                  <Star
                    size={pixelSize}
                    className="text-slate-300 dark:text-slate-600"
                    strokeWidth={1.5}
                  />
                  <div className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>
                    <Star
                      size={pixelSize}
                      className="fill-amber-400 text-amber-400"
                      strokeWidth={1.5}
                    />
                  </div>
                </div>
              ) : (
                <Star
                  size={pixelSize}
                  className={
                    isFilled
                      ? "fill-amber-400 text-amber-400"
                      : "text-slate-300 dark:text-slate-600"
                  }
                  strokeWidth={1.5}
                />
              )}
            </span>
          );
        })}
      </div>

      {showValue && Number(rating) > 0 && (
        <span className="text-xs font-bold text-amber-600 dark:text-amber-400 ml-1">
          {rating}
        </span>
      )}
    </div>
  );
}

