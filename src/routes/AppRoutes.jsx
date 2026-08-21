import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import ForgotPassword from "@/pages/ForgotPassword";
import ResetPassword from "@/pages/ResetPassword";
import Profile from "@/pages/Profile";
import Listings from "@/pages/Listings";
import ListingDetails from "@/pages/ListingDetails";
import Reservations from "@/pages/Reservations";
import Dashboard from "@/pages/Dashboard";
import Admin from "@/pages/Admin";
import AdminUsersPage from "@/pages/AdminUsersPage";
import AdminListingsPage from "@/pages/AdminListingsPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminRoute from "./AdminRoute";

export default function AppRoutes() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/listings" element={<Listings />} />
            <Route path="/listings/:id" element={<ListingDetails />} />
            
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<Profile />} />
              <Route path="/reservations" element={<Reservations />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin-only routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/users" element={<AdminUsersPage />} />
              <Route path="/admin/listings" element={<AdminListingsPage />} />
            </Route>
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
