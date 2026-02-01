import apiClient from './apiClient';

export const contactService = {
    send(contactData) {
        return apiClient.post('/contact', contactData);
    },

    getAll() {
        return apiClient.get('/contacts');
    },

    getById(id) {
        return apiClient.get(`/contacts/${id}`);
    },

    delete(id) {
        return apiClient.delete(`/contacts/${id}`);
    },
};