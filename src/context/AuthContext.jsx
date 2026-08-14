import { createContext, useContext, useState } from "react";

/**
 * AuthContext
 *
 * Minimal authentication-state abstraction.
 * This context intentionally does NOT implement any authentication logic.
 *
 * Shape of the context value:
 *   {
 *     user:            object | null  – populated user object when authenticated, null otherwise
 *     isLoading:       boolean        – true while auth state is being resolved (e.g. on first load)
 *   }
 *
 * The `user` field will be set by a real auth mechanism (e.g. a login flow,
 * a session restore call, etc.) once that is implemented.
 *
 * INTENTIONALLY left as a no-op stub so the rest of the app can compile and
 * route correctly before authentication is wired up.
 */
const AuthContext = createContext(null);

/**
 * AuthProvider
 *
 * Wrap the application (or a subtree) with this provider.
 * At this stage it only exposes a neutral initial state.
 * Replace the `useState` initial values when real auth is implemented.
 */
export function AuthProvider({ children }) {
  // user: null  → not authenticated / unknown
  // isLoading: false → no async resolution happening yet
  // Both will be driven by real auth logic in a later task.
  const [user] = useState(null);
  const [isLoading] = useState(false);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * useAuth
 *
 * Convenience hook to consume the auth context.
 * Throws if used outside of <AuthProvider>.
 */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (ctx === null) {
    throw new Error("useAuth must be used inside <AuthProvider>");
  }
  return ctx;
}
