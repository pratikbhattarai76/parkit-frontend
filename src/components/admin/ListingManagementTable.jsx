import React, { useState } from "react";
import { Trash2, Search, MapPin, DollarSign, Building } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ListingManagementTable({ listings = [], onDeleteListing, isLoading = false }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const filteredListings = listings.filter(
    (listing) =>
      listing.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.owner?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id, title) => {
    if (window.confirm(`Are you sure you want to remove listing "${title || id}"?`)) {
      setDeletingId(id);
      try {
        await onDeleteListing(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      {/* Header & Filter */}
      <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between dark:border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Listing Management</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Monitor and moderate all parking space listings on the platform
          </p>
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search location, title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-blue-400"
          />
        </div>
      </div>

      {/* Listings Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th scope="col" className="px-6 py-3.5">Listing Title</th>
              <th scope="col" className="px-6 py-3.5">Location</th>
              <th scope="col" className="px-6 py-3.5">Owner / Host</th>
              <th scope="col" className="px-6 py-3.5">Rate</th>
              <th scope="col" className="px-6 py-3.5">Status</th>
              <th scope="col" className="px-6 py-3.5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
            {isLoading ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  Loading listings...
                </td>
              </tr>
            ) : filteredListings.length === 0 ? (
              <tr>
                <td colSpan="6" className="px-6 py-8 text-center text-slate-500">
                  No listings found.
                </td>
              </tr>
            ) : (
              filteredListings.map((listing) => (
                <tr key={listing.id || listing._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="px-6 py-4 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-blue-500" />
                      {listing.title || "Untitled Spot"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-1.5 text-xs">
                      <MapPin className="h-3.5 w-3.5 text-slate-400" />
                      {listing.location || "N/A"}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                    {listing.owner || "Unknown"}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">
                    {listing.pricePerHour || listing.price || "$0/hr"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        listing.status === "Occupied"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                          : listing.status === "Maintenance"
                          ? "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-400"
                          : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      }`}
                    >
                      {listing.status || "Available"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(listing.id || listing._id, listing.title)}
                      disabled={deletingId === (listing.id || listing._id)}
                      className="text-red-600 hover:bg-red-50 hover:text-red-700 dark:text-red-400 dark:hover:bg-red-950/50"
                    >
                      <Trash2 className="mr-1.5 h-4 w-4" />
                      {deletingId === (listing.id || listing._id) ? "Deleting..." : "Delete"}
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
