import api from './api';
import { jwtDecode } from 'jwt-decode';

const authService = {
    // Register new user
    register: async (userData) => {
        try {
            const response = await api.post('/users/register', userData);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const decoded = jwtDecode(response.data.token);
                localStorage.setItem('user', JSON.stringify(decoded));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Login user
    login: async (username, password) => {
        try {
            const response = await api.post('/users/login', { username, password });
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                const decoded = jwtDecode(response.data.token);
                localStorage.setItem('user', JSON.stringify(decoded));
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Logout user
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    // Get user profile
    getProfile: async (userId) => {
        try {
            const response = await api.get(`/users/profile/${userId}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update user profile
    updateProfile: async (userId, userData) => {
        try {
            const response = await api.put(`/users/profile/${userId}`, userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Change password
    changePassword: async (userId, oldPassword, newPassword) => {
        try {
            const response = await api.post('/users/change-password', null, {
                params: { userId, oldPassword, newPassword }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        return !!localStorage.getItem('token');
    },

    // Get current user
    getCurrentUser: () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    },
};

export default authService;