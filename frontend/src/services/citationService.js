import api from './api';

const citationService = {
    // Generate APA citation
    generateAPACitation: async (paperId) => {
        try {
            const response = await api.get(`/citations/generate/apa/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Generate IEEE citation
    generateIEEECitation: async (paperId) => {
        try {
            const response = await api.get(`/citations/generate/ieee/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Generate Chicago citation
    generateChicagoCitation: async (paperId) => {
        try {
            const response = await api.get(`/citations/generate/chicago/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Generate MLA citation
    generateMLACitation: async (paperId) => {
        try {
            const response = await api.get(`/citations/generate/mla/${paperId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Save citation
    saveCitation: async (citationData) => {
        try {
            const response = await api.post('/citations/save', citationData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get user citations
    getUserCitations: async (userId) => {
        try {
            const response = await api.get(`/citations/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete citation
    deleteCitation: async (citationId) => {
        try {
            const response = await api.delete(`/citations/${citationId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default citationService;