import React, { useState } from "react";
import { Trash2, Search, UserCheck, ShieldAlert, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UserManagementTable({ users = [], onDeleteUser, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete user "${name || id}"?`)) {
      setDeletingId(id);
      try {
        await onDeleteUser(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Table Header & Search */}
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">User Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            View, search, and manage registered system accounts
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400"
          />
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">User</th>
              <th scope="col" className="px-6 py-3.5">Email</th>
              <th scope="col" className="px-6 py-3.5">Role</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  Loading users...
                </td>
              </tr>
            ) : filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  No users found.
                </td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id || user._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600 dark:bg-blue-900/40 dark:text-blue-300">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white">{user.name || "N/A"}</p>
                        <p className="text-xs text-slate-400">ID: {user.id || user._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800 dark:bg-slate-800 dark:text-slate-200">
                      {user.role || "User"}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        user.status === "Suspended"
                          ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                          : user.status === "Pending"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      {user.status || "Active"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(user.id || user._id, user.name)}
                      disabled={deletingId === (user.id || user._id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" />
                      {deletingId === (user.id || user._id) ? "Deleting..." : "Delete"}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
