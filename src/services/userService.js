import api from "./api";

/**
 * User & Profile Service
 *
 * Handles API requests for the User/Profile module.
 */

const userService = {
  // Get the currently logged-in user
  getCurrentUser: async () => {
    return await api.get("/users/me");
  },

  // Get user details
  getUser: async () => {
    return await api.get("/users/getUser");
  },

  // Get a specific user by ID
  getUserById: async (id) => {
    return await api.get(`/users/getSingleuser/${id}`);
  },

  // Update current user's profile/settings
  updateProfile: async (data) => {
    return await api.patch("/settings/update", data);
  },

  // Update current user's profile image
  updateProfileImage: async (file) => {
    const formData = new FormData();
    formData.append("avatar", file);

    return await api.patch("/settings/updateImage", formData);
  },
};

export default userService;