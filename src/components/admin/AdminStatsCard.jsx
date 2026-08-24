import React from "react";
import { Users, Building2, CalendarCheck, TrendingUp, ShieldAlert, Activity } from "lucide-react";

export default function AdminStatsCard({ title, value, icon: Icon, change, subtitle, variant = "default" }) {
  const getBadgeColor = () => {
    switch (variant) {
      case "primary":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800";
      case "emerald":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800";
      case "amber":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-800";
      case "violet":
        return "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-200 dark:border-violet-800";
      default:
        return "bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800";
    }
  };

  return (
    <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
          <h3 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {value !== undefined && value !== null ? value : "0"}
          </h3>
        </div>
        {Icon && (
          <div className={`rounded-xl border p-3 ${getBadgeColor()}`}>
            <Icon className="h-6 w-6" />
          </div>
        )}
      </div>

      {(subtitle || change) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span className="inline-flex items-center gap-0.5 font-semibold text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="h-3.5 w-3.5" /> {change}
            </span>
          )}
          {subtitle && <span className="text-slate-500 dark:text-slate-400">{subtitle}</span>}
        </div>
      )}
    </div>
  );
}
