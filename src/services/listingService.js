import api from "./api";

/**
 * Listing Service
 * Handles parking spots discovery, creation, updates, and deletion.
 */
const listingService = {
  /**
   * Get all active parking spot listings
   */
  getAllListings: async () => {
    return await api.get("/listing");
  },

  /**
   * Get a single parking spot listing by ID
   * @param {string} id
   */
  getListingById: async (id) => {
    return await api.get(`/listing/${id}`);
  },

  /**
   * Get listings created by a specific user/owner
   * @param {string} ownerId
   */
  getUserListings: async (ownerId) => {
    return await api.get(`/listing/user/${ownerId}`);
  },

  /**
   * Create a new parking spot listing
   * @param {Object} data - { city, street, country, zipcode, type, description, price, noOfVehicle, lat, long, paymentQr }
   */
  createListing: async (data) => {
    return await api.post("/listing", data);
  },

  /**
   * Update an existing listing's details
   * @param {string} id
   * @param {Object} data
   */
  updateListing: async (id, data) => {
    return await api.patch(`/listing/${id}`, data);
  },

  /**
   * Update a listing's photo
   * @param {string} id
   * @param {File} file
   */
  updatePhoto: async (id, file) => {
    const formData = new FormData();
    formData.append("photo", file);
    return await api.patch(`/listing/${id}/photo`, formData);
  },

  /**
   * Delete a listing
   * @param {string} id
   */
  deleteListing: async (id) => {
    return await api.del(`/listing/${id}`);
  },
};

export default listingService;
