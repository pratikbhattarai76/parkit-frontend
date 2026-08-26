import api from "./api";

/**
 * Reviews Service (Intern 6 — Saurav Niroula)
 * 
 * Handles all API communication for Reviews module:
 * - Create Review: POST /review/
 * - Get All Reviews: GET /review/
 * - Get Review by ID: GET /review/:id
 * - Get Reviews by Listing: GET /review/listing/:listingId
 */
const reviewService = {
  /**
   * Create a new review
   * @param {Object} reviewData - { listingId, rating, comment }
   * @returns {Promise<any>} Created review data
   */
  createReview: async (reviewData) => {
    return await api.post("/review/", reviewData);
  },

  /**
   * Get all reviews with optional query parameters
   * @param {Object} [params] - Query parameters { rating, sort, page, limit }
   * @returns {Promise<any>} Array or paginated reviews
   */
  getReviews: async (params = {}) => {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.append(key, value);
      }
    });
    const queryString = query.toString() ? `?${query.toString()}` : "";
    return await api.get(`/review/${queryString}`);
  },

  /**
   * Get a single review by its ID
   * @param {string} id - Review ID
   * @returns {Promise<any>} Single review details
   */
  getReviewById: async (id) => {
    return await api.get(`/review/${id}`);
  },

  /**
   * Get all reviews for a specific parking listing
   * @param {string} listingId - ID of the parking spot
   * @returns {Promise<any>} List of reviews for the listing
   */
  getListingReviews: async (listingId) => {
    return await api.get(`/review/listing/${listingId}`);
  },
};

export default reviewService;
