import { Link } from "react-router-dom";
import { Car, Github, Twitter } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 py-6 sm:flex-row">
          {/* Brand */}
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition-opacity hover:opacity-70 dark:text-slate-300"
          >
            <span className="flex size-6 items-center justify-center rounded-md bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <Car className="size-3.5" />
            </span>
            Parkit
          </Link>

          {/* Copyright */}
          <p className="text-xs text-slate-400 dark:text-slate-500">
            &copy; {year} Parkit. All rights reserved.
          </p>

          {/* Links */}
          <div className="flex items-center gap-4 text-xs text-slate-400 dark:text-slate-500">
            <Link
              to="/listings"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-300"
            >
              Listings
            </Link>
            <Link
              to="/login"
              className="transition-colors hover:text-slate-700 dark:hover:text-slate-300"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
