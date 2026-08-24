import React from "react";

export default function AdminHeader({ title = "Admin Dashboard", description = "Overview of system status, users, and listings" }) {
  return (
    <div className="mb-8 border-b border-slate-200 pb-5 dark:border-slate-800">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-slate-900 sm:text-3xl dark:text-white">
            🛠️ {title}
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {description}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 border border-emerald-200 dark:border-emerald-800 dark:text-emerald-400">
            <span className="mr-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Admin System Active
          </span>
        </div>
      </div>
    </div>
  );
}
