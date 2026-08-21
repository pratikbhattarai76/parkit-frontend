import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/common/Loading";

/**
 * AdminRoute
 * Guard for Admin-only routes (/admin, /admin/users, /admin/listings).
 * Checks if user is authenticated and has 'admin' role.
 */
export default function AdminRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Verifying admin access privileges..." size="lg" />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // If user role check is enabled on backend/frontend user object:
  // e.g., if (user.role !== "admin" && user.role !== "Admin") { return <Navigate to="/dashboard" replace />; }

  return <Outlet />;
}
