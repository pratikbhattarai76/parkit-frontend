import { Outlet } from "react-router-dom";

/**
 * AdminRoute
 * Guard for Admin-only routes (/admin, /admin/users, /admin/listings).
 *
 * TODO: Uncomment auth checks below once backend authentication is fully connected.
 * Currently allows access for UI development and testing.
 */
export default function AdminRoute() {
  // const { user, isLoading } = useAuth();
  //
  // if (isLoading) {
  //   return <Loading message="Verifying admin access privileges..." size="lg" />;
  // }
  //
  // if (!user) {
  //   return <Navigate to="/login" replace />;
  // }
  //
  // if (user.role !== "admin" && user.role !== "Admin") {
  //   return <Navigate to="/dashboard" replace />;
  // }

  return <Outlet />;
}
