import api from './api';

const adminService = {
    // Get all users
    getAllUsers: async () => {
        try {
            const response = await api.get('/admin/users');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get users by role
    getUsersByRole: async (role) => {
        try {
            const response = await api.get(`/admin/users/role/${role}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Promote user to curator
    promoteUserToCurator: async (userId) => {
        try {
            const response = await api.put(`/admin/promote/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Demote user
    demoteUser: async (userId) => {
        try {
            const response = await api.put(`/admin/demote/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get system statistics
    getSystemStatistics: async () => {
        try {
            const response = await api.get('/admin/statistics');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Generate activity report
    generateActivityReport: async () => {
        try {
            const response = await api.get('/admin/reports/activity');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete user
    deleteUser: async (userId) => {
        try {
            const response = await api.delete(`/admin/user/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Log user activity
    logUserActivity: async (userId, action) => {
        try {
            const response = await api.post('/admin/log-activity', null, {
                params: { userId, action }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },
};

export default adminService;