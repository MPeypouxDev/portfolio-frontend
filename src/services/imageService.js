import apiClient from "./apiClient";

export const imageService = {
    getAll() {
        return apiClient.get('/images');
    },

    store(imageData) {
        return apiClient.post('/images', imageData);
    },

    delete(id) {
        return apiClient.delete(`/images/${id}`)
    }
}