import api from './api';

const feedbackService = {
    // Submit feedback
    submitFeedback: async (feedbackData) => {
        try {
            const response = await api.post('/feedback/submit', feedbackData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get paper feedback
    getPaperFeedback: async (paperId) => {
        try {
            const response = await api.get(`/feedback/paper/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get average rating
    getAverageRating: async (paperId) => {
        try {
            const response = await api.get(`/feedback/rating/average/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete feedback
    deleteFeedback: async (feedbackId) => {
        try {
            const response = await api.delete(`/feedback/${feedbackId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update feedback
    updateFeedback: async (feedbackId, feedbackData) => {
        try {
            const response = await api.put(`/feedback/${feedbackId}`, feedbackData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default feedbackService;