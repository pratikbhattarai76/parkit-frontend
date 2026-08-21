import React, { useState, useEffect } from "react";
import adminService from "@/services/adminService";
import { mockAdminUsers } from "@/utils/mockAdminData";
import AdminHeader from "@/components/admin/AdminHeader";
import UserManagementTable from "@/components/admin/UserManagementTable";

export default function AdminUsersPage() {
  const [users, setUsers] = useState(mockAdminUsers);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const usersRes = await adminService.getUsers();
      if (usersRes && Array.isArray(usersRes)) setUsers(usersRes);
    } catch {
      // Fallback to mock users
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await adminService.deleteUser(id);
    } catch {
      // Proceed locally for UI state update
    }
    setUsers((prev) => prev.filter((u) => (u.id || u._id) !== id));
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Admin - Users Management"
        description="Manage user roles, view registration details, and purge inactive or flagged user accounts."
      />
      <UserManagementTable
        users={users}
        onDeleteUser={handleDeleteUser}
        isLoading={loading}
      />
    </div>
  );
}
