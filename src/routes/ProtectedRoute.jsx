import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/common/Loading";

/**
 * ProtectedRoute
 *
 * A layout-level route guard that protects authenticated routes.
 *
 * Behaviour (driven entirely by AuthContext — no auth logic lives here):
 *   • isLoading === true  → show a loading indicator while auth state resolves
 *   • user !== null       → render children / nested <Outlet>
 *   • user === null       → redirect to /login, preserving the intended path
 *
 * Usage in AppRoutes:
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/profile" element={<Profile />} />
 *     ...
 *   </Route>
 */
export default function ProtectedRoute() {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <Loading message="Checking authentication..." size="lg" />;
  }

  if (!user) {
    // Preserve the originally requested path so the login page can redirect
    // back after a successful login (replace=true avoids polluting history).
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
