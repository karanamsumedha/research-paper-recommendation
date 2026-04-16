import api from './api';

const paperService = {
    // Search papers
    searchPapers: async (keyword, page = 0, size = 10) => {
        try {
            const response = await api.get('/papers/search', {
                params: { keyword, page, size }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Filter by domain
    filterByDomain: async (domain) => {
        try {
            const response = await api.get('/papers/filter/domain', {
                params: { domain }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Filter by year
    filterByYear: async (year) => {
        try {
            const response = await api.get('/papers/filter/year', {
                params: { year }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Filter by author
    filterByAuthor: async (author) => {
        try {
            const response = await api.get('/papers/filter/author', {
                params: { author }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get paper by ID
    getPaperById: async (paperId) => {
        try {
            const response = await api.get(`/papers/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get all papers
    getAllPapers: async (page = 0, size = 10) => {
        try {
            const response = await api.get('/papers/all', {
                params: { page, size }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get top cited papers
    getTopCitedPapers: async (limit = 10) => {
        try {
            const response = await api.get('/papers/top-cited', {
                params: { limit }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get recent papers
    getRecentPapers: async (limit = 10) => {
        try {
            const response = await api.get('/papers/recent', {
                params: { limit }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Add paper (Content Curator)
    addPaper: async (paperData) => {
        try {
            const response = await api.post('/papers/add', paperData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update paper (Content Curator)
    updatePaper: async (paperId, paperData) => {
        try {
            const response = await api.put(`/papers/${paperId}`, paperData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete paper (Content Curator)
    deletePaper: async (paperId) => {
        try {
            const response = await api.delete(`/papers/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default paperService;