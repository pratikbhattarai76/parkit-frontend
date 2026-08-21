import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: "Home", path: "/" },
    { name: "Listings", path: "/listings" },
    { name: "Reservations", path: "/reservations" },
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/profile" },
    { name: "Admin Dashboard", path: "/admin" },
    { name: "Admin Users", path: "/admin/users" },
    { name: "Admin Listings", path: "/admin/listings" },
  ];

  return (
    <nav className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Parkit
            </Link>
            <div className="hidden md:flex items-center gap-6">
              {links.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-slate-900 dark:hover:text-white ${
                      isActive
                        ? "text-slate-900 dark:text-white font-semibold"
                        : "text-slate-550 dark:text-slate-400"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>

          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-slate-550 hover:bg-slate-100 hover:text-slate-900 focus:outline-none dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-2 pt-2 pb-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-base font-medium ${
                  isActive
                    ? "bg-slate-100 text-slate-900 dark:bg-slate-900 dark:text-white"
                    : "text-slate-550 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-900 dark:hover:text-white"
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="mt-4 border-t border-slate-200 dark:border-slate-800 pt-4 flex flex-col gap-2 px-3">
            <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
              <Button variant="ghost" size="sm" className="w-full justify-center">
                Log in
              </Button>
            </Link>
            <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
              <Button size="sm" className="w-full justify-center">
                Sign up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
