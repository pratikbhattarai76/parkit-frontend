import api from "./api";

/**
 * Reservation Service
 * Handles parking spot reservations, bookings, and cancellation.
 */
const reservationService = {
  /**
   * Get all reservations (admin/system)
   */
  getAllReservations: async () => {
    return await api.get("/reserve");
  },

  /**
   * Get a single reservation by ID
   * @param {string} id
   */
  getReservationById: async (id) => {
    return await api.get(`/reserve/${id}`);
  },

  /**
   * Get reservations for a specific user
   * @param {string} reserverId
   */
  getUserReservations: async (reserverId) => {
    return await api.get(`/reserve/userReservations/${reserverId}`);
  },

  /**
   * Create a new reservation
   * @param {Object} data - { listingId, date, endDate, startTime, endTime, slots }
   */
  createReservation: async (data) => {
    return await api.post("/reserve", data);
  },

  /**
   * Cancel/delete a reservation
   * @param {string} id
   */
  cancelReservation: async (id) => {
    return await api.del(`/reserve/${id}`);
  },
};

export default reservationService;
