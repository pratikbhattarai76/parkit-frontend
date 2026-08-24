import api from "./api";

/**
 * Admin Service
 * Handles administrative operations: statistics, user management, and listing management.
 */

const adminService = {
  /**
   * Get administrative overview statistics
   * GET /admin/stats
   */
  getStats: async () => {
    return await api.get("/admin/stats");
  },

  /**
   * Get all registered users
   * GET /admin/users
   */
  getUsers: async () => {
    return await api.get("/admin/users");
  },

  /**
   * Delete a user by ID
   * DELETE /admin/users/:id
   */
  deleteUser: async (id) => {
    return await api.del(`/admin/users/${id}`);
  },

  /**
   * Get all parking space listings
   * GET /admin/listings
   */
  getListings: async () => {
    return await api.get("/admin/listings");
  },

  /**
   * Delete a listing by ID
   * DELETE /admin/listings/:id
   */
  deleteListing: async (id) => {
    return await api.del(`/admin/listings/${id}`);
  },
};

export default adminService;
