import api from "./api";

const recommendationService = {
  getRecommendations: async ({ lat, lng }) => {
    return api.post("/recommendation/recommend", {
      lat,
      lng,
    });
  },
};

export default recommendationService;