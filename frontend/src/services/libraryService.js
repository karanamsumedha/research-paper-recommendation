import api from './api';

const libraryService = {
    // Save paper to library
    savePaper: async (libraryData) => {
        try {
            const response = await api.post('/library/save', libraryData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get user library
    getUserLibrary: async (userId) => {
        try {
            const response = await api.get(`/library/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get user favorites
    getUserFavorites: async (userId) => {
        try {
            const response = await api.get(`/library/favorites/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update reading progress
    updateReadingProgress: async (libraryId, progress) => {
        try {
            const response = await api.put(`/library/update-progress/${libraryId}`, null, {
                params: { progress }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Add note
    addNote: async (libraryId, note) => {
        try {
            const response = await api.put(`/library/add-note/${libraryId}`, null, {
                params: { note }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Toggle favorite
    toggleFavorite: async (libraryId) => {
        try {
            const response = await api.put(`/library/toggle-favorite/${libraryId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Remove paper from library
    removePaper: async (libraryId) => {
        try {
            const response = await api.delete(`/library/${libraryId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default libraryService;