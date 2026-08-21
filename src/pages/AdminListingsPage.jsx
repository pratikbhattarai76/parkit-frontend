import React, { useState, useEffect } from "react";
import adminService from "@/services/adminService";
import { mockAdminListings } from "@/utils/mockAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import ListingManagementTable from "@/components/admin/ListingManagementTable";

export default function AdminListingsPage() {
  const [listings, setListings] = useState(mockAdminListings);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    setLoading(true);
    try {
      const listingsRes = await adminService.getListings();
      if (listingsRes && Array.isArray(listingsRes)) setListings(listingsRes);
    } catch {
      // Fallback to mock listings
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteListing = async (id) => {
    try {
      await adminService.deleteListing(id);
    } catch {
      // Delete from local state as fallback UI reaction
    }
    setListings((prev) => prev.filter((l) => (l.id || l._id) !== id));
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Admin - Listing Management"
        description="Inspect, moderate, and remove listings across all host locations."
      />
      <ListingManagementTable
        listings={listings}
        onDeleteListing={handleDeleteListing}
        isLoading={loading}
      />
    </div>
  );
}
