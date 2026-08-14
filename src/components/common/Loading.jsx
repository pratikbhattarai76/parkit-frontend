import { Loader2 } from "lucide-react";

/**
 * Reusable Loading component.
 *
 * @param {object}  props
 * @param {string}  [props.message="Loading..."]  - Accessible label shown below the spinner.
 * @param {"sm"|"md"|"lg"} [props.size="md"]      - Controls icon size.
 * @param {string}  [props.className]              - Extra classes for the wrapper.
 */
export default function Loading({ message = "Loading...", size = "md", className = "" }) {
  const sizeMap = {
    sm: "size-5",
    md: "size-8",
    lg: "size-12",
  };

  const iconSize = sizeMap[size] ?? sizeMap.md;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={message}
      className={`flex flex-col items-center justify-center gap-3 py-10 text-muted-foreground ${className}`}
    >
      <Loader2 className={`${iconSize} animate-spin`} aria-hidden="true" />
      {message && (
        <p className="text-sm font-medium">{message}</p>
      )}
    </div>
  );
}
