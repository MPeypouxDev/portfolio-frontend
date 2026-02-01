import apiClient from './apiClient';

export const authService = {
    login(credentials) {
        return apiClient.post('/login', credentials);
    },

    logout() {
        return apiClient.post('/logout');
    },

    // Rafraîchir le token
    refresh() {
        return apiClient.post('/refresh');
    },

    // Récupérer l'utilisateur connecté
    me() {
        return apiClient.get('/me');
    },

    saveToken(token) {
        localStorage.setItem('token', token);
    },

    removeToken() {
        localStorage.removeItem('token');
    },

    isAuthenticated() {
        return !!localStorage.getItem('token');
    },
};