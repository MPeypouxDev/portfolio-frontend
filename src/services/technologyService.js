import apiClient from "./apiClient";

export const technologyService = {
    getAll() {
        return apiClient.get('/technologies');
    },

    getById(id) {
        return apiClient.get(`/technologies/${id}`);
    },

    create(technologyData) {
        return apiClient.post('/technologies', technologyData);
    },

    update(id, technologyData) {
        return apiClient.put(`/technologies/${id}`, technologyData);
    },

    delete(id) {
        return apiClient.delete(`/technologies/${id}`);
    },
};