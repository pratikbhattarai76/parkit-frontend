import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import Loading from "@/components/common/Loading";

/**
 * AdminRoute
 * Guard for Admin-only routes (/admin, /admin/users, /admin/listings).
 * Checks if user is authenticated and has 'admin' role.
 */
export default function AdminRoute() {
  const { isAuthenticated, isAdmin, isLoading } = useAuth();

  if (isLoading) {
    return <Loading message="Verifying admin access privileges..." size="lg" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}

