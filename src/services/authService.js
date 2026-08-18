import api from "./api";

/**
 * Authentication Service
 * Exposes methods to interact with the auth endpoints.
 */

const authService = {
  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   */
  register: async (userData) => {
    const response = await api.post("/auth/register", userData);
    return response;
  },

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   */
  login: async (credentials) => {
    const response = await api.post("/auth/login", credentials);
    return response;
  },

  /**
   * Logout user
   */
  logout: async () => {
    // Assuming backend invalidates token or session
    const response = await api.post("/auth/logout");
    return response;
  },

  /**
   * Reset password (used for both forgot password and actual reset depending on implementation, 
   * but usually reset password takes an email and new password or token).
   * @param {Object} data - { email, newPassword, token, etc. }
   */
  resetPassword: async (data) => {
    const response = await api.post("/auth/reset", data);
    return response;
  },
};

export default authService;
