import { AlertCircle } from "lucide-react";

/**
 * Reusable ErrorMessage component.
 *
 * @param {object}  props
 * @param {string}  [props.message="Something went wrong."] - The error text to display.
 * @param {string}  [props.title="Error"]                   - Short heading for the error block.
 * @param {string}  [props.className]                       - Extra classes for the wrapper.
 */
export default function ErrorMessage({
  message = "Something went wrong.",
  title = "Error",
  className = "",
}) {
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={`flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-destructive ${className}`}
    >
      <AlertCircle className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <div>
        {title && (
          <p className="text-sm font-semibold leading-none mb-1">{title}</p>
        )}
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}
