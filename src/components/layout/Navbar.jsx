import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut, User, ChevronDown, Car, LayoutDashboard, CalendarDays, Search, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setIsOpen(false);
    setProfileOpen(false);
  };

  const guestLinks = [
    { name: "Home", path: "/", icon: Car },
    { name: "Listings", path: "/listings", icon: Search },
  ];

  const userLinks = [
    { name: "Home", path: "/", icon: Car },
    { name: "Listings", path: "/listings", icon: Search },
    { name: "Reservations", path: "/reservations", icon: CalendarDays },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  ];

  const adminLinks = [
    { name: "Home", path: "/", icon: Car },
    { name: "Listings", path: "/listings", icon: Search },
    { name: "Reservations", path: "/reservations", icon: CalendarDays },
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Admin", path: "/admin", icon: Shield },
  ];

  const links = user ? (isAdmin ? adminLinks : userLinks) : guestLinks;

  const displayName =
    user?.name || user?.username || user?.email?.split("@")[0] || "User";
  const initials = displayName.slice(0, 2).toUpperCase();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/80 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900 transition-opacity hover:opacity-80 dark:text-white"
            >
              <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
                <Car className="size-4" />
              </span>
              <span>Parkit</span>
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === "/"}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          {/* Right side — desktop */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              /* Logged-in: show avatar dropdown */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((v) => !v)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1.5 pl-1.5 pr-3 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:shadow dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-slate-600"
                  aria-expanded={profileOpen}
                  aria-haspopup="true"
                >
                  <span className="flex size-7 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-xs font-bold text-white">
                    {initials}
                  </span>
                  <span className="max-w-[120px] truncate">{displayName}</span>
                  {isAdmin && (
                    <span className="rounded-full bg-indigo-100 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
                      Admin
                    </span>
                  )}
                  <ChevronDown
                    className={`size-4 text-slate-400 transition-transform duration-200 ${profileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg dark:border-slate-700 dark:bg-slate-900">
                    <div className="border-b border-slate-100 px-4 py-3 dark:border-slate-800">
                      <p className="text-xs text-slate-500 dark:text-slate-400">Signed in as</p>
                      <p className="mt-0.5 truncate text-sm font-semibold text-slate-900 dark:text-white">
                        {displayName}
                      </p>
                    </div>
                    <div className="p-1.5">
                      <Link
                        to="/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <User className="size-4 text-slate-400" />
                        My Profile
                      </Link>
                      <Link
                        to="/dashboard"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <LayoutDashboard className="size-4 text-slate-400" />
                        Dashboard
                      </Link>
                    </div>
                    <div className="border-t border-slate-100 p-1.5 dark:border-slate-800">
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                      >
                        <LogOut className="size-4" />
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Guest: show login + signup */
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="font-medium">
                    Log in
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-blue-500 to-indigo-600 font-medium text-white shadow-sm hover:from-blue-600 hover:to-indigo-700"
                  >
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          <div className="space-y-1 px-3 py-3">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === "/"}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/50 dark:hover:text-white"
                  }`
                }
              >
                <link.icon className="size-4 text-slate-400" />
                {link.name}
              </NavLink>
            ))}
          </div>

          <div className="border-t border-slate-200 px-3 py-3 dark:border-slate-800">
            {user ? (
              <>
                {/* Mobile user info */}
                <div className="mb-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5 dark:bg-slate-900">
                  <span className="flex size-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                    {initials}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {displayName}
                    </p>
                    {isAdmin && (
                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        Administrator
                      </span>
                    )}
                  </div>
                </div>
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800"
                >
                  <User className="size-4" />
                  My Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="mt-1 flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
                >
                  <LogOut className="size-4" />
                  Log out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-center font-medium">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={() => setIsOpen(false)}>
                  <Button
                    size="sm"
                    className="w-full justify-center bg-gradient-to-r from-blue-500 to-indigo-600 font-medium text-white"
                  >
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
