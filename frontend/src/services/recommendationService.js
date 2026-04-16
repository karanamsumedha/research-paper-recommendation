import api from './api';

const recommendationService = {
    // Generate recommendations
    generateRecommendations: async (userId) => {
        try {
            const response = await api.post(`/recommendations/generate/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get user recommendations
    getUserRecommendations: async (userId) => {
        try {
            const response = await api.get(`/recommendations/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get unviewed recommendations
    getUnviewedRecommendations: async (userId) => {
        try {
            const response = await api.get(`/recommendations/unviewed/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Mark as viewed
    markAsViewed: async (recommendationId) => {
        try {
            const response = await api.put(`/recommendations/mark-viewed/${recommendationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete recommendation
    deleteRecommendation: async (recommendationId) => {
        try {
            const response = await api.delete(`/recommendations/${recommendationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Clear all recommendations
    clearAllRecommendations: async (userId) => {
        try {
            const response = await api.delete(`/recommendations/clear/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default recommendationService;